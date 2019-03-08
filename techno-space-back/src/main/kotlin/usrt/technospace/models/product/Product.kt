package usrt.technospace.models.product

import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import java.util.*
import javax.persistence.*
import javax.persistence.FetchType

@Entity
@Table(name = "products")
class Product {
    @Id
    @GeneratedValue
    var id: Long? = null

    @Column(name = "name", nullable = false)
    var name: String? = null

    @Column(name = "price", nullable = false)
    var price: Int? = null

    @Column(name = "image_url")
    var imageUrl: String? = null

    /**
     * Information about product. (Dynamic multiline)
     */
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
    var values: List<ProductInfoValue>? = null

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_type_id", nullable = false)
    var productType: ProductType? = null

    @Column(name = "count", nullable = false)
    var count: Int? = null

    @Column(name = "description")
    var description: String? = null

    @Column(name = "created_date", updatable = false)
    @CreatedDate
    private var createdAt: Date? = null

    @Column(name = "updated_date")
    @LastModifiedDate
    private var updatedAt: Date? = null


//    @ManyToMany(mappedBy = "cart")
//    var usersCart: List<User>? = null
}