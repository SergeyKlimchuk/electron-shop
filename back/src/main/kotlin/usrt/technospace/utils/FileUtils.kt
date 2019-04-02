package usrt.technospace.utils

import java.io.File

class FileUtils {
    companion object {
        fun convertFileToString(file: File): String {
            val bytes = file.readBytes()
            return String(bytes)
        }
    }
}