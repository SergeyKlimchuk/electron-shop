package usrt.technospace.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import usrt.technospace.models.product.ProductInfoTitle
import usrt.technospace.models.product.ProductInfoValueType

interface ProductInfoTitleRepository : JpaRepository<ProductInfoTitle, Long> {

    fun findAllByProductTypeId(productTypeId: Long): List<ProductInfoTitle>

    @Query("SELECT t.type FROM ProductInfoTitle t WHERE t.id=?1")
    fun findValueTypeByTitleId(titleId: Long): ProductInfoValueType
}