package com.zolotyh.xris.service
import com.zolotyh.xris.domain.Price
import java.util.Optional

/**
 * Service Interface for managing [Price].
 */
interface PriceService {

    /**
     * Save a price.
     *
     * @param price the entity to save.
     * @return the persisted entity.
     */
    fun save(price: Price): Price

    /**
     * Get all the prices.
     *
     * @return the list of entities.
     */
    fun findAll(): MutableList<Price>
    /**
     * Get all the [PriceDTO] where TransactionRow is `null`.
     *
     * @return the {@link MutableList} of entities.
     */
    fun findAllWhereTransactionRowIsNull(): MutableList<Price>

    /**
     * Get the "id" price.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    fun findOne(id: Long): Optional<Price>

    /**
     * Delete the "id" price.
     *
     * @param id the id of the entity.
     */
    fun delete(id: Long)
}
