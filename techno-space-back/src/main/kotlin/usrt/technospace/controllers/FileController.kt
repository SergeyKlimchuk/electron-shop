package usrt.technospace.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.io.Resource
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import usrt.technospace.file_savers.FileSaver
import javax.servlet.http.HttpServletRequest


@RestController
class FileController {


    @Autowired
    private lateinit var fileSaver: FileSaver

    @PostMapping("/files")
    fun uploadFile(@RequestParam file: MultipartFile): ResponseEntity<String> {
        val fileName = fileSaver.save(file)
        return ResponseEntity.ok()
                .contentType(MediaType.TEXT_PLAIN)
                .body("\"$fileName\"")
    }

    @GetMapping("/files/{fileName}")
    fun getFile(@PathVariable fileName: String, request: HttpServletRequest): ResponseEntity<Resource> {
        val resource = fileSaver.get(fileName)

        var contentType: String? = request.servletContext.getMimeType(resource.file.absolutePath)

        // Fallback to the default content type if type could not be determined
        if (contentType == null) {
            contentType = "application/octet-stream"
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.filename + "\"")
                .body(resource)
    }
}