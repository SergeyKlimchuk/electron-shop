package usrt.technospace.models.product

import com.fasterxml.jackson.annotation.JsonBackReference
import usrt.technospace.models.dictionary.Dictionary
import javax.persistence.*
import javax.validation.constraints.NotBlank

@Entity
@Table(name = "products_info_title")
class ProductInfoTitle {
    @Id
    @GeneratedValue
    var id: Long? = 0

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_type_id")
    var productType: ProductType? = null

    @NotBlank
    @Column(name = "name", nullable = false)
    var name: String = ""

    @JoinTable(
            name = "product_info_value_types",
            joinColumns = [JoinColumn(name = "product_info_value_type_id")]
    )
    @Enumerated(EnumType.STRING)
    var type: ProductInfoValueType? = ProductInfoValueType.None

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dictionary_id")
    var dictionary: Dictionary? = null
}