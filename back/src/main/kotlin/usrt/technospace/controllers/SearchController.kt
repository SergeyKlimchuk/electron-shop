package usrt.technospace.controllers

import org.apache.logging.log4j.util.Strings
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.web.PageableDefault
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import usrt.technospace.dto.QuerySegment
import usrt.technospace.models.product.Product
import usrt.technospace.repository.ProductRepository
import javax.persistence.EntityManager

@RestController
class SearchController {

    @Autowired
    lateinit var productRepository: ProductRepository

    @Autowired
    lateinit var entityManager: EntityManager

    @GetMapping("/search")
    fun search(@RequestBody querySegments: List<QuerySegment>,
               @PageableDefault(sort = ["createdAt"], direction = Sort.Direction.DESC) pageable: Pageable): Page<Product> {
        if (querySegments.isEmpty()) {
            return productRepository.findAll(pageable)
        }

        val query = generateQuery(querySegments)
        val products = searchProducts(query, pageable)
        val totalCount = getSearchResultsTotalCount(query)

        return PageImpl<Product>(products, pageable, totalCount)
    }

    private fun searchProducts(query: String, pageable: Pageable): List<Product> {
        val queryWithPaging = "$query OFFSET ${pageable.offset} LIMIT ${pageable.pageSize}"
        val nativeQuery = entityManager.createNativeQuery(queryWithPaging, Product::class.java)
        return nativeQuery.resultList as List<Product>
    }

    private fun getSearchResultsTotalCount(query: String): Long {
        val queryWithTotalCount = "SELECT COUNT(*) FROM ($query)"
        val nativeQuery = entityManager.createNativeQuery(queryWithTotalCount, Int::class.java)
        return nativeQuery.firstResult.toLong()
    }

    private fun generateQuery(querySegments: List<QuerySegment>): String {
        val query = StringBuilder()
        query.append("SELECT DISTINCT p.* FROM products as p ")
                .append("INNER JOIN products_info_value as v on v.product_id = p.id ")
                .append("INNER JOIN products_info_title as t on (t.id = v.title_id AND p.product_type_id = t.product_type_id) ")
                .append("WHERE ")
        for (segmentIndex in querySegments.indices) {
            val querySegment = querySegments[segmentIndex]
            val valueIds = Strings.join(querySegment.values!!.map { x -> x.toString() }, ',')

            if (segmentIndex != 0) {
                query.append(" || ")
            }

            query.append("(v.id IN ($valueIds) AND v.title_id = ${querySegment.titleId})")
        }
        return query.toString()
    }
}