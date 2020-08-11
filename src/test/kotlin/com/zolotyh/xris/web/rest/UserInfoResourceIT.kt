package com.zolotyh.xris.web.rest

import com.zolotyh.xris.XrisApp
import com.zolotyh.xris.domain.UserInfo
import com.zolotyh.xris.repository.UserInfoRepository
import com.zolotyh.xris.service.UserInfoService
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
 * Integration tests for the [UserInfoResource] REST controller.
 *
 * @see UserInfoResource
 */
@SpringBootTest(classes = [XrisApp::class])
@AutoConfigureMockMvc
@WithMockUser
@Extensions(
    ExtendWith(MockitoExtension::class)
)
class UserInfoResourceIT {

    @Autowired
    private lateinit var userInfoRepository: UserInfoRepository

    @Mock
    private lateinit var userInfoRepositoryMock: UserInfoRepository

    @Mock
    private lateinit var userInfoServiceMock: UserInfoService

    @Autowired
    private lateinit var userInfoService: UserInfoService

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

    private lateinit var restUserInfoMockMvc: MockMvc

    private lateinit var userInfo: UserInfo

    @BeforeEach
    fun setup() {
        MockitoAnnotations.initMocks(this)
        val userInfoResource = UserInfoResource(userInfoService)
         this.restUserInfoMockMvc = MockMvcBuilders.standaloneSetup(userInfoResource)
             .setCustomArgumentResolvers(pageableArgumentResolver)
             .setControllerAdvice(exceptionTranslator)
             .setConversionService(createFormattingConversionService())
             .setMessageConverters(jacksonMessageConverter)
             .setValidator(validator).build()
    }

