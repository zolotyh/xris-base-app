package com.zolotyh.xris.service.impl

import com.zolotyh.xris.domain.Transaction
import com.zolotyh.xris.repository.TransactionRepository
import com.zolotyh.xris.service.TransactionService
import java.util.Optional
import org.slf4j.LoggerFactory
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

/**
 * Service Implementation for managing [Transaction].
 */
@Service
@Transactional
class TransactionServiceImpl(
    private val transactionRepository: TransactionRepository
) : TransactionService {

    private val log = LoggerFactory.getLogger(javaClass)

    override fun save(transaction: Transaction): Transaction {
        log.debug("Request to save Transaction : $transaction")
        return transactionRepository.save(transaction)
    }

    @Transactional(readOnly = true)
    override fun findAll(pageable: Pageable): Page<Transaction> {
        log.debug("Request to get all Transactions")
        return transactionRepository.findAll(pageable)
    }

    @Transactional(readOnly = true)
    override fun findOne(id: Long): Optional<Transaction> {
        log.debug("Request to get Transaction : $id")
        return transactionRepository.findById(id)
    }

    override fun delete(id: Long) {
        log.debug("Request to delete Transaction : $id")

        transactionRepository.deleteById(id)
    }
}
