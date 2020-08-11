package com.zolotyh.xris.web.rest

import com.zolotyh.xris.domain.UserInfo
import com.zolotyh.xris.service.UserInfoService
import com.zolotyh.xris.web.rest.errors.BadRequestAlertException
import io.github.jhipster.web.util.HeaderUtil
import io.github.jhipster.web.util.ResponseUtil
import java.net.URI
import java.net.URISyntaxException
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

private const val ENTITY_NAME = "userInfo"
/**
 * REST controller for managing [com.zolotyh.xris.domain.UserInfo].
 */
@RestController
@RequestMapping("/api")
class UserInfoResource(
    private val userInfoService: UserInfoService
) {

    private val log = LoggerFactory.getLogger(javaClass)
    @Value("\${jhipster.clientApp.name}")
    private var applicationName: String? = null

    /**
     * `POST  /user-infos` : Create a new userInfo.
     *
     * @param userInfo the userInfo to create.
     * @return the [ResponseEntity] with status `201 (Created)` and with body the new userInfo, or with status `400 (Bad Request)` if the userInfo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-infos")
    fun createUserInfo(@RequestBody userInfo: UserInfo): ResponseEntity<UserInfo> {
        log.debug("REST request to save UserInfo : $userInfo")
        if (userInfo.id != null) {
            throw BadRequestAlertException(
                "A new userInfo cannot already have an ID",
                ENTITY_NAME, "idexists"
            )
        }
        val result = userInfoService.save(userInfo)
        return ResponseEntity.created(URI("/api/user-infos/${result.id}"))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.id.toString()))
            .body(result)
    }

    /**
     * `PUT  /user-infos` : Updates an existing userInfo.
     *
     * @param userInfo the userInfo to update.
     * @return the [ResponseEntity] with status `200 (OK)` and with body the updated userInfo,
     * or with status `400 (Bad Request)` if the userInfo is not valid,
     * or with status `500 (Internal Server Error)` if the userInfo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-infos")
    fun updateUserInfo(@RequestBody userInfo: UserInfo): ResponseEntity<UserInfo> {
        log.debug("REST request to update UserInfo : $userInfo")
        if (userInfo.id == null) {
            throw BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull")
        }
        val result = userInfoService.save(userInfo)
        return ResponseEntity.ok()
            .headers(
                HeaderUtil.createEntityUpdateAlert(
                    applicationName, true, ENTITY_NAME,
                     userInfo.id.toString()
                )
            )
            .body(result)
    }
    /**
     * `GET  /user-infos` : get all the userInfos.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the [ResponseEntity] with status `200 (OK)` and the list of userInfos in body.
     */
    @GetMapping("/user-infos")
    fun getAllUserInfos(@RequestParam(required = false, defaultValue = "false") eagerload: Boolean): MutableList<UserInfo> {
        log.debug("REST request to get all UserInfos")

        return userInfoService.findAll()
            }

    /**
     * `GET  /user-infos/:id` : get the "id" userInfo.
     *
     * @param id the id of the userInfo to retrieve.
     * @return the [ResponseEntity] with status `200 (OK)` and with body the userInfo, or with status `404 (Not Found)`.
     */
    @GetMapping("/user-infos/{id}")
    fun getUserInfo(@PathVariable id: Long): ResponseEntity<UserInfo> {
        log.debug("REST request to get UserInfo : $id")
        val userInfo = userInfoService.findOne(id)
        return ResponseUtil.wrapOrNotFound(userInfo)
    }
    /**
     *  `DELETE  /user-infos/:id` : delete the "id" userInfo.
     *
     * @param id the id of the userInfo to delete.
     * @return the [ResponseEntity] with status `204 (NO_CONTENT)`.
     */
    @DeleteMapping("/user-infos/{id}")
    fun deleteUserInfo(@PathVariable id: Long): ResponseEntity<Void> {
        log.debug("REST request to delete UserInfo : $id")

        userInfoService.delete(id)
            return ResponseEntity.noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build()
    }
}
