package com.zolotyh.xris.domain

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import java.io.Serializable
import javax.persistence.*
import org.hibernate.annotations.Cache
import org.hibernate.annotations.CacheConcurrencyStrategy

/**
 * A Price.
 */
@Entity
@Table(name = "price")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
data class Price(
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    var id: Long? = null,
    @Column(name = "value")
    var value: Int? = null,

    @ManyToOne @JsonIgnoreProperties(value = ["prices"], allowSetters = true)
    var price: Discount? = null,

    @OneToOne(mappedBy = "price")
    @JsonIgnore
    var transactionRow: TransactionRow? = null,

    @ManyToMany(mappedBy = "prices")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    var departments: MutableSet<Department> = mutableSetOf()

    // jhipster-needle-entity-add-field - JHipster will add fields here
) : Serializable {

    fun addDepartment(department: Department): Price {
        this.departments.add(department)
        department.prices.add(this)
        return this
    }

    fun removeDepartment(department: Department): Price {
        this.departments.remove(department)
        department.prices.remove(this)
        return this
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is Price) return false

        return id != null && other.id != null && id == other.id
    }

    override fun hashCode() = 31

    override fun toString() = "Price{" +
        "id=$id" +
        ", value=$value" +
        "}"

    companion object {
        private const val serialVersionUID = 1L
    }
}
