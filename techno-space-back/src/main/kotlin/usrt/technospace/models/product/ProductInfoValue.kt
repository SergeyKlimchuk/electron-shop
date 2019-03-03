package usrt.technospace.models.product

import javax.persistence.*
import javax.validation.constraints.NotBlank

@Entity
@Table(name = "products_info_text")
class ProductInfoValue {
    @Id
    @GeneratedValue
    var id: Long? = 0

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    var product: Product? = null

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(nullable = false)
    var title: ProductInfoTitle? = null

    @NotBlank
    @Column(name = "value", nullable = false)
    var value: String = ""
}