const dbConfig = require('../DatabaseConfiguration.js');
const personClass = require('../../model/person/Person.js');
const fullNameClass = require('../../model/person/FullName.js');
const addressDAO = require('../address/AddressDAO.js');
const accountDAO = require('./AccountDAO.js');
const returnConstant = require('../ReturnConstant.js');

var isSuccessConnected;
var connection = dbConfig.getConnection();
connection.connect(function(err) {
	if (err) {
		isSuccessConnected = false;
		console.log('Connection error');
		throw err;
	}

	personTable = dbConfig.getPersonTable();
	authorTable = dbConfig.getAuthorTable();
	customerTable = dbConfig.getCustomerTable();
	accountTable = dbConfig.getAccountTable();
	isSuccessConnected = true;
});

exports.getAuthorList = function(callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var query = "SELECT * FROM " + authorTable.tblName + ", " + personTable.tblName;
	connection.query(query, function(err, result, fields) {
		if (err) {
			console.log('Query error');
			throw err;
		}

		if (result.length <= 0) {
			callBackFunction([]);
			return;
		}

		var listAuthor = [];
		var callBackTimes = 0;
		for (var i = 0; i < result.length; i++) {
			var id = result[i][personTable.fields.id];
			var name = result[i][personTable.fields.name];
			var gender = result[i][personTable.fields.gender];
			var addressId = result[i][personTable.fields.addressId];
			var doB = result[i][personTable.fields.doB];
			var desc = result[i][personTable.fields.desc];
			var avarta = result[i][personTable.fields.avarta];
			var phoneNumber = result[i][personTable.fields.phone];
			var major = result[i][authorTable.fields.major];

			var author = new personClass.Author(id);

			var fullName;
			if (name.length <= 0) {
				fullName = new fullNameClass.FullName('', '', '');
			} else {
				var nameSplitted = name.split(' ');
				var firstName = nameSplitted[0];
				if (nameSplitted.length == 1) {
					fullName = new fullNameClass.FullName(firstName, '', '');
				} else if (nameSplitted.length == 2) {
					var lastName = nameSplitted[1];
					fullName = new fullNameClass.FullName(firstName, '', lastName);
				} else {
					var midName = '';
					for (var j = 1; j < nameSplitted.length - 1; j++) {
						midName += nameSplitted[j];
					}
					var lastName = nameSplitted[nameSplitted.length - 1];
					fullName = new fullNameClass.FullName(firstName, midName, lastName);
				}
			}
			author.setFullName(fullName);
			author.setGender(gender);
			author.setDoB(doB);
			author.setDescription(desc);
			author.setMajor(major);
			author.setAvarta(avarta);
			author.setPhoneNumber(phoneNumber);
			listAuthor.push(author);

			addressDAO.getAddressById(addressId, function(address) {
				listAuthor[callBackTimes++].setAddress(address);
				if (callBackTimes == result.length) {
					callBackFunction(listAuthor);
				}
			});
		}
	});
}

exports.getAuthorById = function(id, callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var query = "SELECT * FROM " + authorTable.tblName + ", " + personTable.tblName + " WHERE " + personTable.fields.id + " = " + authorTable.fields.person_id + " AND " + personTable.fields.id + " = ?";
	var preparedStatement = [id];
	connection.query(query, preparedStatement, function(err, result, fields) {
		if (err) {
			console.log('Query error');
			throw err;
		}

		if (result.length <= 0) {
			callBackFunction(null);
			return;
		}

		var id = result[0][personTable.fields.id];
		var name = result[0][personTable.fields.name];
		var gender = result[0][personTable.fields.gender];
		var addressId = result[0][personTable.fields.addressId];
		var doB = result[0][personTable.fields.doB];
		var desc = result[0][personTable.fields.desc];
		var avarta = result[0][personTable.fields.avarta];
		var phoneNumber = result[0][personTable.fields.phone];
		var major = result[0][authorTable.fields.major];
		var author = new personClass.Author(id);

		var fullName;
		if (name.length <= 0) {
			fullName = new fullNameClass.FullName('', '', '');
		} else {
			var nameSplitted = name.split(' ');
			var firstName = nameSplitted[0];
			if (nameSplitted.length == 1) {
				fullName = new fullNameClass.FullName(firstName, '', '');
			} else if (nameSplitted.length == 2) {
				var lastName = nameSplitted[1];
				fullName = new fullNameClass.FullName(firstName, '', lastName);
			} else {
				var midName = '';
				for (var j = 1; j < nameSplitted.length - 1; j++) {
					midName += nameSplitted[j];
				}
				var lastName = nameSplitted[nameSplitted.length - 1];
				fullName = new fullNameClass.FullName(firstName, midName, lastName);
			}
		}
		author.setFullName(fullName);
		author.setGender(gender);
		author.setDoB(doB);
		author.setDescription(desc);
		author.setAvarta(avarta);
		author.setPhoneNumber(phoneNumber);
		author.setMajor(major);

		addressDAO.getAddressById(addressId, function(address) {
			author.setAddress(address);
			callBackFunction(author);
		});
	});
}

