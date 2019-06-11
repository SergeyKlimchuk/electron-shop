package usrt.technospace.controllers.map

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import usrt.technospace.exceptions.NotFoundException
import usrt.technospace.models.map.AddressPoint
import usrt.technospace.models.map.CityPoint
import usrt.technospace.repository.AddressRepository
import usrt.technospace.repository.CityRepository

@RestController
class AddressController {
    @Autowired
    lateinit var repository: AddressRepository

    @Autowired
    lateinit var cityRepository: CityRepository

    @GetMapping("map/addresses")
    fun getAll(): List<AddressPoint> {
        return repository.findAll().toList()
    }

    @GetMapping("map/addresses/{addressId}")
    fun getById(@PathVariable addressId: Long): AddressPoint {
        val country = repository.findById(addressId)
        if (!country.isPresent) {
            throw NotFoundException()
        }
        return country.get()
    }

    @GetMapping("map/addresses/{addressId}/parent")
    fun getParent(@PathVariable addressId: Long): CityPoint {
        val country = repository.findById(addressId)
        if (!country.isPresent) {
            throw NotFoundException()
        }
        return country.get().parent as CityPoint
    }

    @PostMapping("map/cities/{cityId}/childrens")
    fun addNew(@PathVariable cityId: Long, @RequestBody address: AddressPoint): AddressPoint {
        val city = cityRepository.findById(cityId)
        if (!city.isPresent) {
            throw NotFoundException()
        }
        address.parent = city.get()
        return repository.save(address)
    }

    @DeleteMapping("map/addresses/{addressId}")
    fun delete(@PathVariable addressId: Long) {
        if (!repository.existsById(addressId)) {
            throw NotFoundException()
        }
        repository.deleteById(addressId)
    }
}