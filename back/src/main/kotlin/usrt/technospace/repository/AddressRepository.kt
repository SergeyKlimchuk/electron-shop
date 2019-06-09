package usrt.technospace.repository

import org.springframework.stereotype.Repository
import usrt.technospace.models.map.AddressPoint

@Repository
interface AddressRepository : MapRepository<AddressPoint>