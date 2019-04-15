package usrt.technospace.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import usrt.technospace.models.map.City

@Repository
interface CityRepository : JpaRepository<City, Long> {
    fun findFirstByNameOrNameEn(name: String, nameEn: String): City
}