exports.Bank = class Bank {
    constructor(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getIcon() {
        return this.icon;
    }

    setIcon(icon) {
        this.icon = icon;
    }

    getLink() {
        return this.link;
    }

    setLink(link) {
        this.link = link;
    }
}