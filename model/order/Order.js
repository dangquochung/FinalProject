exports.Order = class Order {
    constructor(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getCart() {
        return this.cart;
    }

    setCart(cart) {
        this.cart = cart;
    }

    getDate() {
        return this.date;
    }

    setDate(date) {
        this.date = date;
    }

    getPaymentMethod() {
        return this.paymentMethod;
    }

    setPaymentMethod(paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    getStatus() {
        return this.status;
    }

    setStatus(status) {
        this.status = status;
    }
}