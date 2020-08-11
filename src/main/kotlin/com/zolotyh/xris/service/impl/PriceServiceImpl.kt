package com.zolotyh.xris.service.impl

import com.zolotyh.xris.domain.Price
import com.zolotyh.xris.repository.PriceRepository
import com.zolotyh.xris.service.PriceService
import java.util.Optional
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

/**
 * Service Implementation for managing [Price].
 */
@Service
@Transactional
class PriceServiceImpl(
    private val priceRepository: PriceRepository
) : PriceService {

    private val log = LoggerFactory.getLogger(javaClass)

    override fun save(price: Price): Price {
        log.debug("Request to save Price : $price")
        return priceRepository.save(price)
    }

    @Transactional(readOnly = true)
    override fun findAll(): MutableList<Price> {
        log.debug("Request to get all Prices")
        return priceRepository.findAll()
    }

    /**
     *  Get all the prices where TransactionRow is `null`.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    override fun findAllWhereTransactionRowIsNull(): MutableList<Price> {
        log.debug("Request to get all prices where TransactionRow is null")
        return priceRepository.findAll()
            .filterTo(mutableListOf()) { it.transactionRow == null }
    }

    @Transactional(readOnly = true)
    override fun findOne(id: Long): Optional<Price> {
        log.debug("Request to get Price : $id")
        return priceRepository.findById(id)
    }

    override fun delete(id: Long) {
        log.debug("Request to delete Price : $id")

        priceRepository.deleteById(id)
    }
}
