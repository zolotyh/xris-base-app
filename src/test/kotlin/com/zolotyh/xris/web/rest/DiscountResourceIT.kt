package com.zolotyh.xris.web.rest

import com.zolotyh.xris.XrisApp
import com.zolotyh.xris.domain.Discount
import com.zolotyh.xris.repository.DiscountRepository
import com.zolotyh.xris.service.DiscountService
import com.zolotyh.xris.web.rest.errors.ExceptionTranslator
import javax.persistence.EntityManager
import kotlin.test.assertNotNull
import org.assertj.core.api.Assertions.assertThat
import org.hamcrest.Matchers.hasItem
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.MockitoAnnotations
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
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
 * Integration tests for the [DiscountResource] REST controller.
 *
 * @see DiscountResource
 */
@SpringBootTest(classes = [XrisApp::class])
@AutoConfigureMockMvc
@WithMockUser
class DiscountResourceIT {

    @Autowired
    private lateinit var discountRepository: DiscountRepository

    @Autowired
    private lateinit var discountService: DiscountService

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

    private lateinit var restDiscountMockMvc: MockMvc

    private lateinit var discount: Discount

    @BeforeEach
    fun setup() {
        MockitoAnnotations.initMocks(this)
        val discountResource = DiscountResource(discountService)
         this.restDiscountMockMvc = MockMvcBuilders.standaloneSetup(discountResource)
             .setCustomArgumentResolvers(pageableArgumentResolver)
             .setControllerAdvice(exceptionTranslator)
             .setConversionService(createFormattingConversionService())
             .setMessageConverters(jacksonMessageConverter)
             .setValidator(validator).build()
    }

    @BeforeEach
    fun initTest() {
        discount = createEntity(em)
    }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun createDiscount() {
        val databaseSizeBeforeCreate = discountRepository.findAll().size

        // Create the Discount
        restDiscountMockMvc.perform(
            post("/api/discounts")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonBytes(discount))
        ).andExpect(status().isCreated)

        // Validate the Discount in the database
        val discountList = discountRepository.findAll()
        assertThat(discountList).hasSize(databaseSizeBeforeCreate + 1)
        val testDiscount = discountList[discountList.size - 1]
        assertThat(testDiscount.value).isEqualTo(DEFAULT_VALUE)
    }

    @Test
    @Transactional
    fun createDiscountWithExistingId() {
        val databaseSizeBeforeCreate = discountRepository.findAll().size

        // Create the Discount with an existing ID
        discount.id = 1L

        // An entity with an existing ID cannot be created, so this API call must fail
        restDiscountMockMvc.perform(
            post("/api/discounts")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonBytes(discount))
        ).andExpect(status().isBadRequest)

        // Validate the Discount in the database
        val discountList = discountRepository.findAll()
        assertThat(discountList).hasSize(databaseSizeBeforeCreate)
    }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun getAllDiscounts() {
        // Initialize the database
        discountRepository.saveAndFlush(discount)

        // Get all the discountList
        restDiscountMockMvc.perform(get("/api/discounts?sort=id,desc"))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(discount.id?.toInt())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE))) }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun getDiscount() {
        // Initialize the database
        discountRepository.saveAndFlush(discount)

        val id = discount.id
        assertNotNull(id)

        // Get the discount
        restDiscountMockMvc.perform(get("/api/discounts/{id}", id))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(discount.id?.toInt()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE)) }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun getNonExistingDiscount() {
        // Get the discount
        restDiscountMockMvc.perform(get("/api/discounts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound)
    }
    @Test
    @Transactional
    fun updateDiscount() {
        // Initialize the database
        discountService.save(discount)

        val databaseSizeBeforeUpdate = discountRepository.findAll().size

        // Update the discount
        val id = discount.id
        assertNotNull(id)
        val updatedDiscount = discountRepository.findById(id).get()
        // Disconnect from session so that the updates on updatedDiscount are not directly saved in db
        em.detach(updatedDiscount)
        updatedDiscount.value = UPDATED_VALUE

        restDiscountMockMvc.perform(
            put("/api/discounts")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonBytes(updatedDiscount))
        ).andExpect(status().isOk)

        // Validate the Discount in the database
        val discountList = discountRepository.findAll()
        assertThat(discountList).hasSize(databaseSizeBeforeUpdate)
        val testDiscount = discountList[discountList.size - 1]
        assertThat(testDiscount.value).isEqualTo(UPDATED_VALUE)
    }

    @Test
    @Transactional
    fun updateNonExistingDiscount() {
        val databaseSizeBeforeUpdate = discountRepository.findAll().size

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDiscountMockMvc.perform(
            put("/api/discounts")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonBytes(discount))
        ).andExpect(status().isBadRequest)

        // Validate the Discount in the database
        val discountList = discountRepository.findAll()
        assertThat(discountList).hasSize(databaseSizeBeforeUpdate)
    }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun deleteDiscount() {
        // Initialize the database
        discountService.save(discount)

        val databaseSizeBeforeDelete = discountRepository.findAll().size

        // Delete the discount
        restDiscountMockMvc.perform(
            delete("/api/discounts/{id}", discount.id)
                .accept(MediaType.APPLICATION_JSON)
        ).andExpect(status().isNoContent)

        // Validate the database contains one less item
        val discountList = discountRepository.findAll()
        assertThat(discountList).hasSize(databaseSizeBeforeDelete - 1)
    }

    companion object {

        private const val DEFAULT_VALUE: Int = 1
        private const val UPDATED_VALUE: Int = 2

        /**
         * Create an entity for this test.
         *
         * This is a static method, as tests for other entities might also need it,
         * if they test an entity which requires the current entity.
         */
        @JvmStatic
        fun createEntity(em: EntityManager): Discount {
            val discount = Discount(
                value = DEFAULT_VALUE
            )

            return discount
        }

        /**
         * Create an updated entity for this test.
         *
         * This is a static method, as tests for other entities might also need it,
         * if they test an entity which requires the current entity.
         */
        @JvmStatic
        fun createUpdatedEntity(em: EntityManager): Discount {
            val discount = Discount(
                value = UPDATED_VALUE
            )

            return discount
        }
    }
}
