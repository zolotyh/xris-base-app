package com.zolotyh.xris.repository

import com.zolotyh.xris.domain.Customer
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

/**
 * Spring Data  repository for the [Customer] entity.
 */
@Suppress("unused")
@Repository
interface CustomerRepository : JpaRepository<Customer, Long>
