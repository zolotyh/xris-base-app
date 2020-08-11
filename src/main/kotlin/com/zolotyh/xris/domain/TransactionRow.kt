package com.zolotyh.xris.domain

import java.io.Serializable
import javax.persistence.*
import org.hibernate.annotations.Cache
import org.hibernate.annotations.CacheConcurrencyStrategy

/**
 * A TransactionRow.
 */
@Entity
@Table(name = "transaction_row")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
data class TransactionRow(
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    var id: Long? = null,
    @OneToOne @JoinColumn(unique = true)
    var goods: Goods? = null,

    @OneToOne @JoinColumn(unique = true)
    var price: Price? = null,

    @OneToOne @JoinColumn(unique = true)
    var discount: Discount? = null

    // jhipster-needle-entity-add-field - JHipster will add fields here
) : Serializable {
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is TransactionRow) return false

        return id != null && other.id != null && id == other.id
    }

    override fun hashCode() = 31

    override fun toString() = "TransactionRow{" +
        "id=$id" +
        "}"

    companion object {
        private const val serialVersionUID = 1L
    }
}
