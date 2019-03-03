package usrt.technospace.repository

import org.springframework.data.jpa.repository.JpaRepository
import usrt.technospace.models.product.ProductInfoValue

interface ProductInfoValueRepository : JpaRepository<ProductInfoValue, Long> {

    fun findAllByProductId(productTypeId: Long): List<ProductInfoValue>
}