    @BeforeEach
    fun initTest() {
        userInfo = createEntity(em)
    }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun createUserInfo() {
        val databaseSizeBeforeCreate = userInfoRepository.findAll().size

        // Create the UserInfo
        restUserInfoMockMvc.perform(
            post("/api/user-infos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonBytes(userInfo))
        ).andExpect(status().isCreated)

        // Validate the UserInfo in the database
        val userInfoList = userInfoRepository.findAll()
        assertThat(userInfoList).hasSize(databaseSizeBeforeCreate + 1)
        val testUserInfo = userInfoList[userInfoList.size - 1]
        assertThat(testUserInfo.email).isEqualTo(DEFAULT_EMAIL)
        assertThat(testUserInfo.login).isEqualTo(DEFAULT_LOGIN)
    }

    @Test
    @Transactional
    fun createUserInfoWithExistingId() {
        val databaseSizeBeforeCreate = userInfoRepository.findAll().size

        // Create the UserInfo with an existing ID
        userInfo.id = 1L

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserInfoMockMvc.perform(
            post("/api/user-infos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonBytes(userInfo))
        ).andExpect(status().isBadRequest)

        // Validate the UserInfo in the database
        val userInfoList = userInfoRepository.findAll()
        assertThat(userInfoList).hasSize(databaseSizeBeforeCreate)
    }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun getAllUserInfos() {
        // Initialize the database
        userInfoRepository.saveAndFlush(userInfo)

        // Get all the userInfoList
        restUserInfoMockMvc.perform(get("/api/user-infos?sort=id,desc"))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userInfo.id?.toInt())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].login").value(hasItem(DEFAULT_LOGIN))) }

    @Suppress("unchecked")
    @Throws(Exception::class)
    fun getAllUserInfosWithEagerRelationshipsIsEnabled() {
        val userInfoResource = UserInfoResource(userInfoServiceMock)
        `when`(userInfoServiceMock.findAllWithEagerRelationships(any())).thenReturn(PageImpl(mutableListOf()))

        val restUserInfoMockMvc = MockMvcBuilders.standaloneSetup(userInfoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build()

        restUserInfoMockMvc.perform(get("/api/user-infos?eagerload=true"))
            .andExpect(status().isOk)

        verify(userInfoServiceMock, times(1)).findAllWithEagerRelationships(any())
    }

    @Suppress("unchecked")
    @Throws(Exception::class)
    fun getAllUserInfosWithEagerRelationshipsIsNotEnabled() {
        val userInfoResource = UserInfoResource(userInfoServiceMock)
        `when`(userInfoServiceMock.findAllWithEagerRelationships(any())).thenReturn(PageImpl(mutableListOf()))

        val restUserInfoMockMvc = MockMvcBuilders.standaloneSetup(userInfoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build()

        restUserInfoMockMvc.perform(get("/api/user-infos?eagerload=true"))
            .andExpect(status().isOk)

        verify(userInfoServiceMock, times(1)).findAllWithEagerRelationships(any())
    }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun getUserInfo() {
        // Initialize the database
        userInfoRepository.saveAndFlush(userInfo)

        val id = userInfo.id
        assertNotNull(id)

        // Get the userInfo
        restUserInfoMockMvc.perform(get("/api/user-infos/{id}", id))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(userInfo.id?.toInt()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.login").value(DEFAULT_LOGIN)) }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun getNonExistingUserInfo() {
        // Get the userInfo
        restUserInfoMockMvc.perform(get("/api/user-infos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound)
    }
    @Test
    @Transactional
    fun updateUserInfo() {
        // Initialize the database
        userInfoService.save(userInfo)

        val databaseSizeBeforeUpdate = userInfoRepository.findAll().size

        // Update the userInfo
        val id = userInfo.id
        assertNotNull(id)
        val updatedUserInfo = userInfoRepository.findById(id).get()
        // Disconnect from session so that the updates on updatedUserInfo are not directly saved in db
        em.detach(updatedUserInfo)
        updatedUserInfo.email = UPDATED_EMAIL
        updatedUserInfo.login = UPDATED_LOGIN

        restUserInfoMockMvc.perform(
            put("/api/user-infos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonBytes(updatedUserInfo))
        ).andExpect(status().isOk)

        // Validate the UserInfo in the database
        val userInfoList = userInfoRepository.findAll()
        assertThat(userInfoList).hasSize(databaseSizeBeforeUpdate)
        val testUserInfo = userInfoList[userInfoList.size - 1]
        assertThat(testUserInfo.email).isEqualTo(UPDATED_EMAIL)
        assertThat(testUserInfo.login).isEqualTo(UPDATED_LOGIN)
    }

    @Test
    @Transactional
    fun updateNonExistingUserInfo() {
        val databaseSizeBeforeUpdate = userInfoRepository.findAll().size

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserInfoMockMvc.perform(
            put("/api/user-infos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonBytes(userInfo))
        ).andExpect(status().isBadRequest)

        // Validate the UserInfo in the database
        val userInfoList = userInfoRepository.findAll()
        assertThat(userInfoList).hasSize(databaseSizeBeforeUpdate)
    }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun deleteUserInfo() {
        // Initialize the database
        userInfoService.save(userInfo)

        val databaseSizeBeforeDelete = userInfoRepository.findAll().size

        // Delete the userInfo
        restUserInfoMockMvc.perform(
            delete("/api/user-infos/{id}", userInfo.id)
                .accept(MediaType.APPLICATION_JSON)
        ).andExpect(status().isNoContent)

        // Validate the database contains one less item
        val userInfoList = userInfoRepository.findAll()
        assertThat(userInfoList).hasSize(databaseSizeBeforeDelete - 1)
    }

    companion object {

        private const val DEFAULT_EMAIL = "AAAAAAAAAA"
        private const val UPDATED_EMAIL = "BBBBBBBBBB"

        private const val DEFAULT_LOGIN = "AAAAAAAAAA"
        private const val UPDATED_LOGIN = "BBBBBBBBBB"

        /**
         * Create an entity for this test.
         *
         * This is a static method, as tests for other entities might also need it,
         * if they test an entity which requires the current entity.
         */
        @JvmStatic
        fun createEntity(em: EntityManager): UserInfo {
            val userInfo = UserInfo(
                email = DEFAULT_EMAIL,
                login = DEFAULT_LOGIN
            )

            return userInfo
        }

        /**
         * Create an updated entity for this test.
         *
         * This is a static method, as tests for other entities might also need it,
         * if they test an entity which requires the current entity.
         */
        @JvmStatic
        fun createUpdatedEntity(em: EntityManager): UserInfo {
            val userInfo = UserInfo(
                email = UPDATED_EMAIL,
                login = UPDATED_LOGIN
            )

            return userInfo
        }
    }
}
