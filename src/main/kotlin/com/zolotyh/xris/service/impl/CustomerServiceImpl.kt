package com.zolotyh.xris.service.impl

import com.zolotyh.xris.domain.Customer
import com.zolotyh.xris.repository.CustomerRepository
import com.zolotyh.xris.service.CustomerService
import java.util.Optional
import org.slf4j.LoggerFactory
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

/**
 * Service Implementation for managing [Customer].
 */
@Service
@Transactional
class CustomerServiceImpl(
    private val customerRepository: CustomerRepository
) : CustomerService {

    private val log = LoggerFactory.getLogger(javaClass)

    override fun save(customer: Customer): Customer {
        log.debug("Request to save Customer : $customer")
        return customerRepository.save(customer)
    }

    @Transactional(readOnly = true)
    override fun findAll(pageable: Pageable): Page<Customer> {
        log.debug("Request to get all Customers")
        return customerRepository.findAll(pageable)
    }

    @Transactional(readOnly = true)
    override fun findOne(id: Long): Optional<Customer> {
        log.debug("Request to get Customer : $id")
        return customerRepository.findById(id)
    }

    override fun delete(id: Long) {
        log.debug("Request to delete Customer : $id")

        customerRepository.deleteById(id)
    }
}
