package com.zolotyh.xris.domain

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import java.io.Serializable
import javax.persistence.*
import org.hibernate.annotations.Cache
import org.hibernate.annotations.CacheConcurrencyStrategy

/**
 * A Customer.
 */
@Entity
@Table(name = "customer")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
data class Customer(
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    var id: Long? = null,
    @Column(name = "name")
    var name: String? = null,

    @ManyToOne @JsonIgnoreProperties(value = ["customers"], allowSetters = true)
    var client: Client? = null,

    @ManyToOne @JsonIgnoreProperties(value = ["customers"], allowSetters = true)
    var userInfo: UserInfo? = null,

    @ManyToOne @JsonIgnoreProperties(value = ["customers"], allowSetters = true)
    var department: Department? = null,

    @ManyToOne @JsonIgnoreProperties(value = ["customers"], allowSetters = true)
    var goods: Goods? = null

    // jhipster-needle-entity-add-field - JHipster will add fields here
) : Serializable {
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is Customer) return false

        return id != null && other.id != null && id == other.id
    }

    override fun hashCode() = 31

    override fun toString() = "Customer{" +
        "id=$id" +
        ", name='$name'" +
        "}"

    companion object {
        private const val serialVersionUID = 1L
    }
}
