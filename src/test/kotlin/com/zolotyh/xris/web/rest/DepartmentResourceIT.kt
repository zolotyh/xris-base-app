package com.zolotyh.xris.web.rest

import com.zolotyh.xris.XrisApp
import com.zolotyh.xris.domain.Department
import com.zolotyh.xris.repository.DepartmentRepository
import com.zolotyh.xris.service.DepartmentService
import com.zolotyh.xris.web.rest.errors.ExceptionTranslator
import javax.persistence.EntityManager
import kotlin.test.assertNotNull
import org.assertj.core.api.Assertions.assertThat
import org.hamcrest.Matchers.hasItem
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.junit.jupiter.api.extension.Extensions
import org.mockito.ArgumentMatchers.*
import org.mockito.Mock
import org.mockito.Mockito.`when`
import org.mockito.Mockito.times
import org.mockito.Mockito.verify
import org.mockito.MockitoAnnotations
import org.mockito.junit.jupiter.MockitoExtension
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.data.domain.PageImpl
import org.springframework.data.web.PageableHandlerMethodArgumentResolver
import org.springframework.http.MediaType
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.transaction.annotation.Transactional
import org.springframework.validation.Validator

/**
 * Integration tests for the [DepartmentResource] REST controller.
 *
 * @see DepartmentResource
 */
@SpringBootTest(classes = [XrisApp::class])
@AutoConfigureMockMvc
@WithMockUser
@Extensions(
    ExtendWith(MockitoExtension::class)
)
class DepartmentResourceIT {

    @Autowired
    private lateinit var departmentRepository: DepartmentRepository

    @Mock
    private lateinit var departmentRepositoryMock: DepartmentRepository

    @Mock
    private lateinit var departmentServiceMock: DepartmentService

    @Autowired
    private lateinit var departmentService: DepartmentService

    @Autowired
    private lateinit var jacksonMessageConverter: MappingJackson2HttpMessageConverter

    @Autowired
    private lateinit var pageableArgumentResolver: PageableHandlerMethodArgumentResolver

    @Autowired
    private lateinit var exceptionTranslator: ExceptionTranslator

    @Autowired
    private lateinit var validator: Validator

    @Autowired
    private lateinit var em: EntityManager

    private lateinit var restDepartmentMockMvc: MockMvc

    private lateinit var department: Department

    @BeforeEach
    fun setup() {
        MockitoAnnotations.initMocks(this)
        val departmentResource = DepartmentResource(departmentService)
         this.restDepartmentMockMvc = MockMvcBuilders.standaloneSetup(departmentResource)
             .setCustomArgumentResolvers(pageableArgumentResolver)
             .setControllerAdvice(exceptionTranslator)
             .setConversionService(createFormattingConversionService())
             .setMessageConverters(jacksonMessageConverter)
             .setValidator(validator).build()
    }

    @BeforeEach
    fun initTest() {
        department = createEntity(em)
    }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun createDepartment() {
        val databaseSizeBeforeCreate = departmentRepository.findAll().size

        // Create the Department
        restDepartmentMockMvc.perform(
            post("/api/departments")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonBytes(department))
        ).andExpect(status().isCreated)

