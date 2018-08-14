exports.Shipping = class Shipping {
    constructor(order) {
        this.order = order;
    }

    getOrder() {
        return this.order;
    }

    setOrder(order) {
        this.order = order;
    }

    getReceiver() {
        return this.receiver;
    }

    setReceiver(receiver) {
        this.receiver = receiver;
    }
}