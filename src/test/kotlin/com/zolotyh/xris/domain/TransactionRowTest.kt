package com.zolotyh.xris.domain

import com.zolotyh.xris.web.rest.equalsVerifier
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test

class TransactionRowTest {

    @Test
    fun equalsVerifier() {
        equalsVerifier(TransactionRow::class)
        val transactionRow1 = TransactionRow()
        transactionRow1.id = 1L
        val transactionRow2 = TransactionRow()
        transactionRow2.id = transactionRow1.id
        assertThat(transactionRow1).isEqualTo(transactionRow2)
        transactionRow2.id = 2L
        assertThat(transactionRow1).isNotEqualTo(transactionRow2)
        transactionRow1.id = null
        assertThat(transactionRow1).isNotEqualTo(transactionRow2)
    }
}
