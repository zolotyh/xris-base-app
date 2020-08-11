package com.zolotyh.xris.domain

import com.zolotyh.xris.web.rest.equalsVerifier
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test

class UserInfoTest {

    @Test
    fun equalsVerifier() {
        equalsVerifier(UserInfo::class)
        val userInfo1 = UserInfo()
        userInfo1.id = 1L
        val userInfo2 = UserInfo()
        userInfo2.id = userInfo1.id
        assertThat(userInfo1).isEqualTo(userInfo2)
        userInfo2.id = 2L
        assertThat(userInfo1).isNotEqualTo(userInfo2)
        userInfo1.id = null
        assertThat(userInfo1).isNotEqualTo(userInfo2)
    }
}