exports.getCustomerList = function(callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var query = "SELECT * FROM " + customerTable.tblName + ", " + personTable.tblName;
	connection.query(query, function(err, result, fields) {
		if (err) {
			console.log('Query error');
			throw err;
		}

		if (result.length <= 0) {
			callBackFunction([]);
			return;
		}

		var listCustomer = [];
		var callBackTimes_1 = 0;
		var callBackTimes_2 = 0;
		for (var i = 0; i < result.length; i++) {
			var id = result[i][personTable.fields.id];
			var name = result[i][personTable.fields.name];
			var gender = result[i][personTable.fields.gender];
			var addressId = result[i][personTable.fields.addressId];
			var doB = result[i][personTable.fields.doB];
			var desc = result[i][personTable.fields.desc];
			var avarta = result[i][personTable.fields.avarta];
			var phoneNumber = result[i][personTable.fields.phone];
			var accountId = result[i][personTable.fields.account_id];

			var customer = new personClass.Customer(id);

			var fullName;
			if (name.length <= 0) {
				fullName = new fullNameClass.FullName('', '', '');
			} else {
				var nameSplitted = name.split(' ');
				var firstName = nameSplitted[0];
				if (nameSplitted.length == 1) {
					fullName = new fullNameClass.FullName(firstName, '', '');
				} else if (nameSplitted.length == 2) {
					var lastName = nameSplitted[1];
					fullName = new fullNameClass.FullName(firstName, '', lastName);
				} else {
					var midName = '';
					for (var j = 1; j < nameSplitted.length - 1; j++) {
						midName += nameSplitted[j];
					}
					var lastName = nameSplitted[nameSplitted.length - 1];
					fullName = new fullNameClass.FullName(firstName, midName, lastName);
				}
			}
			customer.setFullName(fullName);
			customer.setGender(gender);
			customer.setDoB(doB);
			customer.setDescription(desc);
			customer.setAvarta(avarta);
			customer.setPhoneNumber(phoneNumber);
			listCustomer.push(customer);

			addressDAO.getAddressById(addressId, function(address) {
				listCustomer[callBackTimes_1++].setAddress(address);
				if (callBackTimes_1 == callBackTimes_2 && callBackTimes_2 == result.length) {
					callBackFunction(listAuthor);
				}
			});

			accountDAO.getCustomerAccountById(accountId, function(account) {
				listCustomer[callBackTimes_2++].setAccount(account);
				if (callBackTimes_1 == callBackTimes_2 && callBackTimes_2 == result.length) {
					callBackFunction(listCustomer);
				}
			});
		}
	});
}

exports.getCustomerById = function(id, callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var query = "SELECT * FROM " + customerTable.tblName + ", " + personTable.tblName + " WHERE " + personTable.fields.id + " = " + customerTable.fields.person_id + " AND " + personTable.fields.id + " = ?";
	var preparedStatement = [id];
	connection.query(query, preparedStatement, function(err, result, fields) {
		if (err) {
			console.log('Query error');
			throw err;
		}

		if (result.length <= 0) {
			callBackFunction(null);
			return;
		}

		var id = result[0][personTable.fields.id];
		var name = result[0][personTable.fields.name];
		var gender = result[0][personTable.fields.gender];
		var addressId = result[0][personTable.fields.addressId];
		var doB = result[0][personTable.fields.doB];
		var desc = result[0][personTable.fields.desc];
		var avarta = result[0][personTable.fields.avarta];
		var phoneNumber = result[0][personTable.fields.phone];
		var account_id = result[0][customerTable.fields.account_id];
		var customer = new personClass.Customer(id);

		var fullName;
		if (name.length <= 0) {
			fullName = new fullNameClass.FullName('', '', '');
		} else {
			var nameSplitted = name.split(' ');
			var firstName = nameSplitted[0];
			if (nameSplitted.length == 1) {
				fullName = new fullNameClass.FullName(firstName, '', '');
			} else if (nameSplitted.length == 2) {
				var lastName = nameSplitted[1];
				fullName = new fullNameClass.FullName(firstName, '', lastName);
			} else {
				var midName = '';
				for (var j = 1; j < nameSplitted.length - 1; j++) {
					midName += nameSplitted[j];
				}
				var lastName = nameSplitted[nameSplitted.length - 1];
				fullName = new fullNameClass.FullName(firstName, midName, lastName);
			}
		}
		customer.setFullName(fullName);
		customer.setGender(gender);
		customer.setDoB(doB);
		customer.setDescription(desc);
		customer.setAvarta(avarta);
		customer.setPhoneNumber(phoneNumber);

		var callBackTimes_1 = 0;
		var callBackTimes_2 = 0;

		addressDAO.getAddressById(addressId, function(address) {
			callBackTimes_1++;
			customer.setAddress(address);
			if (callBackTimes_1 == callBackTimes_2 && callBackTimes_2 == 1) {
				callBackFunction(listAuthor);
			}
		});

		accountDAO.getCustomerAccountById(account_id, function(account) {
			callBackTimes_2++;
			customer.setAccount(account);
			if (callBackTimes_1 == callBackTimes_2 && callBackTimes_2 == 1) {
				callBackFunction(customer);
			}
		});
	});
}

