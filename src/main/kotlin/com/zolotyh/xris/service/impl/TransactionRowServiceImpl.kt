package com.zolotyh.xris.service.impl

import com.zolotyh.xris.domain.TransactionRow
import com.zolotyh.xris.repository.TransactionRowRepository
import com.zolotyh.xris.service.TransactionRowService
import java.util.Optional
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

/**
 * Service Implementation for managing [TransactionRow].
 */
@Service
@Transactional
class TransactionRowServiceImpl(
    private val transactionRowRepository: TransactionRowRepository
) : TransactionRowService {

    private val log = LoggerFactory.getLogger(javaClass)

    override fun save(transactionRow: TransactionRow): TransactionRow {
        log.debug("Request to save TransactionRow : $transactionRow")
        return transactionRowRepository.save(transactionRow)
    }

    @Transactional(readOnly = true)
    override fun findAll(): MutableList<TransactionRow> {
        log.debug("Request to get all TransactionRows")
        return transactionRowRepository.findAll()
    }

    @Transactional(readOnly = true)
    override fun findOne(id: Long): Optional<TransactionRow> {
        log.debug("Request to get TransactionRow : $id")
        return transactionRowRepository.findById(id)
    }

    override fun delete(id: Long) {
        log.debug("Request to delete TransactionRow : $id")

        transactionRowRepository.deleteById(id)
    }
}
