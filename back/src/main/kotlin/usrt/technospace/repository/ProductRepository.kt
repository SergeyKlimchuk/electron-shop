package usrt.technospace.repository

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import usrt.technospace.models.product.Product


@Repository
interface ProductRepository : JpaRepository<Product, Long> {

    fun countProductsByProductTypeId(id: Long): Long

    fun findAllByProductTypeId(productTypeId: Long, pageable: Pageable): Page<Product>
}