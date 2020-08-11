package com.zolotyh.xris.repository

import com.zolotyh.xris.domain.Transaction
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

/**
 * Spring Data  repository for the [Transaction] entity.
 */
@Suppress("unused")
@Repository
interface TransactionRepository : JpaRepository<Transaction, Long>
