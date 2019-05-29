package usrt.technospace.services

import org.springframework.stereotype.Service
import usrt.technospace.models.mails.MailTemplate
import java.io.BufferedReader
import java.io.InputStreamReader
import java.util.*
import javax.annotation.PostConstruct

@Service
class MailTemplateService {

    private lateinit var paths: Dictionary<MailTemplate, String>

    @PostConstruct
    private fun init() {
        val values = Hashtable<MailTemplate, String>()
        for (value in MailTemplate.values()) {
            values[value] = loadTemplate(value)
        }
        paths = values
    }

    fun build(mailTemplate: MailTemplate, values: HashMap<String, String>): String {
        var template = paths[mailTemplate]
        for (key in values.keys) {
            template = template.replace("{{ $key }}", values[key]!!)
        }
        val messageBody = removeAllUnusedVars(template)
        return insertContentInTemplate(messageBody)
    }

    private fun insertContentInTemplate(content: String): String {
        val template = paths[MailTemplate.TEMPLATE]
        return template.replace("{{ content }}", content)
    }

    private fun loadTemplate(value: MailTemplate): String {
        val templateFileName = "${value.name.toLowerCase()}_notification.html"
        return getResourceAsText("notification-templates/$templateFileName")
    }

    fun getResourceAsText(path: String): String {
        try {
            val stream = this.javaClass.classLoader.getResourceAsStream(path)
            val reader = BufferedReader(InputStreamReader(stream))
            return reader.readText()
        } catch (e: Error) {
            throw Error("Could not find template \"$path\"", e)
        }
    }

    private fun removeAllUnusedVars(value: String): String {
        return value.replace(Regex("[{]{2}([^}]+)[}]{2}"), "")
    }
}