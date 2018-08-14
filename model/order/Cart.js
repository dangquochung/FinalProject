exports.Cart = class Cart {
    constructor() {
        this.listItems = [];
    }

    addItem(item) {
        var isFound = false;
        for (var i = 0; i < this.listItems.length; i++) {
            if (this.listItems[i].getItem().getName() === item.getItem().getName()) {
                this.listItems[i].setQuantity(this.listItems[i].getQuantity() + item.getQuantity());
                isFound = true;
                break;
            }
        }
        if (!isFound) {
            this.listItems.push(item);
        }
    }

    removeItem(item) {
        var listItems = [];
        for (var i = 0; i < this.listItems.length; i++) {
            if (this.listItems[i].getItem().getName() === item.getItem().getName()) {
                continue;
            } else {
                listItems.push(this.listItems[i]);
            }
        }

        this.listItems = listItems;
    }

    removeAllItems() {
        this.listItems = [];
    }

    getListItems() {
        return this.listItems;
    }

    getCustomer() {
        return this.customer;
    }

    setCustomer(customer) {
        this.customer = customer;
    }

    getTotalProducts() {
        var totalProducts = 0;
        for (var i = 0; i < this.listItems.length; i++) {
            totalProducts += this.listItems[i].getQuantity();
        }
        return totalProducts;
    }

    getTotalPrice() {
        var totalPrice = 0;
        for (var i = 0; i < this.listItems.length; i++) {
            totalPrice += this.listItems[i].getQuantity() * this.listItems[i].getItem().getPrice();
        }
        return totalPrice;
    }
}