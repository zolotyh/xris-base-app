package com.zolotyh.xris.domain

import com.fasterxml.jackson.annotation.JsonIgnore
import java.io.Serializable
import javax.persistence.*
import org.hibernate.annotations.Cache
import org.hibernate.annotations.CacheConcurrencyStrategy

/**
 * A Department.
 */
@Entity
@Table(name = "department")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
data class Department(
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    var id: Long? = null,
    @Column(name = "name")
    var name: String? = null,

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "department_price",
        joinColumns = [JoinColumn(name = "department_id", referencedColumnName = "id")],
        inverseJoinColumns = [JoinColumn(name = "price_id", referencedColumnName = "id")])
    var prices: MutableSet<Price> = mutableSetOf(),

    @ManyToMany(mappedBy = "departments")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    var userInfos: MutableSet<UserInfo> = mutableSetOf()

    // jhipster-needle-entity-add-field - JHipster will add fields here
) : Serializable {

    fun addPrice(price: Price): Department {
        this.prices.add(price)
        return this
    }

    fun removePrice(price: Price): Department {
        this.prices.remove(price)
        return this
    }

    fun addUserInfo(userInfo: UserInfo): Department {
        this.userInfos.add(userInfo)
        userInfo.departments.add(this)
        return this
    }

    fun removeUserInfo(userInfo: UserInfo): Department {
        this.userInfos.remove(userInfo)
        userInfo.departments.remove(this)
        return this
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is Department) return false

        return id != null && other.id != null && id == other.id
    }

    override fun hashCode() = 31

    override fun toString() = "Department{" +
        "id=$id" +
        ", name='$name'" +
        "}"

    companion object {
        private const val serialVersionUID = 1L
    }
}
