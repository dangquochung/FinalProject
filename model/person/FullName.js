class FullName {
	constructor(firstName, midName, lastName) {
		this.firstName = firstName;
		this.midName = midName;
		this.lastName = lastName;
	}

	getFirstName() {
		return this.firstName;
	}

	setFirstName(firstName) {
		this.firstName = firstName;
	}

	getMidName() {
		return this.midName;
	}

	setMidName(midName) {
		this.midName = midName;
	}

	getLastName() {
		return this.lastName;
	}

	setLastName(lastName) {
		this.lastName = lastName;
	}

	toString() {
		var str = this.firstName + ' ' + this.midName + ' ' + this.lastName;
		str = str.replace(new RegExp('  ', 'g'), ' ').trim();
		return str;
	}
}
exports.FullName = FullName