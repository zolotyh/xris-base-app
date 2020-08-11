package com.zolotyh.xris.repository

import com.zolotyh.xris.domain.TransactionRow
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

/**
 * Spring Data  repository for the [TransactionRow] entity.
 */
@Suppress("unused")
@Repository
interface TransactionRowRepository : JpaRepository<TransactionRow, Long>
