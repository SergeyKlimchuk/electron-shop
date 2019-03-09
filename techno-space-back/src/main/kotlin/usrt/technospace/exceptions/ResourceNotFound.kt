package usrt.technospace.exceptions

class ResourceNotFound : Error() {
    override val message: String?
        get() = "Resource not found!"
}