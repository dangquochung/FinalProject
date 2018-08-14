exports.PaymentMethod = class PaymentMethod {
    constructor() {}

    getStatus() {
        return this.status;
    }

    setStatus(status) {
        this.status = status;
    }
}