package usrt.technospace.models.product

import com.fasterxml.jackson.annotation.JsonIgnore
import org.hibernate.annotations.OnDelete
import org.hibernate.annotations.OnDeleteAction
import javax.persistence.*
import javax.validation.constraints.NotBlank
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

    @Column(name = "price", nullable = false)
    var price: Int? = null

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
    var texts: List<ProductInfoText>? = null

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    @JsonIgnore
    var productType: ProductType? = null

    @Column(name = "count", nullable = false)
    var count: Int? = null
}