class Publisher {
	constructor(id) {
		this.id = id;
	}

	getId() {
		return this.id;
	}

	getName() {
		return this.name;
	}

	setName(name) {
		this.name = name;
	}

	getAddress() {
		return this.address;
	}

	setAddress(address) {
		this.address = address;
	}
}
exports.Publisher = Publisher;