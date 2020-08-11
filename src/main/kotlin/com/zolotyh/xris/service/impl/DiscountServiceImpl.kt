package com.zolotyh.xris.service.impl

import com.zolotyh.xris.domain.Discount
import com.zolotyh.xris.repository.DiscountRepository
import com.zolotyh.xris.service.DiscountService
import java.util.Optional
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

/**
 * Service Implementation for managing [Discount].
 */
@Service
@Transactional
class DiscountServiceImpl(
    private val discountRepository: DiscountRepository
) : DiscountService {

    private val log = LoggerFactory.getLogger(javaClass)

    override fun save(discount: Discount): Discount {
        log.debug("Request to save Discount : $discount")
        return discountRepository.save(discount)
    }

    @Transactional(readOnly = true)
    override fun findAll(): MutableList<Discount> {
        log.debug("Request to get all Discounts")
        return discountRepository.findAll()
    }

    /**
     *  Get all the discounts where TransactionRow is `null`.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    override fun findAllWhereTransactionRowIsNull(): MutableList<Discount> {
        log.debug("Request to get all discounts where TransactionRow is null")
        return discountRepository.findAll()
            .filterTo(mutableListOf()) { it.transactionRow == null }
    }

    @Transactional(readOnly = true)
    override fun findOne(id: Long): Optional<Discount> {
        log.debug("Request to get Discount : $id")
        return discountRepository.findById(id)
    }

    override fun delete(id: Long) {
        log.debug("Request to delete Discount : $id")

        discountRepository.deleteById(id)
    }
}
