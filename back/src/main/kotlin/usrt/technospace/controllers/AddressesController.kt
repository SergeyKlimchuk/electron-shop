package usrt.technospace.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import usrt.technospace.exceptions.NotFoundException
import usrt.technospace.models.map.Address
import usrt.technospace.models.map.City
import usrt.technospace.models.map.Country
import usrt.technospace.repository.CityRepository
import usrt.technospace.repository.CountryRepository

@RestController
@RequestMapping("map")
class AddressesController {

    @Autowired
    lateinit var countryRepository: CountryRepository

    @Autowired
    lateinit var cityRepository: CityRepository

    @GetMapping("/countries")
    fun getAllCountries(): List<Country> {
        return countryRepository.findAll()
    }

    @GetMapping("/{country}")
    fun getCitiesInCountry(country: Country): List<City> {
        return country.cities
    }

    @GetMapping("/city/{city}")
    fun getAddressesInCity(city: City): List<Address> {
        return city.addresses
    }

    @GetMapping("/city")
    @ResponseBody fun searchCity(@RequestParam name: String): City {
        val city = cityRepository.findFirstByNameOrNameEn(name, name) ?: throw NotFoundException()
        return city
    }
}