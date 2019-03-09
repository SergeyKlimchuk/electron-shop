package usrt.technospace.file_savers

import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.Resource
import org.springframework.core.io.UrlResource
import org.springframework.stereotype.Component
import org.springframework.web.multipart.MultipartFile
import usrt.technospace.exceptions.CouldNotSaveFileError
import usrt.technospace.exceptions.ResourceNotFound
import java.nio.file.Files
import java.nio.file.Paths
import java.util.*

@Component
class NativeFileSaver : FileSaver {
    @Value("\${assets.path}")
    private lateinit var pathToFolder: String

    override fun save(file: MultipartFile): String {
        try {
            val lastDotIndex = file.originalFilename!!.lastIndexOf('.')
            val extension = file.originalFilename!!.substring(lastDotIndex)
            val fileName = UUID.randomUUID().toString() + extension
            val path = Paths.get(pathToFolder + fileName)
            Files.write(path, file.bytes)
            return "/api/files/$fileName"
        } catch (e: Error) {
            throw CouldNotSaveFileError(e)
        }
    }

    override fun get(fileName: String): Resource {
        val path = Paths.get(pathToFolder + fileName)
        val resource = UrlResource(path.toUri())
        if (resource.exists()) {
            return resource
        } else {
            throw ResourceNotFound()
        }
    }

}