        // Validate the Department in the database
        val departmentList = departmentRepository.findAll()
        assertThat(departmentList).hasSize(databaseSizeBeforeCreate + 1)
        val testDepartment = departmentList[departmentList.size - 1]
        assertThat(testDepartment.name).isEqualTo(DEFAULT_NAME)
    }

    @Test
    @Transactional
    fun createDepartmentWithExistingId() {
        val databaseSizeBeforeCreate = departmentRepository.findAll().size

        // Create the Department with an existing ID
        department.id = 1L

        // An entity with an existing ID cannot be created, so this API call must fail
        restDepartmentMockMvc.perform(
            post("/api/departments")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonBytes(department))
        ).andExpect(status().isBadRequest)

        // Validate the Department in the database
        val departmentList = departmentRepository.findAll()
        assertThat(departmentList).hasSize(databaseSizeBeforeCreate)
    }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun getAllDepartments() {
        // Initialize the database
        departmentRepository.saveAndFlush(department)

        // Get all the departmentList
        restDepartmentMockMvc.perform(get("/api/departments?sort=id,desc"))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(department.id?.toInt())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME))) }

    @Suppress("unchecked")
    @Throws(Exception::class)
    fun getAllDepartmentsWithEagerRelationshipsIsEnabled() {
        val departmentResource = DepartmentResource(departmentServiceMock)
        `when`(departmentServiceMock.findAllWithEagerRelationships(any())).thenReturn(PageImpl(mutableListOf()))

        val restDepartmentMockMvc = MockMvcBuilders.standaloneSetup(departmentResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build()

        restDepartmentMockMvc.perform(get("/api/departments?eagerload=true"))
            .andExpect(status().isOk)

        verify(departmentServiceMock, times(1)).findAllWithEagerRelationships(any())
    }

    @Suppress("unchecked")
    @Throws(Exception::class)
    fun getAllDepartmentsWithEagerRelationshipsIsNotEnabled() {
        val departmentResource = DepartmentResource(departmentServiceMock)
        `when`(departmentServiceMock.findAllWithEagerRelationships(any())).thenReturn(PageImpl(mutableListOf()))

        val restDepartmentMockMvc = MockMvcBuilders.standaloneSetup(departmentResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build()

        restDepartmentMockMvc.perform(get("/api/departments?eagerload=true"))
            .andExpect(status().isOk)

        verify(departmentServiceMock, times(1)).findAllWithEagerRelationships(any())
    }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun getDepartment() {
        // Initialize the database
        departmentRepository.saveAndFlush(department)

        val id = department.id
        assertNotNull(id)

        // Get the department
        restDepartmentMockMvc.perform(get("/api/departments/{id}", id))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(department.id?.toInt()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME)) }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun getNonExistingDepartment() {
        // Get the department
        restDepartmentMockMvc.perform(get("/api/departments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound)
    }
    @Test
    @Transactional
    fun updateDepartment() {
        // Initialize the database
        departmentService.save(department)

        val databaseSizeBeforeUpdate = departmentRepository.findAll().size

        // Update the department
        val id = department.id
        assertNotNull(id)
        val updatedDepartment = departmentRepository.findById(id).get()
        // Disconnect from session so that the updates on updatedDepartment are not directly saved in db
        em.detach(updatedDepartment)
        updatedDepartment.name = UPDATED_NAME

        restDepartmentMockMvc.perform(
            put("/api/departments")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonBytes(updatedDepartment))
        ).andExpect(status().isOk)

        // Validate the Department in the database
        val departmentList = departmentRepository.findAll()
        assertThat(departmentList).hasSize(databaseSizeBeforeUpdate)
        val testDepartment = departmentList[departmentList.size - 1]
        assertThat(testDepartment.name).isEqualTo(UPDATED_NAME)
    }

    @Test
    @Transactional
    fun updateNonExistingDepartment() {
        val databaseSizeBeforeUpdate = departmentRepository.findAll().size

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDepartmentMockMvc.perform(
            put("/api/departments")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonBytes(department))
        ).andExpect(status().isBadRequest)

        // Validate the Department in the database
        val departmentList = departmentRepository.findAll()
        assertThat(departmentList).hasSize(databaseSizeBeforeUpdate)
    }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun deleteDepartment() {
        // Initialize the database
        departmentService.save(department)

        val databaseSizeBeforeDelete = departmentRepository.findAll().size

        // Delete the department
        restDepartmentMockMvc.perform(
            delete("/api/departments/{id}", department.id)
                .accept(MediaType.APPLICATION_JSON)
        ).andExpect(status().isNoContent)

        // Validate the database contains one less item
        val departmentList = departmentRepository.findAll()
        assertThat(departmentList).hasSize(databaseSizeBeforeDelete - 1)
    }

    companion object {

        private const val DEFAULT_NAME = "AAAAAAAAAA"
        private const val UPDATED_NAME = "BBBBBBBBBB"

        /**
         * Create an entity for this test.
         *
         * This is a static method, as tests for other entities might also need it,
         * if they test an entity which requires the current entity.
         */
        @JvmStatic
        fun createEntity(em: EntityManager): Department {
            val department = Department(
                name = DEFAULT_NAME
            )

            return department
        }

        /**
         * Create an updated entity for this test.
         *
         * This is a static method, as tests for other entities might also need it,
         * if they test an entity which requires the current entity.
         */
        @JvmStatic
        fun createUpdatedEntity(em: EntityManager): Department {
            val department = Department(
                name = UPDATED_NAME
            )

            return department
        }
    }
}
