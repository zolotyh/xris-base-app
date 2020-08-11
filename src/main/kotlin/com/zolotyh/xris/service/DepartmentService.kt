package com.zolotyh.xris.service
import com.zolotyh.xris.domain.Department
import java.util.Optional
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable

/**
 * Service Interface for managing [Department].
 */
interface DepartmentService {

    /**
     * Save a department.
     *
     * @param department the entity to save.
     * @return the persisted entity.
     */
    fun save(department: Department): Department

    /**
     * Get all the departments.
     *
     * @return the list of entities.
     */
    fun findAll(): MutableList<Department>

    /**
     * Get all the departments with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    fun findAllWithEagerRelationships(pageable: Pageable): Page<Department>
    /**
     * Get the "id" department.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    fun findOne(id: Long): Optional<Department>

    /**
     * Delete the "id" department.
     *
     * @param id the id of the entity.
     */
    fun delete(id: Long)
}
