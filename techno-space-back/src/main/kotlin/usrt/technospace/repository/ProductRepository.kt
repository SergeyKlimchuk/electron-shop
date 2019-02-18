package usrt.technospace.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import usrt.technospace.models.product.Product
import usrt.technospace.models.product.ProductType


@Repository
interface ProductRepository : JpaRepository<Product, Long> {
    fun findByProductType(productType: ProductType?): List<Product>
}