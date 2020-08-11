package com.zolotyh.xris.domain

import com.zolotyh.xris.web.rest.equalsVerifier
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test

class PriceTest {

    @Test
    fun equalsVerifier() {
        equalsVerifier(Price::class)
        val price1 = Price()
        price1.id = 1L
        val price2 = Price()
        price2.id = price1.id
        assertThat(price1).isEqualTo(price2)
        price2.id = 2L
        assertThat(price1).isNotEqualTo(price2)
        price1.id = null
        assertThat(price1).isNotEqualTo(price2)
    }
}
