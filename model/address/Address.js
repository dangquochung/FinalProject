class Address {
	constructor(id, province, city, street, homeIndex, zipCode, desc) {
		this.id = id;
		this.province = province;
		this.city = city;
		this.street = street;
		this.homeIndex = homeIndex;
		this.zipCode = zipCode;
		this.desc = desc;
	}

	setId(id) {
		this.id = id;
	}

	getId() {
		return this.id;
	}

	getProvince() {
		return this.province;
	}

	setProvince(province) {
		this.province = province;
	}

	getCity() {
		return this.city;
	}

	setCity(city) {
		this.city = city;
	}

	getStreet() {
		return this.street;
	}

	setStreet(street) {
		this.street = street;
	}

	getHomeIndex() {
		return this.homeIndex;
	}

	setHomeIndex(homeIndex) {
		this.homeIndex = homeIndex;
	}

	getZipCode() {
		return this.zipCode;
	}

	setZipCode(zipCode) {
		this.zipCode = zipCode;
	}

	getDescription() {
		return this.desc;
	}

	setDescription(desc) {
		this.desc = desc;
	}
}
exports.Address = Address;