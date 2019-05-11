package usrt.technospace.models.product

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import usrt.technospace.models.actions.Action
import usrt.technospace.models.core.Auditable
import javax.persistence.*

@Entity
@Table(name = "products")
@JsonIgnoreProperties("actions")
class Product : Auditable() {
    @Id
    @GeneratedValue
    var id: Long? = null

    @Column(name = "name", nullable = false)
    var name: String? = null

    @Column(name = "price", nullable = false)
    var price: Int? = null

    @Column(name = "image_url")
    var imageUrl: String? = null

    @Column(name = "views", nullable = false)
    var views: Int = 0

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

    @ManyToMany(
            mappedBy = "products"
    )
    var actions: Set<Action> = emptySet()
}