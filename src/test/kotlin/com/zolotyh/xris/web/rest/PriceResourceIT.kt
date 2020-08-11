package com.zolotyh.xris.web.rest

import com.zolotyh.xris.XrisApp
import com.zolotyh.xris.domain.Price
import com.zolotyh.xris.repository.PriceRepository
import com.zolotyh.xris.service.PriceService
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
 * Integration tests for the [PriceResource] REST controller.
 *
 * @see PriceResource
 */
@SpringBootTest(classes = [XrisApp::class])
@AutoConfigureMockMvc
@WithMockUser
class PriceResourceIT {

    @Autowired
    private lateinit var priceRepository: PriceRepository

    @Autowired
    private lateinit var priceService: PriceService

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

    private lateinit var restPriceMockMvc: MockMvc

    private lateinit var price: Price

    @BeforeEach
    fun setup() {
        MockitoAnnotations.initMocks(this)
        val priceResource = PriceResource(priceService)
         this.restPriceMockMvc = MockMvcBuilders.standaloneSetup(priceResource)
             .setCustomArgumentResolvers(pageableArgumentResolver)
             .setControllerAdvice(exceptionTranslator)
             .setConversionService(createFormattingConversionService())
             .setMessageConverters(jacksonMessageConverter)
             .setValidator(validator).build()
    }

    @BeforeEach
    fun initTest() {
        price = createEntity(em)
    }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun createPrice() {
        val databaseSizeBeforeCreate = priceRepository.findAll().size

        // Create the Price
        restPriceMockMvc.perform(
            post("/api/prices")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonBytes(price))
        ).andExpect(status().isCreated)

        // Validate the Price in the database
        val priceList = priceRepository.findAll()
        assertThat(priceList).hasSize(databaseSizeBeforeCreate + 1)
        val testPrice = priceList[priceList.size - 1]
        assertThat(testPrice.value).isEqualTo(DEFAULT_VALUE)
    }

    @Test
    @Transactional
    fun createPriceWithExistingId() {
        val databaseSizeBeforeCreate = priceRepository.findAll().size

        // Create the Price with an existing ID
        price.id = 1L

        // An entity with an existing ID cannot be created, so this API call must fail
        restPriceMockMvc.perform(
            post("/api/prices")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonBytes(price))
        ).andExpect(status().isBadRequest)

        // Validate the Price in the database
        val priceList = priceRepository.findAll()
        assertThat(priceList).hasSize(databaseSizeBeforeCreate)
    }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun getAllPrices() {
        // Initialize the database
        priceRepository.saveAndFlush(price)

        // Get all the priceList
        restPriceMockMvc.perform(get("/api/prices?sort=id,desc"))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(price.id?.toInt())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE))) }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun getPrice() {
        // Initialize the database
        priceRepository.saveAndFlush(price)

        val id = price.id
        assertNotNull(id)

        // Get the price
        restPriceMockMvc.perform(get("/api/prices/{id}", id))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(price.id?.toInt()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE)) }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun getNonExistingPrice() {
        // Get the price
        restPriceMockMvc.perform(get("/api/prices/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound)
    }
    @Test
    @Transactional
    fun updatePrice() {
        // Initialize the database
        priceService.save(price)

        val databaseSizeBeforeUpdate = priceRepository.findAll().size

        // Update the price
        val id = price.id
        assertNotNull(id)
        val updatedPrice = priceRepository.findById(id).get()
        // Disconnect from session so that the updates on updatedPrice are not directly saved in db
        em.detach(updatedPrice)
        updatedPrice.value = UPDATED_VALUE

        restPriceMockMvc.perform(
            put("/api/prices")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonBytes(updatedPrice))
        ).andExpect(status().isOk)

        // Validate the Price in the database
        val priceList = priceRepository.findAll()
        assertThat(priceList).hasSize(databaseSizeBeforeUpdate)
        val testPrice = priceList[priceList.size - 1]
        assertThat(testPrice.value).isEqualTo(UPDATED_VALUE)
    }

    @Test
    @Transactional
    fun updateNonExistingPrice() {
        val databaseSizeBeforeUpdate = priceRepository.findAll().size

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPriceMockMvc.perform(
            put("/api/prices")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonBytes(price))
        ).andExpect(status().isBadRequest)

        // Validate the Price in the database
        val priceList = priceRepository.findAll()
        assertThat(priceList).hasSize(databaseSizeBeforeUpdate)
    }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun deletePrice() {
        // Initialize the database
        priceService.save(price)

        val databaseSizeBeforeDelete = priceRepository.findAll().size

        // Delete the price
        restPriceMockMvc.perform(
            delete("/api/prices/{id}", price.id)
                .accept(MediaType.APPLICATION_JSON)
        ).andExpect(status().isNoContent)

        // Validate the database contains one less item
        val priceList = priceRepository.findAll()
        assertThat(priceList).hasSize(databaseSizeBeforeDelete - 1)
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
        fun createEntity(em: EntityManager): Price {
            val price = Price(
                value = DEFAULT_VALUE
            )

            return price
        }

        /**
         * Create an updated entity for this test.
         *
         * This is a static method, as tests for other entities might also need it,
         * if they test an entity which requires the current entity.
         */
        @JvmStatic
        fun createUpdatedEntity(em: EntityManager): Price {
            val price = Price(
                value = UPDATED_VALUE
            )

            return price
        }
    }
}
