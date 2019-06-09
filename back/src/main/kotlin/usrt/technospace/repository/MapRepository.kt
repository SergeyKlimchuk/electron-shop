package usrt.technospace.repository

import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import usrt.technospace.models.map.PointNode

@Repository
interface MapRepository<T> : CrudRepository<T, Long> where T : PointNode {
    fun findAllByParent_id(id: Long): List<T>
    @Query("SELECT p FROM PointNode p WHERE p.name=?1 OR p.nameEn=?1")
    fun findByName(nameRu: String): List<T>
}