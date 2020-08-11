package com.zolotyh.xris.domain

import com.zolotyh.xris.web.rest.equalsVerifier
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test

class DiscountTest {

    @Test
    fun equalsVerifier() {
        equalsVerifier(Discount::class)
        val discount1 = Discount()
        discount1.id = 1L
        val discount2 = Discount()
        discount2.id = discount1.id
        assertThat(discount1).isEqualTo(discount2)
        discount2.id = 2L
        assertThat(discount1).isNotEqualTo(discount2)
        discount1.id = null
        assertThat(discount1).isNotEqualTo(discount2)
    }
}
