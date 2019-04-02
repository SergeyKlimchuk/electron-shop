package usrt.technospace.services

import org.springframework.stereotype.Service
import usrt.technospace.models.mails.MailTemplate
import usrt.technospace.utils.FileUtils
import java.io.File
import java.nio.file.Files
import java.nio.file.Paths
import java.util.*
import javax.annotation.PostConstruct
import kotlin.collections.HashMap

@Service
class MailTemplateService {

    private lateinit var paths: Dictionary<MailTemplate, File>

    @PostConstruct
    private fun init() {
        val values = Hashtable<MailTemplate, File>()
        for (value in MailTemplate.values()) {
            values[value] = loadTemplate(value)
        }
        paths = values
    }

    fun build(mailTemplate: MailTemplate, values: HashMap<String, String>): String {
        val templateFile = paths[mailTemplate]
        var template = FileUtils.convertFileToString(templateFile)
        for (key in values.keys) {
            template = template.replace("{{ $key }}", values[key]!!)
        }
        val messageBody = removeAllUnusedVars(template)
        return insertContentInTemplate(messageBody)
    }

    private fun insertContentInTemplate(content: String): String {
        val pathToTemplate = paths[MailTemplate.TEMPLATE]
        val template = FileUtils.convertFileToString(pathToTemplate)
        return template.replace("{{ content }}", content)
    }

    private fun loadTemplate(value: MailTemplate): File {
        val templateFileName = "${value.name.toLowerCase()}_notification.html"
        val templateUri = javaClass.classLoader.getResource("notification-templates/$templateFileName").toURI()

        if (Files.exists(Paths.get(templateUri))) {
            return File(templateUri)
        }
        throw Error("Could not find template \"$templateFileName\"")
    }

    private fun removeAllUnusedVars(value: String): String {
        return value.replace(Regex("[{]{2}([^}]+)[}]{2}"), "")
    }
}