package usrt.technospace.models.identity

import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.annotation.CreatedDate
import java.util.*
import javax.persistence.*
import javax.validation.constraints.NotBlank
import javax.validation.constraints.Size


@Entity
@Table(name = "users")
class User {
    @Id
    @GeneratedValue(generator = "user_generator")
    @SequenceGenerator(
            name = "user_generator",
            sequenceName = "USER_GENERATOR",
            initialValue = 1
    )
    var id: Long? = null

    @NotBlank
    @Column(name = "email", nullable = false)
    var email: String? = null

    @NotBlank
    @Column(name = "password", nullable = false)
    @Size(min = 8, max = 30)
    var password: String? = null

    @NotBlank
    @Column(name = "name", nullable = false)
    @Size(min = 2, max = 30)
    var name: String? = null

    @NotBlank
    @Column(name = "last_name", nullable = false)
    @Size(min = 2, max = 30)
    var lastName: String? = null

    @Column(name = "middle_name")
    @Size(min = 2, max = 30)
    var middleName: String? = null

    @NotBlank
    @Column(name = "phone_number", nullable = false)
    @Size(min = 10, max = 10)
    var phoneNumber: String? = null

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", nullable = false, updatable = false)
    @CreatedDate
    private val createdAt: Date? = null

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at", nullable = false)
    @LastModifiedDate
    private val updatedAt: Date? = null
}