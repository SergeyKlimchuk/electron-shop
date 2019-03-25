package usrt.technospace.models.product

import com.fasterxml.jackson.annotation.JsonBackReference
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import java.util.*
import javax.persistence.*

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
    @JsonBackReference
    @OneToMany(
            fetch = FetchType.LAZY,
            mappedBy = "product",
            orphanRemoval = true,
            cascade = [CascadeType.ALL]
    )
    var values: Set<ProductInfoValue>? = null

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
}