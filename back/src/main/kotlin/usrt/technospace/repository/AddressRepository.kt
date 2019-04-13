package usrt.technospace.repository

import org.springframework.data.jpa.repository.JpaRepository
import usrt.technospace.models.addresses.Address

interface AddressRepository : JpaRepository<Address, Long>