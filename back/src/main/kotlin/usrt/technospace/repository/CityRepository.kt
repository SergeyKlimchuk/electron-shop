package usrt.technospace.repository

import org.springframework.stereotype.Repository
import usrt.technospace.models.map.CityPoint

@Repository
interface CityRepository : MapRepository<CityPoint> {
    fun findByIsMainTrue(): CityPoint
}