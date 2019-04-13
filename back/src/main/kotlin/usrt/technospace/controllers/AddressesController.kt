package usrt.technospace.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import usrt.technospace.models.addresses.Address
import usrt.technospace.models.addresses.City
import usrt.technospace.models.addresses.Country
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
    fun searchCity(@RequestParam name: String): City {
        return cityRepository.findFirstByNameOrNameEn(name)
    }
}