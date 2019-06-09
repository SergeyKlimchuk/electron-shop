package usrt.technospace.repository

import org.springframework.stereotype.Repository
import usrt.technospace.models.map.CountryPoint

@Repository
interface CountryRepository : MapRepository<CountryPoint>