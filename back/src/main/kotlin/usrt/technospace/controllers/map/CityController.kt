package usrt.technospace.controllers.map

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import usrt.technospace.exceptions.NotFoundException
import usrt.technospace.models.map.AddressPoint
import usrt.technospace.models.map.CityPoint
import usrt.technospace.models.map.CountryPoint
import usrt.technospace.repository.CityRepository
import usrt.technospace.repository.MapRepository

@RestController
class CityController {
    @Autowired
    lateinit var repository: CityRepository

    @GetMapping("map/cities")
    fun getAll(): List<CityPoint> {
        return repository.findAll().toList()
    }

    @GetMapping("map/cities/{cityId}")
    fun getById(@PathVariable cityId: Long): CityPoint {
        val country = repository.findById(cityId)
        if (!country.isPresent) {
            throw NotFoundException()
        }
        return country.get()
    }

    @GetMapping("map/cities/{city}/parent")
    fun getParent(@PathVariable cityId: Long): CountryPoint {
        val country = repository.findById(cityId)
        if (!country.isPresent) {
            throw NotFoundException()
        }
        return country.get().parent as CountryPoint
    }

    @GetMapping("map/cities/{cityId}/childrens")
    fun get(@PathVariable cityId: Long): List<AddressPoint> {
        val city = repository.findById(cityId)
        if (!city.isPresent) {
            throw NotFoundException()
        }
        return city.get().childrens.map { x -> x as AddressPoint }
    }

    @GetMapping("map/cities/main")
    fun getMainCity(): CityPoint {
        return repository.findByIsMainTrue()
    }

    @GetMapping("map/cities/search")
    fun findCityByName(@RequestParam name: String): List<CityPoint> {
        return repository.findByName(name)
    }

    @DeleteMapping("map/cities/{cityId}")
    fun delete(@PathVariable cityId: Long) {
        if (!repository.existsById(cityId)) {
            throw NotFoundException()
        }
        repository.deleteById(cityId)
    }
}