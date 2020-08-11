package com.zolotyh.xris.web.rest

import com.zolotyh.xris.domain.Client
import com.zolotyh.xris.service.ClientService
import com.zolotyh.xris.web.rest.errors.BadRequestAlertException
import io.github.jhipster.web.util.HeaderUtil
import io.github.jhipster.web.util.PaginationUtil
import io.github.jhipster.web.util.ResponseUtil
import java.net.URI
import java.net.URISyntaxException
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.data.domain.Pageable
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.support.ServletUriComponentsBuilder

private const val ENTITY_NAME = "client"
/**
 * REST controller for managing [com.zolotyh.xris.domain.Client].
 */
@RestController
@RequestMapping("/api")
class ClientResource(
    private val clientService: ClientService
) {

    private val log = LoggerFactory.getLogger(javaClass)
    @Value("\${jhipster.clientApp.name}")
    private var applicationName: String? = null

    /**
     * `POST  /clients` : Create a new client.
     *
     * @param client the client to create.
     * @return the [ResponseEntity] with status `201 (Created)` and with body the new client, or with status `400 (Bad Request)` if the client has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/clients")
    fun createClient(@RequestBody client: Client): ResponseEntity<Client> {
        log.debug("REST request to save Client : $client")
        if (client.id != null) {
            throw BadRequestAlertException(
                "A new client cannot already have an ID",
                ENTITY_NAME, "idexists"
            )
        }
        val result = clientService.save(client)
        return ResponseEntity.created(URI("/api/clients/${result.id}"))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.id.toString()))
            .body(result)
    }

    /**
     * `PUT  /clients` : Updates an existing client.
     *
     * @param client the client to update.
     * @return the [ResponseEntity] with status `200 (OK)` and with body the updated client,
     * or with status `400 (Bad Request)` if the client is not valid,
     * or with status `500 (Internal Server Error)` if the client couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/clients")
    fun updateClient(@RequestBody client: Client): ResponseEntity<Client> {
        log.debug("REST request to update Client : $client")
        if (client.id == null) {
            throw BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull")
        }
        val result = clientService.save(client)
        return ResponseEntity.ok()
            .headers(
                HeaderUtil.createEntityUpdateAlert(
                    applicationName, true, ENTITY_NAME,
                     client.id.toString()
                )
            )
            .body(result)
    }
    /**
     * `GET  /clients` : get all the clients.
     *
     * @param pageable the pagination information.

     * @return the [ResponseEntity] with status `200 (OK)` and the list of clients in body.
     */
    @GetMapping("/clients")
    fun getAllClients(pageable: Pageable): ResponseEntity<List<Client>> {
        log.debug("REST request to get a page of Clients")
        val page = clientService.findAll(pageable)
        val headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page)
        return ResponseEntity.ok().headers(headers).body(page.content)
    }

    /**
     * `GET  /clients/:id` : get the "id" client.
     *
     * @param id the id of the client to retrieve.
     * @return the [ResponseEntity] with status `200 (OK)` and with body the client, or with status `404 (Not Found)`.
     */
    @GetMapping("/clients/{id}")
    fun getClient(@PathVariable id: Long): ResponseEntity<Client> {
        log.debug("REST request to get Client : $id")
        val client = clientService.findOne(id)
        return ResponseUtil.wrapOrNotFound(client)
    }
    /**
     *  `DELETE  /clients/:id` : delete the "id" client.
     *
     * @param id the id of the client to delete.
     * @return the [ResponseEntity] with status `204 (NO_CONTENT)`.
     */
    @DeleteMapping("/clients/{id}")
    fun deleteClient(@PathVariable id: Long): ResponseEntity<Void> {
        log.debug("REST request to delete Client : $id")

        clientService.delete(id)
            return ResponseEntity.noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build()
    }
}
