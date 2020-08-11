package com.zolotyh.xris.domain

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import java.io.Serializable
import javax.persistence.*
import org.hibernate.annotations.Cache
import org.hibernate.annotations.CacheConcurrencyStrategy

/**
 * A Goods.
 */
@Entity
@Table(name = "goods")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
data class Goods(
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    var id: Long? = null,
    @Column(name = "name")
    var name: String? = null,

    @Column(name = "description")
    var description: String? = null,

    @OneToMany(mappedBy = "goods")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    var customers: MutableSet<Customer> = mutableSetOf(),

    @ManyToOne @JsonIgnoreProperties(value = ["goods"], allowSetters = true)
    var goods: Price? = null,

    @OneToOne(mappedBy = "goods")
    @JsonIgnore
    var transactionRow: TransactionRow? = null

    // jhipster-needle-entity-add-field - JHipster will add fields here
) : Serializable {

    fun addCustomer(customer: Customer): Goods {
        this.customers.add(customer)
        customer.goods = this
        return this
    }

    fun removeCustomer(customer: Customer): Goods {
        this.customers.remove(customer)
        customer.goods = null
        return this
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is Goods) return false

        return id != null && other.id != null && id == other.id
    }

    override fun hashCode() = 31

    override fun toString() = "Goods{" +
        "id=$id" +
        ", name='$name'" +
        ", description='$description'" +
        "}"

    companion object {
        private const val serialVersionUID = 1L
    }
}
