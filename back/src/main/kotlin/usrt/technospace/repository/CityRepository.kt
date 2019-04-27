package usrt.technospace.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import usrt.technospace.models.map.City

@Repository
interface CityRepository : JpaRepository<City, Long> {
    fun findByNameOrNameEn(name: String, nameEn: String): List<City>
    fun findByIsMainTrue(): City
}