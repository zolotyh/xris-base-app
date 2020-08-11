package com.zolotyh.xris.service
import com.zolotyh.xris.domain.Transaction
import java.util.Optional
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable

/**
 * Service Interface for managing [Transaction].
 */
interface TransactionService {

    /**
     * Save a transaction.
     *
     * @param transaction the entity to save.
     * @return the persisted entity.
     */
    fun save(transaction: Transaction): Transaction

    /**
     * Get all the transactions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    fun findAll(pageable: Pageable): Page<Transaction>

    /**
     * Get the "id" transaction.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    fun findOne(id: Long): Optional<Transaction>

    /**
     * Delete the "id" transaction.
     *
     * @param id the id of the entity.
     */
    fun delete(id: Long)
}
