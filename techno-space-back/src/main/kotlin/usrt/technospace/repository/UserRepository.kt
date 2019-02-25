package usrt.technospace.repository

import org.springframework.data.jpa.repository.JpaRepository
import usrt.technospace.models.identity.User

interface UserRepository : JpaRepository<User, Long> {
    fun findByUsername(username: String?): User?
}
