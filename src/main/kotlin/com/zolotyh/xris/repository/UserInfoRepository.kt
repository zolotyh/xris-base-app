package com.zolotyh.xris.repository

import com.zolotyh.xris.domain.UserInfo
import java.util.Optional
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

/**
 * Spring Data  repository for the [UserInfo] entity.
 */
@Repository
interface UserInfoRepository : JpaRepository<UserInfo, Long> {

    @Query(value = "select distinct userInfo from UserInfo userInfo left join fetch userInfo.departments",
        countQuery = "select count(distinct userInfo) from UserInfo userInfo")
    fun findAllWithEagerRelationships(pageable: Pageable): Page<UserInfo>

    @Query("select distinct userInfo from UserInfo userInfo left join fetch userInfo.departments")
    fun findAllWithEagerRelationships(): MutableList<UserInfo>

    @Query("select userInfo from UserInfo userInfo left join fetch userInfo.departments where userInfo.id =:id")
    fun findOneWithEagerRelationships(@Param("id") id: Long): Optional<UserInfo>
}
