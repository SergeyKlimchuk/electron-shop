package usrt.technospace.services

import org.springframework.stereotype.Service
import usrt.technospace.repository.ProductRepository
import usrt.technospace.repository.ProductTypeRepository
import javax.annotation.PostConstruct

@Service
class TestService(private val productRepository: ProductRepository,
                  private val productTypeRepository: ProductTypeRepository) {


    @PostConstruct
    fun init() {
    }
}