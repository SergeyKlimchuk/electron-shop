package usrt.technospace.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import usrt.technospace.models.product.ProductType

interface ProductTypeRepository: JpaRepository<ProductType, Long> {

    @Query("SELECT pt FROM ProductType pt WHERE pt.name=?1")
    fun findByName(name: String): ProductType
}