package com.zolotyh.xris.service
import com.zolotyh.xris.domain.Discount
import java.util.Optional

/**
 * Service Interface for managing [Discount].
 */
interface DiscountService {

    /**
     * Save a discount.
     *
     * @param discount the entity to save.
     * @return the persisted entity.
     */
    fun save(discount: Discount): Discount

    /**
     * Get all the discounts.
     *
     * @return the list of entities.
     */
    fun findAll(): MutableList<Discount>
    /**
     * Get all the [DiscountDTO] where TransactionRow is `null`.
     *
     * @return the {@link MutableList} of entities.
     */
    fun findAllWhereTransactionRowIsNull(): MutableList<Discount>

    /**
     * Get the "id" discount.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    fun findOne(id: Long): Optional<Discount>

    /**
     * Delete the "id" discount.
     *
     * @param id the id of the entity.
     */
    fun delete(id: Long)
}
