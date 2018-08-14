class Account {
	constructor(id) {
		this.id = id;
	}

	setId(id) {
		this.id = id;
	}

	getId() {
		return this.id;
	}

	getEmail() {
		return this.email;
	}

	setEmail(email) {
		this.email = email;
	}

	getAccount() {
		return this.account;
	}

	setAccount(account) {
		this.account = account;
	}

	getPassword() {
		return this.password;
	}

	setPassword(password) {
		this.password = password;
	}

	getIcon() {
		return this.icon;
	}

	setIcon(icon) {
		this.icon = icon;
	}
}
exports.Account = Account;

class CustomerAccount extends Account {
	constructor(id) {
		super(id);
	}

	getAccountType() {
		return this.accountType;
	}

	setAccountType(accountType) {
		this.accountType = accountType;
	}

	getPoint() {
		return this.point;
	}

	setPoint(point) {
		this.point = point;
	}
}
exports.CustomerAccount = CustomerAccount;