package usrt.technospace.models.product

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*
import javax.persistence.FetchType

@Entity
@Table(name = "products")
class Product {
    @Id
    @GeneratedValue(generator = "product_generator")
    @SequenceGenerator(
            name = "product_generator",
            sequenceName = "product_generator",
            initialValue = 1
    )
    var id: Long? = null

    @Column(name = "name", nullable = false)
    var name: String? = null

    @Column(name = "price", nullable = false)
    var price: Int? = null

    /**
     * Information about product. (Dynamic multiline)
     */
//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
//    var texts: List<ProductInfoText>? = null

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_type_id", nullable = false)
    var productType: ProductType? = null

    @Column(name = "count", nullable = false)
    var count: Int? = null
}