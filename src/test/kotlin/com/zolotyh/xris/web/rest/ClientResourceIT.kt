package com.zolotyh.xris.web.rest

import com.zolotyh.xris.XrisApp
import com.zolotyh.xris.domain.Client
import com.zolotyh.xris.repository.ClientRepository
import com.zolotyh.xris.service.ClientService
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
 * Integration tests for the [ClientResource] REST controller.
 *
 * @see ClientResource
 */
@SpringBootTest(classes = [XrisApp::class])
@AutoConfigureMockMvc
@WithMockUser
class ClientResourceIT {

    @Autowired
    private lateinit var clientRepository: ClientRepository

    @Autowired
    private lateinit var clientService: ClientService

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

    private lateinit var restClientMockMvc: MockMvc

    private lateinit var client: Client

    @BeforeEach
    fun setup() {
        MockitoAnnotations.initMocks(this)
        val clientResource = ClientResource(clientService)
         this.restClientMockMvc = MockMvcBuilders.standaloneSetup(clientResource)
             .setCustomArgumentResolvers(pageableArgumentResolver)
             .setControllerAdvice(exceptionTranslator)
             .setConversionService(createFormattingConversionService())
             .setMessageConverters(jacksonMessageConverter)
             .setValidator(validator).build()
    }

    @BeforeEach
    fun initTest() {
        client = createEntity(em)
    }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun createClient() {
        val databaseSizeBeforeCreate = clientRepository.findAll().size

        // Create the Client
        restClientMockMvc.perform(
            post("/api/clients")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonBytes(client))
        ).andExpect(status().isCreated)

        // Validate the Client in the database
        val clientList = clientRepository.findAll()
        assertThat(clientList).hasSize(databaseSizeBeforeCreate + 1)
        val testClient = clientList[clientList.size - 1]
        assertThat(testClient.phoneNumber).isEqualTo(DEFAULT_PHONE_NUMBER)
    }

    @Test
    @Transactional
    fun createClientWithExistingId() {
        val databaseSizeBeforeCreate = clientRepository.findAll().size

        // Create the Client with an existing ID
        client.id = 1L

        // An entity with an existing ID cannot be created, so this API call must fail
        restClientMockMvc.perform(
            post("/api/clients")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonBytes(client))
        ).andExpect(status().isBadRequest)

        // Validate the Client in the database
        val clientList = clientRepository.findAll()
        assertThat(clientList).hasSize(databaseSizeBeforeCreate)
    }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun getAllClients() {
        // Initialize the database
        clientRepository.saveAndFlush(client)

        // Get all the clientList
        restClientMockMvc.perform(get("/api/clients?sort=id,desc"))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(client.id?.toInt())))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER))) }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun getClient() {
        // Initialize the database
        clientRepository.saveAndFlush(client)

        val id = client.id
        assertNotNull(id)

        // Get the client
        restClientMockMvc.perform(get("/api/clients/{id}", id))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(client.id?.toInt()))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER)) }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun getNonExistingClient() {
        // Get the client
        restClientMockMvc.perform(get("/api/clients/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound)
    }
    @Test
    @Transactional
    fun updateClient() {
        // Initialize the database
        clientService.save(client)

        val databaseSizeBeforeUpdate = clientRepository.findAll().size

        // Update the client
        val id = client.id
        assertNotNull(id)
        val updatedClient = clientRepository.findById(id).get()
        // Disconnect from session so that the updates on updatedClient are not directly saved in db
        em.detach(updatedClient)
        updatedClient.phoneNumber = UPDATED_PHONE_NUMBER

        restClientMockMvc.perform(
            put("/api/clients")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonBytes(updatedClient))
        ).andExpect(status().isOk)

        // Validate the Client in the database
        val clientList = clientRepository.findAll()
        assertThat(clientList).hasSize(databaseSizeBeforeUpdate)
        val testClient = clientList[clientList.size - 1]
        assertThat(testClient.phoneNumber).isEqualTo(UPDATED_PHONE_NUMBER)
    }

    @Test
    @Transactional
    fun updateNonExistingClient() {
        val databaseSizeBeforeUpdate = clientRepository.findAll().size

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClientMockMvc.perform(
            put("/api/clients")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonBytes(client))
        ).andExpect(status().isBadRequest)

        // Validate the Client in the database
        val clientList = clientRepository.findAll()
        assertThat(clientList).hasSize(databaseSizeBeforeUpdate)
    }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun deleteClient() {
        // Initialize the database
        clientService.save(client)

        val databaseSizeBeforeDelete = clientRepository.findAll().size

        // Delete the client
        restClientMockMvc.perform(
            delete("/api/clients/{id}", client.id)
                .accept(MediaType.APPLICATION_JSON)
        ).andExpect(status().isNoContent)

        // Validate the database contains one less item
        val clientList = clientRepository.findAll()
        assertThat(clientList).hasSize(databaseSizeBeforeDelete - 1)
    }

    companion object {

        private const val DEFAULT_PHONE_NUMBER: Int = 1
        private const val UPDATED_PHONE_NUMBER: Int = 2

        /**
         * Create an entity for this test.
         *
         * This is a static method, as tests for other entities might also need it,
         * if they test an entity which requires the current entity.
         */
        @JvmStatic
        fun createEntity(em: EntityManager): Client {
            val client = Client(
                phoneNumber = DEFAULT_PHONE_NUMBER
            )

            return client
        }

        /**
         * Create an updated entity for this test.
         *
         * This is a static method, as tests for other entities might also need it,
         * if they test an entity which requires the current entity.
         */
        @JvmStatic
        fun createUpdatedEntity(em: EntityManager): Client {
            val client = Client(
                phoneNumber = UPDATED_PHONE_NUMBER
            )

            return client
        }
    }
}
