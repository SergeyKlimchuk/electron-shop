package usrt.technospace.services

import org.apache.logging.log4j.util.Strings
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import usrt.technospace.dto.QuerySegment
import usrt.technospace.models.product.Product
import usrt.technospace.models.product.ProductInfoValueType
import usrt.technospace.repository.ProductInfoTitleRepository
import usrt.technospace.repository.ProductRepository
import java.math.BigInteger
import javax.persistence.EntityManager

@Service
class SearchService {
    @Autowired
    lateinit var productRepository: ProductRepository

    @Autowired
    lateinit var entityManager: EntityManager

    @Autowired
    lateinit var productInfoTitleRepository: ProductInfoTitleRepository

    fun search(querySegments: List<QuerySegment>, pageable: Pageable): Page<Product> {
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
        val queryWithTotalCount = "SELECT COUNT(pvt.id) FROM ($query) as pvt"
        val nativeQuery = entityManager.createNativeQuery(queryWithTotalCount)
        return (nativeQuery.resultList[0] as BigInteger).toLong()
    }

    private fun generateQuery(querySegments: List<QuerySegment>): String {
        val query = StringBuilder()
        query.append("SELECT DISTINCT p.* FROM products as p ")
                .append("LEFT JOIN products_info_value as v on v.product_id = p.id ")
                .append("LEFT JOIN products_info_title as t on (t.id = v.title_id AND p.product_type_id = t.product_type_id) ")
                .append("WHERE ")
        for (segmentIndex in querySegments.indices) {
            val querySegment = querySegments[segmentIndex]

            val queryPart = when (productInfoTitleRepository.findValueTypeByTitleId(querySegment.titleId)) {
                ProductInfoValueType.Boolean -> generateQueryForBoolean(querySegment)
                ProductInfoValueType.Dictionary -> generateQueryForDictionary(querySegment)
                else -> ""
            }

            if (segmentIndex != 0) {
                query.append(" AND ")
            }
            query.append(queryPart)
        }
        return query.toString()
    }

    private fun generateQueryForBoolean(querySegment: QuerySegment): String {
        val value = querySegment.value as Boolean
        return "((SELECT count(*) FROM products_info_value WHERE product_id = p.id AND title_id = ${querySegment.titleId} AND value = '$value') = 1)"
    }

    private fun generateQueryForDictionary(querySegment: QuerySegment): String {
        val values = querySegment.value as List<Long>
        val valueIds = Strings.join(values.map { x -> x.toString() }, ',')
        return "(v.title_id = ${querySegment.titleId} AND CAST(v.value AS int)  IN ($valueIds))"
    }
}