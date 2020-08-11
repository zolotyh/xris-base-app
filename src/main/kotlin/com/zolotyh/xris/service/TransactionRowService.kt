package com.zolotyh.xris.service
import com.zolotyh.xris.domain.TransactionRow
import java.util.Optional

/**
 * Service Interface for managing [TransactionRow].
 */
interface TransactionRowService {

    /**
     * Save a transactionRow.
     *
     * @param transactionRow the entity to save.
     * @return the persisted entity.
     */
    fun save(transactionRow: TransactionRow): TransactionRow

    /**
     * Get all the transactionRows.
     *
     * @return the list of entities.
     */
    fun findAll(): MutableList<TransactionRow>

    /**
     * Get the "id" transactionRow.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    fun findOne(id: Long): Optional<TransactionRow>

    /**
     * Delete the "id" transactionRow.
     *
     * @param id the id of the entity.
     */
    fun delete(id: Long)
}
