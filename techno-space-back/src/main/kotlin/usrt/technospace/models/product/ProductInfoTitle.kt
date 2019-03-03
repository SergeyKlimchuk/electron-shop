package usrt.technospace.models.product

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*
import javax.validation.constraints.NotBlank

@Entity
@Table(name = "products_info_title")
class ProductInfoTitle {
    @Id
    @GeneratedValue
    var id: Long? = 0

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_type_id", nullable = false)
    @JsonIgnore
    var productType: ProductType? = null

    @NotBlank
    @Column(name = "name", nullable = false)
    var name: String = ""
}