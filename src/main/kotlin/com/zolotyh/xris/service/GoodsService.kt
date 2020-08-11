package com.zolotyh.xris.service
import com.zolotyh.xris.domain.Goods
import java.util.Optional

/**
 * Service Interface for managing [Goods].
 */
interface GoodsService {

    /**
     * Save a goods.
     *
     * @param goods the entity to save.
     * @return the persisted entity.
     */
    fun save(goods: Goods): Goods

    /**
     * Get all the goods.
     *
     * @return the list of entities.
     */
    fun findAll(): MutableList<Goods>
    /**
     * Get all the [GoodsDTO] where TransactionRow is `null`.
     *
     * @return the {@link MutableList} of entities.
     */
    fun findAllWhereTransactionRowIsNull(): MutableList<Goods>

    /**
     * Get the "id" goods.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    fun findOne(id: Long): Optional<Goods>

    /**
     * Delete the "id" goods.
     *
     * @param id the id of the entity.
     */
    fun delete(id: Long)
}
