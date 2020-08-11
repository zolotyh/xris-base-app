package com.zolotyh.xris.service.impl

import com.zolotyh.xris.domain.Goods
import com.zolotyh.xris.repository.GoodsRepository
import com.zolotyh.xris.service.GoodsService
import java.util.Optional
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

/**
 * Service Implementation for managing [Goods].
 */
@Service
@Transactional
class GoodsServiceImpl(
    private val goodsRepository: GoodsRepository
) : GoodsService {

    private val log = LoggerFactory.getLogger(javaClass)

    override fun save(goods: Goods): Goods {
        log.debug("Request to save Goods : $goods")
        return goodsRepository.save(goods)
    }

    @Transactional(readOnly = true)
    override fun findAll(): MutableList<Goods> {
        log.debug("Request to get all Goods")
        return goodsRepository.findAll()
    }

    /**
     *  Get all the goods where TransactionRow is `null`.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    override fun findAllWhereTransactionRowIsNull(): MutableList<Goods> {
        log.debug("Request to get all goods where TransactionRow is null")
        return goodsRepository.findAll()
            .filterTo(mutableListOf()) { it.transactionRow == null }
    }

    @Transactional(readOnly = true)
    override fun findOne(id: Long): Optional<Goods> {
        log.debug("Request to get Goods : $id")
        return goodsRepository.findById(id)
    }

    override fun delete(id: Long) {
        log.debug("Request to delete Goods : $id")

        goodsRepository.deleteById(id)
    }
}