function isCustomerExist(customer, callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var query = "SELECT * FROM " + accountTable.tblName + " WHERE " + accountTable.fields.account + " = ?";
	var preparedStatement = [customer.getAccount().getAccount()];
	connection.query(query, preparedStatement, function(err, result, fields) {
		if (err) {
			console.log('Query error');
			throw err;
		}

		callBackFunction(result);
	});
}

function addPerson(person, callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var query = "INSERT INTO " + personTable.tblName + "(" + personTable.fields.name + ", " + personTable.fields.gender + ", " + personTable.fields.addressId + ", " + personTable.fields.doB + ", " + personTable.fields.desc + ", " + personTable.fields.avarta + ", " + personTable.fields.phone + ")" 
				+ " VALUES " + "(?, ?, ?, ?, ?, ?, ?)";
	var preparedStatement = [person.getFullName().toString(), person.getGender(), person.getAddress().getId(), person.getDoB(), person.getDescription(), person.getAvarta(), person.getPhoneNumber()];
	connection.query(query, preparedStatement, function(err, result, fields) {
		if (err) {
			console.log('Query error');
			throw err;
		}

		person.setId(result.insertId);
		callBackFunction();
	});
}
exports.addPerson = addPerson;

function updatePerson(person, callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	addressDAO.updateAddress(person.getAddress(), function() {
		var query = "UPDATE " + personTable.tblName
			  + " SET " + personTable.fields.name + " = ?, " + personTable.fields.gender + " = ?, " + personTable.fields.addressId + " = ?, " + personTable.fields.doB + " = ?, " + personTable.fields.desc + " = ?, " + personTable.fields.avarta + " = ?, " + personTable.fields.phone + " = ?"
			  + " WHERE " + personTable.fields.id + " = ?";
		var preparedStatement = [person.getFullName().toString(), person.getGender(), person.getAddress().getId(), person.getDoB(), person.getDescription(), person.getAvarta(), person.getPhoneNumber(), person.getId()];
		connection.query(query, preparedStatement, function(err, result, fields) {
			if (err) {
				console.log('Query error');
				throw err;
			}

			callBackFunction();
		});
	});
}

exports.addCustomer = function(customer, callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	isCustomerExist(customer, function(result) {
		if (result.length > 0) {
			callBackFunction(returnConstant.ACCOUNT_IS_ALREADY_EXIST);
			return;
		}

		var callBackTimes_1 = 0;
		var callBackTimes_2 = 0;
		
		accountDAO.addCustomerAccount(customer.getAccount(), function() {
			callBackTimes_1++;
			if (callBackTimes_1 == callBackTimes_2 && callBackTimes_2 == 1) {
				addPerson(customer, function() {
					var query = "INSERT INTO " + customerTable.tblName + "(" + customerTable.fields.account_id + ", " + customerTable.fields.person_id + ")"
							+ " VALUES (?, ?)";
					var preparedStatement = [customer.getAccount().getId(), customer.getId()];
					connection.query(query, preparedStatement, function(err, result, fields) {
						if (err) {
							console.log('Query error');
							throw err;
						}

						callBackFunction(returnConstant.ADD_ACCOUNT_SUCCESS);
					});
				});
			}
		});

		addressDAO.addAddress(customer.getAddress(), function() {
			callBackTimes_2++;
			if (callBackTimes_1 == callBackTimes_2 && callBackTimes_2 == 1) {
				addPerson(customer, function() {
					var query = "INSERT INTO " + customerTable.tblName + "(" + customerTable.fields.account_id + ", " + customerTable.fields.person_id + ")"
							+ " VALUES (?, ?)";
					var preparedStatement = [customer.getAccount().getId(), customer.getId()];
					connection.query(query, preparedStatement, function(err, result, fields) {
						if (err) {
							console.log('Query error');
							throw err;
						}
						
						callBackFunction(returnConstant.ADD_ACCOUNT_SUCCESS);
					});
				});
			}
		});
	});
}

