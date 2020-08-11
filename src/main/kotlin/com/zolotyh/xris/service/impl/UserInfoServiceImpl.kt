package com.zolotyh.xris.service.impl

import com.zolotyh.xris.domain.UserInfo
import com.zolotyh.xris.repository.UserInfoRepository
import com.zolotyh.xris.service.UserInfoService
import java.util.Optional
import org.slf4j.LoggerFactory
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

/**
 * Service Implementation for managing [UserInfo].
 */
@Service
@Transactional
class UserInfoServiceImpl(
    private val userInfoRepository: UserInfoRepository
) : UserInfoService {

    private val log = LoggerFactory.getLogger(javaClass)

    override fun save(userInfo: UserInfo): UserInfo {
        log.debug("Request to save UserInfo : $userInfo")
        return userInfoRepository.save(userInfo)
    }

    @Transactional(readOnly = true)
    override fun findAll(): MutableList<UserInfo> {
        log.debug("Request to get all UserInfos")
        return userInfoRepository.findAllWithEagerRelationships()
    }

    override fun findAllWithEagerRelationships(pageable: Pageable) =
        userInfoRepository.findAllWithEagerRelationships(pageable)

    @Transactional(readOnly = true)
    override fun findOne(id: Long): Optional<UserInfo> {
        log.debug("Request to get UserInfo : $id")
        return userInfoRepository.findOneWithEagerRelationships(id)
    }

    override fun delete(id: Long) {
        log.debug("Request to delete UserInfo : $id")

        userInfoRepository.deleteById(id)
    }
}
