package usrt.technospace.models.product

import com.fasterxml.jackson.annotation.JsonBackReference
import javax.persistence.*
import javax.validation.constraints.NotBlank

@Entity
@Table(name = "products_info_value")
class ProductInfoValue {
    @Id
    @GeneratedValue
    var id: Long? = 0

    @JsonBackReference
    @JoinColumn(name = "product_id", nullable = false)
    @ManyToOne(
            fetch = FetchType.LAZY,
            optional = false,
            cascade = [CascadeType.ALL])
    var product: Product? = null

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(nullable = false)
    var title: ProductInfoTitle? = null

    @NotBlank
    @Column(name = "value", nullable = false)
    var value: String = ""
}