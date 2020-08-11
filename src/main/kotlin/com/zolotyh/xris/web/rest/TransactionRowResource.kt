package com.zolotyh.xris.web.rest

import com.zolotyh.xris.domain.TransactionRow
import com.zolotyh.xris.service.TransactionRowService
import com.zolotyh.xris.web.rest.errors.BadRequestAlertException
import io.github.jhipster.web.util.HeaderUtil
import io.github.jhipster.web.util.ResponseUtil
import java.net.URI
import java.net.URISyntaxException
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

private const val ENTITY_NAME = "transactionRow"
/**
 * REST controller for managing [com.zolotyh.xris.domain.TransactionRow].
 */
@RestController
@RequestMapping("/api")
class TransactionRowResource(
    private val transactionRowService: TransactionRowService
) {

    private val log = LoggerFactory.getLogger(javaClass)
    @Value("\${jhipster.clientApp.name}")
    private var applicationName: String? = null

    /**
     * `POST  /transaction-rows` : Create a new transactionRow.
     *
     * @param transactionRow the transactionRow to create.
     * @return the [ResponseEntity] with status `201 (Created)` and with body the new transactionRow, or with status `400 (Bad Request)` if the transactionRow has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/transaction-rows")
    fun createTransactionRow(@RequestBody transactionRow: TransactionRow): ResponseEntity<TransactionRow> {
        log.debug("REST request to save TransactionRow : $transactionRow")
        if (transactionRow.id != null) {
            throw BadRequestAlertException(
                "A new transactionRow cannot already have an ID",
                ENTITY_NAME, "idexists"
            )
        }
        val result = transactionRowService.save(transactionRow)
        return ResponseEntity.created(URI("/api/transaction-rows/${result.id}"))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.id.toString()))
            .body(result)
    }

    /**
     * `PUT  /transaction-rows` : Updates an existing transactionRow.
     *
     * @param transactionRow the transactionRow to update.
     * @return the [ResponseEntity] with status `200 (OK)` and with body the updated transactionRow,
     * or with status `400 (Bad Request)` if the transactionRow is not valid,
     * or with status `500 (Internal Server Error)` if the transactionRow couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/transaction-rows")
    fun updateTransactionRow(@RequestBody transactionRow: TransactionRow): ResponseEntity<TransactionRow> {
        log.debug("REST request to update TransactionRow : $transactionRow")
        if (transactionRow.id == null) {
            throw BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull")
        }
        val result = transactionRowService.save(transactionRow)
        return ResponseEntity.ok()
            .headers(
                HeaderUtil.createEntityUpdateAlert(
                    applicationName, true, ENTITY_NAME,
                     transactionRow.id.toString()
                )
            )
            .body(result)
    }
    /**
     * `GET  /transaction-rows` : get all the transactionRows.
     *

     * @return the [ResponseEntity] with status `200 (OK)` and the list of transactionRows in body.
     */
    @GetMapping("/transaction-rows")
    fun getAllTransactionRows(): MutableList<TransactionRow> {
        log.debug("REST request to get all TransactionRows")

        return transactionRowService.findAll()
            }

    /**
     * `GET  /transaction-rows/:id` : get the "id" transactionRow.
     *
     * @param id the id of the transactionRow to retrieve.
     * @return the [ResponseEntity] with status `200 (OK)` and with body the transactionRow, or with status `404 (Not Found)`.
     */
    @GetMapping("/transaction-rows/{id}")
    fun getTransactionRow(@PathVariable id: Long): ResponseEntity<TransactionRow> {
        log.debug("REST request to get TransactionRow : $id")
        val transactionRow = transactionRowService.findOne(id)
        return ResponseUtil.wrapOrNotFound(transactionRow)
    }
    /**
     *  `DELETE  /transaction-rows/:id` : delete the "id" transactionRow.
     *
     * @param id the id of the transactionRow to delete.
     * @return the [ResponseEntity] with status `204 (NO_CONTENT)`.
     */
    @DeleteMapping("/transaction-rows/{id}")
    fun deleteTransactionRow(@PathVariable id: Long): ResponseEntity<Void> {
        log.debug("REST request to delete TransactionRow : $id")

        transactionRowService.delete(id)
            return ResponseEntity.noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build()
    }
}
