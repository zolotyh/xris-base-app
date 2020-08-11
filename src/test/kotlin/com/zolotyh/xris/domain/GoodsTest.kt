package com.zolotyh.xris.domain

import com.zolotyh.xris.web.rest.equalsVerifier
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test

class GoodsTest {

    @Test
    fun equalsVerifier() {
        equalsVerifier(Goods::class)
        val goods1 = Goods()
        goods1.id = 1L
        val goods2 = Goods()
        goods2.id = goods1.id
        assertThat(goods1).isEqualTo(goods2)
        goods2.id = 2L
        assertThat(goods1).isNotEqualTo(goods2)
        goods1.id = null
        assertThat(goods1).isNotEqualTo(goods2)
    }
}
