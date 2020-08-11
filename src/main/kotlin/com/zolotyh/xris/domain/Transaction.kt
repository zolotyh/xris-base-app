package com.zolotyh.xris.domain

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import java.io.Serializable
import java.time.Instant
import javax.persistence.*
import org.hibernate.annotations.Cache
import org.hibernate.annotations.CacheConcurrencyStrategy

/**
 * A Transaction.
 */
@Entity
@Table(name = "transaction")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
data class Transaction(
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    var id: Long? = null,
    @Column(name = "datetime")
    var datetime: Instant? = null,

    @OneToMany(mappedBy = "transaction")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    var userInfos: MutableSet<UserInfo> = mutableSetOf(),

    @ManyToOne @JsonIgnoreProperties(value = ["transactions"], allowSetters = true)
    var department: Department? = null,

    @ManyToOne @JsonIgnoreProperties(value = ["transactions"], allowSetters = true)
    var transactionRow: TransactionRow? = null

    // jhipster-needle-entity-add-field - JHipster will add fields here
) : Serializable {

    fun addUserInfo(userInfo: UserInfo): Transaction {
        this.userInfos.add(userInfo)
        userInfo.transaction = this
        return this
    }

    fun removeUserInfo(userInfo: UserInfo): Transaction {
        this.userInfos.remove(userInfo)
        userInfo.transaction = null
        return this
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is Transaction) return false

        return id != null && other.id != null && id == other.id
    }

    override fun hashCode() = 31

    override fun toString() = "Transaction{" +
        "id=$id" +
        ", datetime='$datetime'" +
        "}"

    companion object {
        private const val serialVersionUID = 1L
    }
}
