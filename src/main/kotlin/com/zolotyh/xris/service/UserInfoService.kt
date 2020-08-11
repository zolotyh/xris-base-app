package com.zolotyh.xris.service
import com.zolotyh.xris.domain.UserInfo
import java.util.Optional
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable

/**
 * Service Interface for managing [UserInfo].
 */
interface UserInfoService {

    /**
     * Save a userInfo.
     *
     * @param userInfo the entity to save.
     * @return the persisted entity.
     */
    fun save(userInfo: UserInfo): UserInfo

    /**
     * Get all the userInfos.
     *
     * @return the list of entities.
     */
    fun findAll(): MutableList<UserInfo>

    /**
     * Get all the userInfos with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    fun findAllWithEagerRelationships(pageable: Pageable): Page<UserInfo>
    /**
     * Get the "id" userInfo.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    fun findOne(id: Long): Optional<UserInfo>

    /**
     * Delete the "id" userInfo.
     *
     * @param id the id of the entity.
     */
    fun delete(id: Long)
}
