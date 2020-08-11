package com.zolotyh.xris.web.rest

import com.zolotyh.xris.XrisApp
import com.zolotyh.xris.domain.TransactionRow
import com.zolotyh.xris.repository.TransactionRowRepository
import com.zolotyh.xris.service.TransactionRowService
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
 * Integration tests for the [TransactionRowResource] REST controller.
 *
 * @see TransactionRowResource
 */
@SpringBootTest(classes = [XrisApp::class])
@AutoConfigureMockMvc
@WithMockUser
class TransactionRowResourceIT {

    @Autowired
    private lateinit var transactionRowRepository: TransactionRowRepository

    @Autowired
    private lateinit var transactionRowService: TransactionRowService

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

    private lateinit var restTransactionRowMockMvc: MockMvc

    private lateinit var transactionRow: TransactionRow

    @BeforeEach
    fun setup() {
        MockitoAnnotations.initMocks(this)
        val transactionRowResource = TransactionRowResource(transactionRowService)
         this.restTransactionRowMockMvc = MockMvcBuilders.standaloneSetup(transactionRowResource)
             .setCustomArgumentResolvers(pageableArgumentResolver)
             .setControllerAdvice(exceptionTranslator)
             .setConversionService(createFormattingConversionService())
             .setMessageConverters(jacksonMessageConverter)
             .setValidator(validator).build()
    }

    @BeforeEach
    fun initTest() {
        transactionRow = createEntity(em)
    }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun createTransactionRow() {
        val databaseSizeBeforeCreate = transactionRowRepository.findAll().size

        // Create the TransactionRow
        restTransactionRowMockMvc.perform(
            post("/api/transaction-rows")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonBytes(transactionRow))
        ).andExpect(status().isCreated)

        // Validate the TransactionRow in the database
        val transactionRowList = transactionRowRepository.findAll()
        assertThat(transactionRowList).hasSize(databaseSizeBeforeCreate + 1)
    }

    @Test
    @Transactional
    fun createTransactionRowWithExistingId() {
        val databaseSizeBeforeCreate = transactionRowRepository.findAll().size

        // Create the TransactionRow with an existing ID
        transactionRow.id = 1L

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransactionRowMockMvc.perform(
            post("/api/transaction-rows")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonBytes(transactionRow))
        ).andExpect(status().isBadRequest)

        // Validate the TransactionRow in the database
        val transactionRowList = transactionRowRepository.findAll()
        assertThat(transactionRowList).hasSize(databaseSizeBeforeCreate)
    }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun getAllTransactionRows() {
        // Initialize the database
        transactionRowRepository.saveAndFlush(transactionRow)

        // Get all the transactionRowList
        restTransactionRowMockMvc.perform(get("/api/transaction-rows?sort=id,desc"))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transactionRow.id?.toInt()))) }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun getTransactionRow() {
        // Initialize the database
        transactionRowRepository.saveAndFlush(transactionRow)

        val id = transactionRow.id
        assertNotNull(id)

        // Get the transactionRow
        restTransactionRowMockMvc.perform(get("/api/transaction-rows/{id}", id))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(transactionRow.id?.toInt())) }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun getNonExistingTransactionRow() {
        // Get the transactionRow
        restTransactionRowMockMvc.perform(get("/api/transaction-rows/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound)
    }
    @Test
    @Transactional
    fun updateTransactionRow() {
        // Initialize the database
        transactionRowService.save(transactionRow)

        val databaseSizeBeforeUpdate = transactionRowRepository.findAll().size

        // Update the transactionRow
        val id = transactionRow.id
        assertNotNull(id)
        val updatedTransactionRow = transactionRowRepository.findById(id).get()
        // Disconnect from session so that the updates on updatedTransactionRow are not directly saved in db
        em.detach(updatedTransactionRow)

        restTransactionRowMockMvc.perform(
            put("/api/transaction-rows")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonBytes(updatedTransactionRow))
        ).andExpect(status().isOk)

        // Validate the TransactionRow in the database
        val transactionRowList = transactionRowRepository.findAll()
        assertThat(transactionRowList).hasSize(databaseSizeBeforeUpdate)
        val testTransactionRow = transactionRowList[transactionRowList.size - 1]
    }

    @Test
    @Transactional
    fun updateNonExistingTransactionRow() {
        val databaseSizeBeforeUpdate = transactionRowRepository.findAll().size

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTransactionRowMockMvc.perform(
            put("/api/transaction-rows")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonBytes(transactionRow))
        ).andExpect(status().isBadRequest)

        // Validate the TransactionRow in the database
        val transactionRowList = transactionRowRepository.findAll()
        assertThat(transactionRowList).hasSize(databaseSizeBeforeUpdate)
    }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun deleteTransactionRow() {
        // Initialize the database
        transactionRowService.save(transactionRow)

        val databaseSizeBeforeDelete = transactionRowRepository.findAll().size

        // Delete the transactionRow
        restTransactionRowMockMvc.perform(
            delete("/api/transaction-rows/{id}", transactionRow.id)
                .accept(MediaType.APPLICATION_JSON)
        ).andExpect(status().isNoContent)

        // Validate the database contains one less item
        val transactionRowList = transactionRowRepository.findAll()
        assertThat(transactionRowList).hasSize(databaseSizeBeforeDelete - 1)
    }

    companion object {

        /**
         * Create an entity for this test.
         *
         * This is a static method, as tests for other entities might also need it,
         * if they test an entity which requires the current entity.
         */
        @JvmStatic
        fun createEntity(em: EntityManager): TransactionRow {
            val transactionRow = TransactionRow()

            return transactionRow
        }

        /**
         * Create an updated entity for this test.
         *
         * This is a static method, as tests for other entities might also need it,
         * if they test an entity which requires the current entity.
         */
        @JvmStatic
        fun createUpdatedEntity(em: EntityManager): TransactionRow {
            val transactionRow = TransactionRow()

            return transactionRow
        }
    }
}
