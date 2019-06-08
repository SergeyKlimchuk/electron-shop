package usrt.technospace.models.payment

enum class BillStatus(value: Int) {
    NONE(-1),
    REMOVED(0),
    REJECTED(1),
    EXPIRED(2),
    PENDING_PAY(3),
    PAYED(4),
    PENDING_PROCESSING(5),
    PROCESSING(6),
    SENT(7),
    AWAIT_DELIVERY(8),
    DELIVERED(9)
}