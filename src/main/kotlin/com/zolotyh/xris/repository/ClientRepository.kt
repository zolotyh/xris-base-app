package com.zolotyh.xris.repository

import com.zolotyh.xris.domain.Client
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

/**
 * Spring Data  repository for the [Client] entity.
 */
@Suppress("unused")
@Repository
interface ClientRepository : JpaRepository<Client, Long>
