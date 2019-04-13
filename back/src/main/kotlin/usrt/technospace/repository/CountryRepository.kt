package usrt.technospace.repository

import org.springframework.data.jpa.repository.JpaRepository
import usrt.technospace.models.addresses.Country

interface CountryRepository : JpaRepository<Country, Long>