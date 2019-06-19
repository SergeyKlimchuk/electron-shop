package usrt.technospace.controllers.user

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import usrt.technospace.models.payment.DeliveryAddress
import usrt.technospace.repository.DeliveryAddressRepository
import usrt.technospace.services.DeliveryAddressService
import usrt.technospace.services.UserService

@RestController
class UserAddressController {

    @Autowired
    lateinit var userService: UserService

    @Autowired
    lateinit var addressRepository: DeliveryAddressRepository
    @Autowired
    lateinit var deliveryAddressService: DeliveryAddressService

    @PostMapping("/user/current/address")
    fun addAddress(@RequestBody address: DeliveryAddress) {
        val user = userService.getCurrentUser()
        if (user.addresses.isEmpty()) {
            address.isFavorite = true
        }
        address.user = user
        addressRepository.save(address)
    }

    @PutMapping("/user/current/address")
    fun updateAddress(@RequestBody address: DeliveryAddress) {
        address.user = userService.getCurrentUser()
        addressRepository.save(address)
    }

    @DeleteMapping("/user/current/address/{addressId}")
    fun removeAddress(@PathVariable addressId: Long) {
        val address = addressRepository.getOne(addressId)
        addressRepository.deleteById(addressId)
        if (address.isFavorite) {
            val user = userService.getCurrentUser()
            if (!user.addresses.any()) {
                return
            }
            val newAddress = user.addresses.first { x -> x.id != address.id }
            newAddress.isFavorite = true
            addressRepository.save(newAddress)
        }
    }

    @PostMapping("/user/current/address/favorite/{addressId}")
    fun setFavoriteAddress(@PathVariable addressId: Long) {
        deliveryAddressService.setFavoriteAddress(addressId)
    }
}