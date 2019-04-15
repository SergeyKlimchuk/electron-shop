package usrt.technospace.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import usrt.technospace.models.map.Country

@Repository
interface CountryRepository : JpaRepository<Country, Long>