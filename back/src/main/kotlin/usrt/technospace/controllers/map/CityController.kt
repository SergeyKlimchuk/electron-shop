package usrt.technospace.controllers.map

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import usrt.technospace.exceptions.NotFoundException
import usrt.technospace.models.map.CityPoint
import usrt.technospace.models.map.CountryPoint
import usrt.technospace.repository.CityRepository
import usrt.technospace.repository.MapRepository

@RestController
class CityController {
    @Autowired
    lateinit var repository: CityRepository
    @Autowired
    lateinit var countryRepository: MapRepository<CountryPoint>

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

    @GetMapping("map/cities/{city}/childrens")
    fun getChildrens(@PathVariable cityId: Long): List<CityPoint> {
        val country = repository.findById(cityId)
        if (!country.isPresent) {
            throw NotFoundException()
        }
        return country.get().childrens.map { x -> x as CityPoint }
    }

    @GetMapping("map/cities/{city}/parent")
    fun getParent(@PathVariable cityId: Long): CountryPoint {
        val country = repository.findById(cityId)
        if (!country.isPresent) {
            throw NotFoundException()
        }
        return country.get().parent as CountryPoint
    }

    @GetMapping("map/cities/main")
    fun getMainCity(): CityPoint {
        return repository.findByIsMainTrue()
    }

    @GetMapping("map/cities/search")
    fun findCityByName(@RequestParam name: String): List<CityPoint> {
        return repository.findByName(name)
    }

    @PostMapping("map/countries/{countryId}/childrens")
    fun addNew(@PathVariable countryId: Long, @RequestBody city: CityPoint): CityPoint {
        val country = countryRepository.findById(countryId)
        if (!country.isPresent) {
            throw NotFoundException()
        }
        city.parent = country.get()
        return repository.save(city)
    }

    @DeleteMapping("map/cities/{cityId}")
    fun delete(cityId: Long) {
        if (!repository.existsById(cityId)) {
            throw NotFoundException()
        }
        repository.deleteById(cityId)
    }
}