package com.zolotyh.xris.domain

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import java.io.Serializable
import javax.persistence.*
import org.hibernate.annotations.Cache
import org.hibernate.annotations.CacheConcurrencyStrategy

/**
 * A UserInfo.
 */
@Entity
@Table(name = "user_info")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
data class UserInfo(
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    var id: Long? = null,
    @Column(name = "email")
    var email: String? = null,

    @Column(name = "login")
    var login: String? = null,

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "user_info_department",
        joinColumns = [JoinColumn(name = "user_info_id", referencedColumnName = "id")],
        inverseJoinColumns = [JoinColumn(name = "department_id", referencedColumnName = "id")])
    var departments: MutableSet<Department> = mutableSetOf(),

    @ManyToOne @JsonIgnoreProperties(value = ["userInfos"], allowSetters = true)
    var transaction: Transaction? = null

    // jhipster-needle-entity-add-field - JHipster will add fields here
) : Serializable {

    fun addDepartment(department: Department): UserInfo {
        this.departments.add(department)
        return this
    }

    fun removeDepartment(department: Department): UserInfo {
        this.departments.remove(department)
        return this
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is UserInfo) return false

        return id != null && other.id != null && id == other.id
    }

    override fun hashCode() = 31

    override fun toString() = "UserInfo{" +
        "id=$id" +
        ", email='$email'" +
        ", login='$login'" +
        "}"

    companion object {
        private const val serialVersionUID = 1L
    }
}
