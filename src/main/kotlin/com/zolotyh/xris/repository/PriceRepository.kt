package com.zolotyh.xris.repository

import com.zolotyh.xris.domain.Price
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

/**
 * Spring Data  repository for the [Price] entity.
 */
@Suppress("unused")
@Repository
interface PriceRepository : JpaRepository<Price, Long>
