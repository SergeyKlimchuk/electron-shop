package usrt.technospace.repository

import org.springframework.data.jpa.repository.JpaRepository
import usrt.technospace.models.addresses.City

interface CityRepository : JpaRepository<City, Long> {
    fun findFirstByNameOrNameEn(name: String): City
}