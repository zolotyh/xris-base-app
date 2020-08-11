package com.zolotyh.xris.repository

import com.zolotyh.xris.domain.Department
import java.util.Optional
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

/**
 * Spring Data  repository for the [Department] entity.
 */
@Repository
interface DepartmentRepository : JpaRepository<Department, Long> {

    @Query(value = "select distinct department from Department department left join fetch department.prices",
        countQuery = "select count(distinct department) from Department department")
    fun findAllWithEagerRelationships(pageable: Pageable): Page<Department>

    @Query("select distinct department from Department department left join fetch department.prices")
    fun findAllWithEagerRelationships(): MutableList<Department>

    @Query("select department from Department department left join fetch department.prices where department.id =:id")
    fun findOneWithEagerRelationships(@Param("id") id: Long): Optional<Department>
}
