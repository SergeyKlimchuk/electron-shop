package usrt.technospace.repository

import org.springframework.data.jpa.repository.JpaRepository
import usrt.technospace.models.product.ProductInfoTitle

interface ProductInfoTitleRepository : JpaRepository<ProductInfoTitle, Long> {

    fun findAllByProductTypeId(productTypeId: Long): List<ProductInfoTitle>
}