exports.updateCustomer = function(customer, callBackFunction) {
	updatePerson(customer, function() {
		accountDAO.updateCustomerAccount(customer.getAccount(), function() {
			var query = "UPDATE " + customerTable.tblName
					  + " SET " + customerTable.fields.account_id + " = ?"
					  + " WHERE " + customerTable.fields.person_id + " = ?";
			var preparedStatement = [customer.getAccount().getId(), customer.getId()];

			connection.query(query, preparedStatement, function(err, result, fields) {
				if (err) {
					console.log('Query error');
					callBackFunction(returnConstant.EDIT_CUSTOMERINFO_FAILED);
					throw err;
				}
				
				callBackFunction(returnConstant.EDIT_CUSTOMERINFO_SUCCESS);
			});
		});
	});
}

function getCustomerByAccountId(accountId, callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var query = "SELECT * FROM " + customerTable.tblName + ", " + personTable.tblName + " WHERE " + personTable.fields.id + " = " + customerTable.fields.person_id + " AND " + customerTable.fields.account_id + " = ?";
	var preparedStatement = [accountId];
	connection.query(query, preparedStatement, function(err, result, fields) {
		if (err) {
			console.log('Query error');
			throw err;
		}

		if (result.length <= 0) {
			callBackFunction(null);
			return;
		}

		var id = result[0][personTable.fields.id];
		var name = result[0][personTable.fields.name];
		var gender = result[0][personTable.fields.gender];
		var addressId = result[0][personTable.fields.addressId];
		var doB = result[0][personTable.fields.doB];
		var desc = result[0][personTable.fields.desc];
		var avarta = result[0][personTable.fields.avarta];
		var phoneNumber = result[0][personTable.fields.phone];
		var account_id = result[0][customerTable.fields.account_id];
		var customer = new personClass.Customer(id);

		var fullName;
		if (name.length <= 0) {
			fullName = new fullNameClass.FullName('', '', '');
		} else {
			var nameSplitted = name.split(' ');
			var firstName = nameSplitted[0];
			if (nameSplitted.length == 1) {
				fullName = new fullNameClass.FullName(firstName, '', '');
			} else if (nameSplitted.length == 2) {
				var lastName = nameSplitted[1];
				fullName = new fullNameClass.FullName(firstName, '', lastName);
			} else {
				var midName = '';
				for (var j = 1; j < nameSplitted.length - 1; j++) {
					midName += nameSplitted[j];
				}
				var lastName = nameSplitted[nameSplitted.length - 1];
				fullName = new fullNameClass.FullName(firstName, midName, lastName);
			}
		}
		customer.setFullName(fullName);
		customer.setGender(gender);
		customer.setDoB(doB);
		customer.setDescription(desc);
		customer.setAvarta(avarta);
		customer.setPhoneNumber(phoneNumber);

		var callBackTimes_1 = 0;
		var callBackTimes_2 = 0;

		addressDAO.getAddressById(addressId, function(address) {
			callBackTimes_1++;
			customer.setAddress(address);
			if (callBackTimes_1 == callBackTimes_2 && callBackTimes_2 == 1) {
				callBackFunction(customer);
			}
		});

		accountDAO.getCustomerAccountById(account_id, function(account) {
			callBackTimes_2++;
			customer.setAccount(account);
			if (callBackTimes_1 == callBackTimes_2 && callBackTimes_2 == 1) {
				callBackFunction(customer);
			}
		});
	});
}

exports.customerLogin = function(account, password, callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	accountDAO.getCustomerAccountByUsernameAndPassword(account, password, function(customerAccount) {
		if (customerAccount == null) {
			callBackFunction(null);
			return;
		}

		getCustomerByAccountId(customerAccount.getId(), function(customer) {
			callBackFunction(customer);
		});
	});
}