package usrt.technospace.controllers.map

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import usrt.technospace.exceptions.NotFoundException
import usrt.technospace.models.map.CityPoint
import usrt.technospace.models.map.CountryPoint
import usrt.technospace.repository.CountryRepository
import usrt.technospace.repository.MapRepository

@RestController
class CountryController {
    @Autowired
    lateinit var repository: CountryRepository

    @GetMapping("map/countries")
    fun getAll(): List<CountryPoint> {
        return repository.findAll().toList()
    }

    @GetMapping("map/countries/{countryId}")
    fun getById(@PathVariable countryId: Long): CountryPoint {
        val country = repository.findById(countryId)
        if (!country.isPresent) {
            throw NotFoundException()
        }
        return country.get()
    }

    @GetMapping("map/countries/{countryId}/childrens")
    fun getChildrens(@PathVariable countryId: Long): List<CountryPoint> {
        val country = repository.findById(countryId)
        if (!country.isPresent) {
            throw NotFoundException()
        }
        return country.get().childrens.map { x -> x as CountryPoint }
    }

    @PostMapping("map/countries")
    fun addNew(@RequestBody country: CountryPoint): CountryPoint {
        return repository.save(country)
    }

    @DeleteMapping("map/countries/{countryId}")
    fun delete(@PathVariable countryId: Long) {
        if (!repository.existsById(countryId)) {
            throw NotFoundException()
        }
        repository.deleteById(countryId)
    }
}