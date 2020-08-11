package com.zolotyh.xris.service.impl

import com.zolotyh.xris.domain.Department
import com.zolotyh.xris.repository.DepartmentRepository
import com.zolotyh.xris.service.DepartmentService
import java.util.Optional
import org.slf4j.LoggerFactory
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

/**
 * Service Implementation for managing [Department].
 */
@Service
@Transactional
class DepartmentServiceImpl(
    private val departmentRepository: DepartmentRepository
) : DepartmentService {

    private val log = LoggerFactory.getLogger(javaClass)

    override fun save(department: Department): Department {
        log.debug("Request to save Department : $department")
        return departmentRepository.save(department)
    }

    @Transactional(readOnly = true)
    override fun findAll(): MutableList<Department> {
        log.debug("Request to get all Departments")
        return departmentRepository.findAllWithEagerRelationships()
    }

    override fun findAllWithEagerRelationships(pageable: Pageable) =
        departmentRepository.findAllWithEagerRelationships(pageable)

    @Transactional(readOnly = true)
    override fun findOne(id: Long): Optional<Department> {
        log.debug("Request to get Department : $id")
        return departmentRepository.findOneWithEagerRelationships(id)
    }

    override fun delete(id: Long) {
        log.debug("Request to delete Department : $id")

        departmentRepository.deleteById(id)
    }
}
