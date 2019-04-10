package usrt.technospace.models.core

import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.util.*
import javax.persistence.Column
import javax.persistence.EntityListeners
import javax.persistence.MappedSuperclass


@MappedSuperclass
@EntityListeners(AuditingEntityListener::class)
open class Auditable {
//    @CreatedBy
//    private val createdBy: User? = null

    @CreatedDate
    @Column(name = "created_date")
    var createdDate: Date? = null

//    @LastModifiedBy
//    private val lastModifiedBy: User? = null

    @LastModifiedDate
    @Column(name = "last_modified_date")
    var lastModifiedDate: Date? = null
}