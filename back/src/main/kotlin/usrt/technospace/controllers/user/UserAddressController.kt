package usrt.technospace.controllers.user

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import usrt.technospace.models.payment.DeliveryAddress
import usrt.technospace.repository.DeliveryAddressRepository
import usrt.technospace.repository.UserRepository
import usrt.technospace.services.DeliveryAddressService
import usrt.technospace.services.UserService

@RestController
class UserAddressController {

    @Autowired
    lateinit var userService: UserService

    @Autowired
    lateinit var userRepository: UserRepository

    @Autowired
    lateinit var addressRepository: DeliveryAddressRepository
    @Autowired
    lateinit var deliveryAddressService: DeliveryAddressService

    @PostMapping("/user/current/address")
    fun addAddress(@RequestBody address: DeliveryAddress) {
        val user = userService.getCurrentUser()
        if (user.addresses.size == 0) {
            address.isFavorite = true
        }
        user.addresses.add(address)
        userRepository.save(user)
    }

    @PutMapping("/user/current/address")
    fun updateAddress(@RequestBody address: DeliveryAddress) {
        address.user = userService.getCurrentUser()
        addressRepository.save(address)
    }

    @DeleteMapping("/user/current/address/{addressId}")
    fun removeAddress(@PathVariable addressId: Long) {
        addressRepository.deleteById(addressId)
    }

    @PostMapping("/user/current/address/favorite/{addressId}")
    fun setFavoriteAddress(@PathVariable addressId: Long) {
        deliveryAddressService.setFavoriteAddress(addressId)
    }
}