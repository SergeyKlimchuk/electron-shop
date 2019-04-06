package usrt.technospace.models.payment

enum class BillStatus(value: Int) {
    PENDING_PAY(0),
    PAYED(1),
    PENDING_PROCESSING(2),
    PROCESSING(3),
    SENT(4),
    AWAIT_DELIVERY(5),
    DELIVERED(6)
}