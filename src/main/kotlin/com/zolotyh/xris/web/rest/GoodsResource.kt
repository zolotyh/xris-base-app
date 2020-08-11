package com.zolotyh.xris.web.rest

import com.zolotyh.xris.domain.Goods
import com.zolotyh.xris.service.GoodsService
import com.zolotyh.xris.web.rest.errors.BadRequestAlertException
import io.github.jhipster.web.util.HeaderUtil
import io.github.jhipster.web.util.ResponseUtil
import java.net.URI
import java.net.URISyntaxException
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

private const val ENTITY_NAME = "goods"
/**
 * REST controller for managing [com.zolotyh.xris.domain.Goods].
 */
@RestController
@RequestMapping("/api")
class GoodsResource(
    private val goodsService: GoodsService
) {

    private val log = LoggerFactory.getLogger(javaClass)
    @Value("\${jhipster.clientApp.name}")
    private var applicationName: String? = null

    /**
     * `POST  /goods` : Create a new goods.
     *
     * @param goods the goods to create.
     * @return the [ResponseEntity] with status `201 (Created)` and with body the new goods, or with status `400 (Bad Request)` if the goods has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/goods")
    fun createGoods(@RequestBody goods: Goods): ResponseEntity<Goods> {
        log.debug("REST request to save Goods : $goods")
        if (goods.id != null) {
            throw BadRequestAlertException(
                "A new goods cannot already have an ID",
                ENTITY_NAME, "idexists"
            )
        }
        val result = goodsService.save(goods)
        return ResponseEntity.created(URI("/api/goods/${result.id}"))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.id.toString()))
            .body(result)
    }

    /**
     * `PUT  /goods` : Updates an existing goods.
     *
     * @param goods the goods to update.
     * @return the [ResponseEntity] with status `200 (OK)` and with body the updated goods,
     * or with status `400 (Bad Request)` if the goods is not valid,
     * or with status `500 (Internal Server Error)` if the goods couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/goods")
    fun updateGoods(@RequestBody goods: Goods): ResponseEntity<Goods> {
        log.debug("REST request to update Goods : $goods")
        if (goods.id == null) {
            throw BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull")
        }
        val result = goodsService.save(goods)
        return ResponseEntity.ok()
            .headers(
                HeaderUtil.createEntityUpdateAlert(
                    applicationName, true, ENTITY_NAME,
                     goods.id.toString()
                )
            )
            .body(result)
    }
    /**
     * `GET  /goods` : get all the goods.
     *

     * @param filter the filter of the request.
     * @return the [ResponseEntity] with status `200 (OK)` and the list of goods in body.
     */
    @GetMapping("/goods")
    fun getAllGoods(@RequestParam(required = false) filter: String?): MutableList<Goods> {
        if ("transactionrow-is-null".equals(filter)) {
            log.debug("REST request to get all Goodss where transactionRow is null")
            return goodsService.findAllWhereTransactionRowIsNull()
        }
        log.debug("REST request to get all Goods")

        return goodsService.findAll()
            }

    /**
     * `GET  /goods/:id` : get the "id" goods.
     *
     * @param id the id of the goods to retrieve.
     * @return the [ResponseEntity] with status `200 (OK)` and with body the goods, or with status `404 (Not Found)`.
     */
    @GetMapping("/goods/{id}")
    fun getGoods(@PathVariable id: Long): ResponseEntity<Goods> {
        log.debug("REST request to get Goods : $id")
        val goods = goodsService.findOne(id)
        return ResponseUtil.wrapOrNotFound(goods)
    }
    /**
     *  `DELETE  /goods/:id` : delete the "id" goods.
     *
     * @param id the id of the goods to delete.
     * @return the [ResponseEntity] with status `204 (NO_CONTENT)`.
     */
    @DeleteMapping("/goods/{id}")
    fun deleteGoods(@PathVariable id: Long): ResponseEntity<Void> {
        log.debug("REST request to delete Goods : $id")

        goodsService.delete(id)
            return ResponseEntity.noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build()
    }
}
