package com.zolotyh.xris.web.rest

import com.zolotyh.xris.domain.Price
import com.zolotyh.xris.service.PriceService
import com.zolotyh.xris.web.rest.errors.BadRequestAlertException
import io.github.jhipster.web.util.HeaderUtil
import io.github.jhipster.web.util.ResponseUtil
import java.net.URI
import java.net.URISyntaxException
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

private const val ENTITY_NAME = "price"
/**
 * REST controller for managing [com.zolotyh.xris.domain.Price].
 */
@RestController
@RequestMapping("/api")
class PriceResource(
    private val priceService: PriceService
) {

    private val log = LoggerFactory.getLogger(javaClass)
    @Value("\${jhipster.clientApp.name}")
    private var applicationName: String? = null

    /**
     * `POST  /prices` : Create a new price.
     *
     * @param price the price to create.
     * @return the [ResponseEntity] with status `201 (Created)` and with body the new price, or with status `400 (Bad Request)` if the price has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/prices")
    fun createPrice(@RequestBody price: Price): ResponseEntity<Price> {
        log.debug("REST request to save Price : $price")
        if (price.id != null) {
            throw BadRequestAlertException(
                "A new price cannot already have an ID",
                ENTITY_NAME, "idexists"
            )
        }
        val result = priceService.save(price)
        return ResponseEntity.created(URI("/api/prices/${result.id}"))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.id.toString()))
            .body(result)
    }

    /**
     * `PUT  /prices` : Updates an existing price.
     *
     * @param price the price to update.
     * @return the [ResponseEntity] with status `200 (OK)` and with body the updated price,
     * or with status `400 (Bad Request)` if the price is not valid,
     * or with status `500 (Internal Server Error)` if the price couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/prices")
    fun updatePrice(@RequestBody price: Price): ResponseEntity<Price> {
        log.debug("REST request to update Price : $price")
        if (price.id == null) {
            throw BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull")
        }
        val result = priceService.save(price)
        return ResponseEntity.ok()
            .headers(
                HeaderUtil.createEntityUpdateAlert(
                    applicationName, true, ENTITY_NAME,
                     price.id.toString()
                )
            )
            .body(result)
    }
    /**
     * `GET  /prices` : get all the prices.
     *

     * @param filter the filter of the request.
     * @return the [ResponseEntity] with status `200 (OK)` and the list of prices in body.
     */
    @GetMapping("/prices")
    fun getAllPrices(@RequestParam(required = false) filter: String?): MutableList<Price> {
        if ("transactionrow-is-null".equals(filter)) {
            log.debug("REST request to get all Prices where transactionRow is null")
            return priceService.findAllWhereTransactionRowIsNull()
        }
        log.debug("REST request to get all Prices")

        return priceService.findAll()
            }

    /**
     * `GET  /prices/:id` : get the "id" price.
     *
     * @param id the id of the price to retrieve.
     * @return the [ResponseEntity] with status `200 (OK)` and with body the price, or with status `404 (Not Found)`.
     */
    @GetMapping("/prices/{id}")
    fun getPrice(@PathVariable id: Long): ResponseEntity<Price> {
        log.debug("REST request to get Price : $id")
        val price = priceService.findOne(id)
        return ResponseUtil.wrapOrNotFound(price)
    }
    /**
     *  `DELETE  /prices/:id` : delete the "id" price.
     *
     * @param id the id of the price to delete.
     * @return the [ResponseEntity] with status `204 (NO_CONTENT)`.
     */
    @DeleteMapping("/prices/{id}")
    fun deletePrice(@PathVariable id: Long): ResponseEntity<Void> {
        log.debug("REST request to delete Price : $id")

        priceService.delete(id)
            return ResponseEntity.noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build()
    }
}
