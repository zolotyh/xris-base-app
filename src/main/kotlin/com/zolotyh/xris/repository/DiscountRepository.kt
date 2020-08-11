package com.zolotyh.xris.repository

import com.zolotyh.xris.domain.Discount
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

/**
 * Spring Data  repository for the [Discount] entity.
 */
@Suppress("unused")
@Repository
interface DiscountRepository : JpaRepository<Discount, Long>
