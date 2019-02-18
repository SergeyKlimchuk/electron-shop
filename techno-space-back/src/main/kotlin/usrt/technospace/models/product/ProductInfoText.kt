package usrt.technospace.models.product

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*
import javax.validation.constraints.NotBlank

@Entity
@Table(name = "products_info_text")
class ProductInfoText {
    @Id
    @GeneratedValue(generator = "products_info_text_generator")
    @SequenceGenerator(
            name = "products_info_text_generator",
            sequenceName = "products_info_text_generator",
            initialValue = 1
    )
    var id: Long? = 0

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    @JsonIgnore
    var product: Product? = null

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_info_title_id", nullable = false)
    @JsonIgnore
    var title: ProductInfoTitle? = null

    @NotBlank
    @Column(name = "text", nullable = false)
    var text: String = ""
}