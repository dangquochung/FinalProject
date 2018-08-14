exports.OrderItem = class OrderItem {
    constructor() {
        this.quantity = 0;
    }

    getItem() {
        return this.item;
    }

    setItem(item) {
        this.item = item;
    }

    getQuantity() {
        return this.quantity;
    }

    setQuantity(quantity) {
        this.quantity = quantity;
    }
}