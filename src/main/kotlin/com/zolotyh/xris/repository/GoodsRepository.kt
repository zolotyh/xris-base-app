package com.zolotyh.xris.repository

import com.zolotyh.xris.domain.Goods
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

/**
 * Spring Data  repository for the [Goods] entity.
 */
@Suppress("unused")
@Repository
interface GoodsRepository : JpaRepository<Goods, Long>
