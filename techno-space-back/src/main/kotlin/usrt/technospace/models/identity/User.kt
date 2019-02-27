package usrt.technospace.models.identity

import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.annotation.CreatedDate
import usrt.technospace.models.product.Product
import usrt.technospace.models.roles.Role
import java.util.*
import javax.persistence.*
import javax.validation.constraints.NotBlank
import javax.validation.constraints.Size


@Entity
@Table(name = "users")
class User {
    @Id
    @GeneratedValue
    var id: Long? = null


    @NotBlank
    @Column(name = "email", nullable = false)
    var email: String? = null

    @NotBlank
    @Column(name = "password", nullable = false)
    var password: String? = null



    @Column(name = "active", nullable = false)
    var active: Boolean = false

    @NotBlank
    @Column(name = "name", nullable = false)
    @Size(min = 2, max = 30)
    var name: String? = null

    @NotBlank
    @Column(name = "last_name", nullable = false)
    @Size(min = 2, max = 30)
    var lastName: String? = null

    @Column(name = "second_name")
    @Size(min = 2, max = 30)
    var secondName: String? = null

    @NotBlank
    @Column(name = "phone_number", nullable = false)
    @Size(min = 10, max = 10)
    var phoneNumber: String? = null

    @Column(name = "created_date", updatable = false)
    @CreatedDate
    private var createdAt: Date? = null

    @Column(name = "updated_date")
    @LastModifiedDate
    private var updatedAt: Date? = null

    @ElementCollection(targetClass = Role::class, fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles", joinColumns = [JoinColumn(name = "user_id")])
    @Enumerated(EnumType.STRING)
    var roles: Set<Role>? = null


    // CART
//    @ManyToMany(cascade = [
//        CascadeType.PERSIST,
//        CascadeType.MERGE
//    ])
//    @JoinTable(name = "cart",
//            joinColumns = [JoinColumn(name = "user_id")],
//            inverseJoinColumns = [JoinColumn(name = "product_id")]
//    )
//    var cart: List<Product>? = null

    // TODO: Favorites
}