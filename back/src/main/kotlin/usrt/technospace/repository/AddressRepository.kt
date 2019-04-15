package usrt.technospace.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import usrt.technospace.models.map.Address

@Repository
interface AddressRepository : JpaRepository<Address, Long>