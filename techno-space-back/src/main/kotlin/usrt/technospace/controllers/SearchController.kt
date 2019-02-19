package usrt.technospace.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import usrt.technospace.models.product.Product
import usrt.technospace.repository.ProductRepository

@RestController
class SearchController {

    @Autowired
    lateinit var productRepository: ProductRepository

    @GetMapping("/search")
    fun search(@RequestParam("q") query: String): List<Product> {
        val screenedQuery = query.replace(Regex("\""), "\\\"")
        val results = productRepository.findByNameContaining(screenedQuery)
        return if (results.size > -1) {
            results
        } else {
            ArrayList(0)
        }
    }
}