package com.zolotyh.xris.service.impl

import com.zolotyh.xris.domain.Client
import com.zolotyh.xris.repository.ClientRepository
import com.zolotyh.xris.service.ClientService
import java.util.Optional
import org.slf4j.LoggerFactory
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

/**
 * Service Implementation for managing [Client].
 */
@Service
@Transactional
class ClientServiceImpl(
    private val clientRepository: ClientRepository
) : ClientService {

    private val log = LoggerFactory.getLogger(javaClass)

    override fun save(client: Client): Client {
        log.debug("Request to save Client : $client")
        return clientRepository.save(client)
    }

    @Transactional(readOnly = true)
    override fun findAll(pageable: Pageable): Page<Client> {
        log.debug("Request to get all Clients")
        return clientRepository.findAll(pageable)
    }

    @Transactional(readOnly = true)
    override fun findOne(id: Long): Optional<Client> {
        log.debug("Request to get Client : $id")
        return clientRepository.findById(id)
    }

    override fun delete(id: Long) {
        log.debug("Request to delete Client : $id")

        clientRepository.deleteById(id)
    }
}
