package usrt.technospace.converters

import javax.persistence.AttributeConverter
import javax.persistence.Converter

@Converter
class WorkDaysConverter : AttributeConverter<List<Int>, String> {
    override fun convertToEntityAttribute(dbData: String?): List<Int> {
        if (dbData == null || dbData == "") {
            return arrayListOf()
        }
        return dbData.split(',').map { x -> x.toInt() }
    }

    override fun convertToDatabaseColumn(attribute: List<Int>?): String {
        if (attribute == null) {
            return ""
        }

        return attribute.joinToString { x -> x.toString() }
    }

}