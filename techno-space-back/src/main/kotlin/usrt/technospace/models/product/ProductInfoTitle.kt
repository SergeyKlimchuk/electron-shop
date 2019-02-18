package usrt.technospace.models.product

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*
import javax.validation.constraints.NotBlank

@Entity
@Table(name = "products_info_title")
class ProductInfoTitle {
    @Id
    @GeneratedValue(generator = "products_info_title_generator")
    @SequenceGenerator(
            name = "products_info_title_generator",
            sequenceName = "products_info_title_generator",
            initialValue = 1
    )
    var id: Long? = 0

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_type_id", nullable = false)
    @JsonIgnore
    var productType: ProductType? = null

    @NotBlank
    @Column(name = "name", nullable = false)
    var name: String = ""
}