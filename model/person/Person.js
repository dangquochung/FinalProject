var dateFormat = require('dateformat');

class Person {
	constructor(id) {
		this.id = id;
	}

	setId(id) {
		this.id = id;
	}

	getId() {
		return this.id;
	}

	getFullName() {
		return this.fullName;
	}

	setFullName(fullName) {
		this.fullName = fullName;
	}

	getGender() {
		return this.gender;
	}

	setGender(gender) {
		this.gender = gender;
	}

	getAddress() {
		return this.address;
	}

	setAddress(address) {
		this.address = address;
	}

	getDoB() {
		return dateFormat(this.doB, "yyyy-mm-dd");
	}

	setDoB(doB) {
		this.doB = dateFormat(doB, "yyyy-mm-dd");
	}

	getDescription() {
		return this.desc;
	}

	setDescription(desc) {
		this.desc = desc;
	}

	getAvarta() {
		return this.avarta;
	}

	setAvarta(avarta) {
		this.avarta = avarta;
	}

	getPhoneNumber() {
		return this.phoneNumber;
	}

	setPhoneNumber(phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
}
exports.Person = Person;

class Author extends Person {
	constructor(id) {
		super(id);
	}

	getMajor() {
		return this.major;
	}

	setMajor(major) {
		this.major = major;
	}
}
exports.Author = Author;

class Staff extends Person {
	constructor(id) {
		super(id);
	}

	getType() {
		return this.type;
	}

	setType(type) {
		this.type = type;
	}

	getAccount() {
		return this.account;
	}

	setAccount(account) {
		this.account = account;
	}

	getSalary() {
		return this.salary;
	}

	setSalary(salary) {
		this.salary = salary;
	}

	getWorkGroup() {
		this.workGroup = workGroup;
	}

	setWorkGroup(workGroup) {
		this.workGroup = workGroup;
	}
}
exports.Staff = Staff;

class Customer extends Person {
	constructor(id) {
		super(id);
	}
	
	getAccount() {
		return this.account;
	}

	setAccount(account) {
		this.account = account;
	}
}
exports.Customer = Customer;