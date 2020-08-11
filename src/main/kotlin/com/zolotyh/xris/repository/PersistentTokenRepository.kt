package com.zolotyh.xris.repository

import com.zolotyh.xris.domain.PersistentToken
import com.zolotyh.xris.domain.User
import java.time.LocalDate
import org.springframework.data.jpa.repository.JpaRepository

/**
 * Spring Data JPA repository for the [PersistentToken] entity.
 */
interface PersistentTokenRepository : JpaRepository<PersistentToken, String> {

    fun findByUser(user: User): List<PersistentToken>

    fun findByTokenDateBefore(localDate: LocalDate): List<PersistentToken>
}
