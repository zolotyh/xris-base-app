package com.zolotyh.xris.web.rest

import com.zolotyh.xris.XrisApp
import com.zolotyh.xris.domain.Goods
import com.zolotyh.xris.repository.GoodsRepository
import com.zolotyh.xris.service.GoodsService
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
 * Integration tests for the [GoodsResource] REST controller.
 *
 * @see GoodsResource
 */
@SpringBootTest(classes = [XrisApp::class])
@AutoConfigureMockMvc
@WithMockUser
class GoodsResourceIT {

    @Autowired
    private lateinit var goodsRepository: GoodsRepository

    @Autowired
    private lateinit var goodsService: GoodsService

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

    private lateinit var restGoodsMockMvc: MockMvc

    private lateinit var goods: Goods

    @BeforeEach
    fun setup() {
        MockitoAnnotations.initMocks(this)
        val goodsResource = GoodsResource(goodsService)
         this.restGoodsMockMvc = MockMvcBuilders.standaloneSetup(goodsResource)
             .setCustomArgumentResolvers(pageableArgumentResolver)
             .setControllerAdvice(exceptionTranslator)
             .setConversionService(createFormattingConversionService())
             .setMessageConverters(jacksonMessageConverter)
             .setValidator(validator).build()
    }

    @BeforeEach
    fun initTest() {
        goods = createEntity(em)
    }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun createGoods() {
        val databaseSizeBeforeCreate = goodsRepository.findAll().size

        // Create the Goods
        restGoodsMockMvc.perform(
            post("/api/goods")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonBytes(goods))
        ).andExpect(status().isCreated)

        // Validate the Goods in the database
        val goodsList = goodsRepository.findAll()
        assertThat(goodsList).hasSize(databaseSizeBeforeCreate + 1)
        val testGoods = goodsList[goodsList.size - 1]
        assertThat(testGoods.name).isEqualTo(DEFAULT_NAME)
        assertThat(testGoods.description).isEqualTo(DEFAULT_DESCRIPTION)
    }

    @Test
    @Transactional
    fun createGoodsWithExistingId() {
        val databaseSizeBeforeCreate = goodsRepository.findAll().size

        // Create the Goods with an existing ID
        goods.id = 1L

        // An entity with an existing ID cannot be created, so this API call must fail
        restGoodsMockMvc.perform(
            post("/api/goods")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonBytes(goods))
        ).andExpect(status().isBadRequest)

        // Validate the Goods in the database
        val goodsList = goodsRepository.findAll()
        assertThat(goodsList).hasSize(databaseSizeBeforeCreate)
    }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun getAllGoods() {
        // Initialize the database
        goodsRepository.saveAndFlush(goods)

        // Get all the goodsList
        restGoodsMockMvc.perform(get("/api/goods?sort=id,desc"))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(goods.id?.toInt())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION))) }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun getGoods() {
        // Initialize the database
        goodsRepository.saveAndFlush(goods)

        val id = goods.id
        assertNotNull(id)

        // Get the goods
        restGoodsMockMvc.perform(get("/api/goods/{id}", id))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(goods.id?.toInt()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION)) }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun getNonExistingGoods() {
        // Get the goods
        restGoodsMockMvc.perform(get("/api/goods/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound)
    }
    @Test
    @Transactional
    fun updateGoods() {
        // Initialize the database
        goodsService.save(goods)

        val databaseSizeBeforeUpdate = goodsRepository.findAll().size

        // Update the goods
        val id = goods.id
        assertNotNull(id)
        val updatedGoods = goodsRepository.findById(id).get()
        // Disconnect from session so that the updates on updatedGoods are not directly saved in db
        em.detach(updatedGoods)
        updatedGoods.name = UPDATED_NAME
        updatedGoods.description = UPDATED_DESCRIPTION

        restGoodsMockMvc.perform(
            put("/api/goods")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonBytes(updatedGoods))
        ).andExpect(status().isOk)

        // Validate the Goods in the database
        val goodsList = goodsRepository.findAll()
        assertThat(goodsList).hasSize(databaseSizeBeforeUpdate)
        val testGoods = goodsList[goodsList.size - 1]
        assertThat(testGoods.name).isEqualTo(UPDATED_NAME)
        assertThat(testGoods.description).isEqualTo(UPDATED_DESCRIPTION)
    }

    @Test
    @Transactional
    fun updateNonExistingGoods() {
        val databaseSizeBeforeUpdate = goodsRepository.findAll().size

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGoodsMockMvc.perform(
            put("/api/goods")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertObjectToJsonBytes(goods))
        ).andExpect(status().isBadRequest)

        // Validate the Goods in the database
        val goodsList = goodsRepository.findAll()
        assertThat(goodsList).hasSize(databaseSizeBeforeUpdate)
    }

    @Test
    @Transactional
    @Throws(Exception::class)
    fun deleteGoods() {
        // Initialize the database
        goodsService.save(goods)

        val databaseSizeBeforeDelete = goodsRepository.findAll().size

        // Delete the goods
        restGoodsMockMvc.perform(
            delete("/api/goods/{id}", goods.id)
                .accept(MediaType.APPLICATION_JSON)
        ).andExpect(status().isNoContent)

        // Validate the database contains one less item
        val goodsList = goodsRepository.findAll()
        assertThat(goodsList).hasSize(databaseSizeBeforeDelete - 1)
    }

    companion object {

        private const val DEFAULT_NAME = "AAAAAAAAAA"
        private const val UPDATED_NAME = "BBBBBBBBBB"

        private const val DEFAULT_DESCRIPTION = "AAAAAAAAAA"
        private const val UPDATED_DESCRIPTION = "BBBBBBBBBB"

        /**
         * Create an entity for this test.
         *
         * This is a static method, as tests for other entities might also need it,
         * if they test an entity which requires the current entity.
         */
        @JvmStatic
        fun createEntity(em: EntityManager): Goods {
            val goods = Goods(
                name = DEFAULT_NAME,
                description = DEFAULT_DESCRIPTION
            )

            return goods
        }

        /**
         * Create an updated entity for this test.
         *
         * This is a static method, as tests for other entities might also need it,
         * if they test an entity which requires the current entity.
         */
        @JvmStatic
        fun createUpdatedEntity(em: EntityManager): Goods {
            val goods = Goods(
                name = UPDATED_NAME,
                description = UPDATED_DESCRIPTION
            )

            return goods
        }
    }
}
