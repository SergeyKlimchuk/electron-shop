package usrt.technospace.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.web.PageableDefault
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import usrt.technospace.dto.QuerySegment
import usrt.technospace.models.product.Product
import usrt.technospace.repository.ProductRepository
import usrt.technospace.services.SearchService

@RestController
class SearchController {

    @Autowired
    lateinit var searchService: SearchService

    @Autowired
    lateinit var productRepository: ProductRepository

    @PostMapping("/search")
    fun search(@RequestBody querySegments: List<QuerySegment>,
               @PageableDefault(sort = ["createdAt"], direction = Sort.Direction.DESC) pageable: Pageable): Page<Product> {
        if (querySegments.isEmpty()) {
            return productRepository.findAll(pageable)
        }

        return searchService.search(querySegments, pageable)
    }
}