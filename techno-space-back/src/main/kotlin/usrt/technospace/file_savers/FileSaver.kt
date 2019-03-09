package usrt.technospace.file_savers

import org.springframework.core.io.Resource
import org.springframework.web.multipart.MultipartFile

interface FileSaver {
    /**
     * Save file and return url to resource
     */
    fun save(file: MultipartFile): String

    /**
     * Return resource
     */
    fun get(fileName: String): Resource
}