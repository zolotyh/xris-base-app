package com.zolotyh.xris.web.rest

import com.zolotyh.xris.XrisApp
import com.zolotyh.xris.domain.Customer
import com.zolotyh.xris.repository.CustomerRepository
import com.zolotyh.xris.service.CustomerService
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
 * Integration tests for the [CustomerResource] REST controller.
 *
 * @see CustomerResource
 */
@SpringBootTest(classes = [XrisApp::class])
@AutoConfigureMockMvc
@WithMockUser
class CustomerResourceIT {

    @Autowired
    private lateinit var customerRepository: CustomerRepository

    @Autowired
    private lateinit var customerService: CustomerService

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

    private lateinit var restCustomerMockMvc: MockMvc

    private lateinit var customer: Customer

    @BeforeEach
    fun setup() {
        MockitoAnnotations.initMocks(this)
        val customerResource = CustomerResource(customerService)
         this.restCustomerMockMvc = MockMvcBuilders.standaloneSetup(customerResource)
             .setCustomArgumentResolvers(pageableArgumentResolver)
             .setControllerAdvice(exceptionTranslator)
             .setConversionService(createFormattingConversionService())
             .setMessageConverters(jacksonMessageConverter)
             .setValidator(validator).build()
    }

    @BeforeEach
    fun initTest() {
        customer = createEntity(em)
    }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun createCustomer() {
        val databaseSizeBeforeCreate = customerRepository.findAll().size

        // Create the Customer
        restCustomerMockMvc.perform(
            post("/api/customers")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonBytes(customer))
        ).andExpect(status().isCreated)

        // Validate the Customer in the database
        val customerList = customerRepository.findAll()
        assertThat(customerList).hasSize(databaseSizeBeforeCreate + 1)
        val testCustomer = customerList[customerList.size - 1]
        assertThat(testCustomer.name).isEqualTo(DEFAULT_NAME)
    }

    @Test
    @Transactional
    fun createCustomerWithExistingId() {
        val databaseSizeBeforeCreate = customerRepository.findAll().size

        // Create the Customer with an existing ID
        customer.id = 1L

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustomerMockMvc.perform(
            post("/api/customers")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonBytes(customer))
        ).andExpect(status().isBadRequest)

        // Validate the Customer in the database
        val customerList = customerRepository.findAll()
        assertThat(customerList).hasSize(databaseSizeBeforeCreate)
    }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun getAllCustomers() {
        // Initialize the database
        customerRepository.saveAndFlush(customer)

        // Get all the customerList
        restCustomerMockMvc.perform(get("/api/customers?sort=id,desc"))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customer.id?.toInt())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME))) }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun getCustomer() {
        // Initialize the database
        customerRepository.saveAndFlush(customer)

        val id = customer.id
        assertNotNull(id)

        // Get the customer
        restCustomerMockMvc.perform(get("/api/customers/{id}", id))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(customer.id?.toInt()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME)) }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun getNonExistingCustomer() {
        // Get the customer
        restCustomerMockMvc.perform(get("/api/customers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound)
    }
    @Test
    @Transactional
    fun updateCustomer() {
        // Initialize the database
        customerService.save(customer)

        val databaseSizeBeforeUpdate = customerRepository.findAll().size

        // Update the customer
        val id = customer.id
        assertNotNull(id)
        val updatedCustomer = customerRepository.findById(id).get()
        // Disconnect from session so that the updates on updatedCustomer are not directly saved in db
        em.detach(updatedCustomer)
        updatedCustomer.name = UPDATED_NAME

        restCustomerMockMvc.perform(
            put("/api/customers")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonBytes(updatedCustomer))
        ).andExpect(status().isOk)

        // Validate the Customer in the database
        val customerList = customerRepository.findAll()
        assertThat(customerList).hasSize(databaseSizeBeforeUpdate)
        val testCustomer = customerList[customerList.size - 1]
        assertThat(testCustomer.name).isEqualTo(UPDATED_NAME)
    }

    @Test
    @Transactional
    fun updateNonExistingCustomer() {
        val databaseSizeBeforeUpdate = customerRepository.findAll().size

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCustomerMockMvc.perform(
            put("/api/customers")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonBytes(customer))
        ).andExpect(status().isBadRequest)

        // Validate the Customer in the database
        val customerList = customerRepository.findAll()
        assertThat(customerList).hasSize(databaseSizeBeforeUpdate)
    }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun deleteCustomer() {
        // Initialize the database
        customerService.save(customer)

        val databaseSizeBeforeDelete = customerRepository.findAll().size

        // Delete the customer
        restCustomerMockMvc.perform(
            delete("/api/customers/{id}", customer.id)
                .accept(MediaType.APPLICATION_JSON)
        ).andExpect(status().isNoContent)

        // Validate the database contains one less item
        val customerList = customerRepository.findAll()
        assertThat(customerList).hasSize(databaseSizeBeforeDelete - 1)
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
        fun createEntity(em: EntityManager): Customer {
            val customer = Customer(
                name = DEFAULT_NAME
            )

            return customer
        }

        /**
         * Create an updated entity for this test.
         *
         * This is a static method, as tests for other entities might also need it,
         * if they test an entity which requires the current entity.
         */
        @JvmStatic
        fun createUpdatedEntity(em: EntityManager): Customer {
            val customer = Customer(
                name = UPDATED_NAME
            )

            return customer
        }
    }
}
