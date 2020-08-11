package com.zolotyh.xris.service
import com.zolotyh.xris.domain.Customer
import java.util.Optional
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable

/**
 * Service Interface for managing [Customer].
 */
interface CustomerService {

    /**
     * Save a customer.
     *
     * @param customer the entity to save.
     * @return the persisted entity.
     */
    fun save(customer: Customer): Customer

    /**
     * Get all the customers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    fun findAll(pageable: Pageable): Page<Customer>

    /**
     * Get the "id" customer.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    fun findOne(id: Long): Optional<Customer>

    /**
     * Delete the "id" customer.
     *
     * @param id the id of the entity.
     */
    fun delete(id: Long)
}
