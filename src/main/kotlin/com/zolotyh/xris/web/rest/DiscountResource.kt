package com.zolotyh.xris.web.rest

import com.zolotyh.xris.domain.Discount
import com.zolotyh.xris.service.DiscountService
import com.zolotyh.xris.web.rest.errors.BadRequestAlertException
import io.github.jhipster.web.util.HeaderUtil
import io.github.jhipster.web.util.ResponseUtil
import java.net.URI
import java.net.URISyntaxException
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

private const val ENTITY_NAME = "discount"
/**
 * REST controller for managing [com.zolotyh.xris.domain.Discount].
 */
@RestController
@RequestMapping("/api")
class DiscountResource(
    private val discountService: DiscountService
) {

    private val log = LoggerFactory.getLogger(javaClass)
    @Value("\${jhipster.clientApp.name}")
    private var applicationName: String? = null

    /**
     * `POST  /discounts` : Create a new discount.
     *
     * @param discount the discount to create.
     * @return the [ResponseEntity] with status `201 (Created)` and with body the new discount, or with status `400 (Bad Request)` if the discount has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/discounts")
    fun createDiscount(@RequestBody discount: Discount): ResponseEntity<Discount> {
        log.debug("REST request to save Discount : $discount")
        if (discount.id != null) {
            throw BadRequestAlertException(
                "A new discount cannot already have an ID",
                ENTITY_NAME, "idexists"
            )
        }
        val result = discountService.save(discount)
        return ResponseEntity.created(URI("/api/discounts/${result.id}"))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.id.toString()))
            .body(result)
    }

    /**
     * `PUT  /discounts` : Updates an existing discount.
     *
     * @param discount the discount to update.
     * @return the [ResponseEntity] with status `200 (OK)` and with body the updated discount,
     * or with status `400 (Bad Request)` if the discount is not valid,
     * or with status `500 (Internal Server Error)` if the discount couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/discounts")
    fun updateDiscount(@RequestBody discount: Discount): ResponseEntity<Discount> {
        log.debug("REST request to update Discount : $discount")
        if (discount.id == null) {
            throw BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull")
        }
        val result = discountService.save(discount)
        return ResponseEntity.ok()
            .headers(
                HeaderUtil.createEntityUpdateAlert(
                    applicationName, true, ENTITY_NAME,
                     discount.id.toString()
                )
            )
            .body(result)
    }
    /**
     * `GET  /discounts` : get all the discounts.
     *

     * @param filter the filter of the request.
     * @return the [ResponseEntity] with status `200 (OK)` and the list of discounts in body.
     */
    @GetMapping("/discounts")
    fun getAllDiscounts(@RequestParam(required = false) filter: String?): MutableList<Discount> {
        if ("transactionrow-is-null".equals(filter)) {
            log.debug("REST request to get all Discounts where transactionRow is null")
            return discountService.findAllWhereTransactionRowIsNull()
        }
        log.debug("REST request to get all Discounts")

        return discountService.findAll()
            }

    /**
     * `GET  /discounts/:id` : get the "id" discount.
     *
     * @param id the id of the discount to retrieve.
     * @return the [ResponseEntity] with status `200 (OK)` and with body the discount, or with status `404 (Not Found)`.
     */
    @GetMapping("/discounts/{id}")
    fun getDiscount(@PathVariable id: Long): ResponseEntity<Discount> {
        log.debug("REST request to get Discount : $id")
        val discount = discountService.findOne(id)
        return ResponseUtil.wrapOrNotFound(discount)
    }
    /**
     *  `DELETE  /discounts/:id` : delete the "id" discount.
     *
     * @param id the id of the discount to delete.
     * @return the [ResponseEntity] with status `204 (NO_CONTENT)`.
     */
    @DeleteMapping("/discounts/{id}")
    fun deleteDiscount(@PathVariable id: Long): ResponseEntity<Void> {
        log.debug("REST request to delete Discount : $id")

        discountService.delete(id)
            return ResponseEntity.noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build()
    }
}
