const dbConfig = require('../DatabaseConfiguration.js');
const accountClass = require('../../model/person/Account.js');

var isSuccessConnected;
var connection = dbConfig.getConnection();
connection.connect(function(err) {
	if (err) {
		isSuccessConnected = false;
		console.log('Connection error');
		throw err;
	}

	accountTable = dbConfig.getAccountTable();
	customerAccountTable = dbConfig.getCustomerAccountTable();
	isSuccessConnected = true;
});

exports.getCustomerAccountList = function(callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var query = "SELECT * FROM " + accountTable.tblName + ", " + customerAccountTable.tblName + " WHERE " + accountTable.fields.id + " = " + customerAccountTable.fields.account_id;
	connection.query(query, function(err, result, fields) {
		if (err) {
			console.log('Query error');
			throw err;
		}

		if (result.length <= 0) {
			callBackFunction([]);
			return;
		}

		var listAccount = [];
		for (var i = 0; i < result.length; i++) {
			var id = result[i][accountTable.fields.id];
			var email = result[i][accountTable.fields.email];
			var account = result[i][accountTable.fields.account];
			var password = result[i][accountTable.fields.password];
			var icon = result[i][accountTable.fields.icon];
			var type = result[i][customerAccountTable.fields.type];
			var point = result[i][customerAccountTable.fields.point];

			var customerAccount = new accountClass.CustomerAccount(id);
			customerAccount.setEmail(email);
			customerAccount.setAccount(account);
			customerAccount.setPassword(password);
			customerAccount.setIcon(icon);
			customerAccount.setType(type);
			customerAccount.setPoint(point);

			listAccount.push(customerAccount);
		}

		callBackFunction(listAccount);
	});
}

exports.getCustomerAccountById = function(id, callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var query = "SELECT * FROM " + accountTable.tblName + ", " + customerAccountTable.tblName + " WHERE " + accountTable.fields.id + " = " + customerAccountTable.fields.account_id + " AND " + accountTable.fields.id + " = ?";
	var preparedStatement = [id];
	connection.query(query, preparedStatement, function(err, result, fields) {
		if (err) {
			console.log('Query error');
			throw err;
		}

		if (result.length <= 0) {
			callBackFunction([]);
			return;
		}

		var id = result[0][accountTable.fields.id];
		var email = result[0][accountTable.fields.email];
		var account = result[0][accountTable.fields.account];
		var password = result[0][accountTable.fields.password];
		var icon = result[0][accountTable.fields.icon];
		var type = result[0][customerAccountTable.fields.type];
		var point = result[0][customerAccountTable.fields.point];

		var customerAccount = new accountClass.CustomerAccount(id);
		customerAccount.setEmail(email);
		customerAccount.setAccount(account);
		customerAccount.setPassword(password);
		customerAccount.setIcon(icon);
		customerAccount.setAccountType(type);
		customerAccount.setPoint(point);

		callBackFunction(customerAccount);
	});
}

function addAccount(account, callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var query = "INSERT INTO " + accountTable.tblName + "(" + accountTable.fields.account + ", " + accountTable.fields.password + ", " + accountTable.fields.email + ", " + accountTable.fields.icon + ")" 
			  + " VALUES " + "(?, ?, ?, ?, ?)";
	var preparedStatement = [account.getAccount(), account.getPassword(), account.getEmail(), account.getIcon()];
	connection.query(query, preparedStatement, function(err, result, fields) {
		if (err) {
			console.log('Query error');
			throw err;
		}

		account.setId(result.insertId);
		callBackFunction();
	});
}

function updateAccount(account, callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var query = "UPDATE " + accountTable.tblName
			  + " SET " + accountTable.fields.account + " = ?, " + accountTable.fields.password + " = ?, " + accountTable.fields.email + " = ?, " + accountTable.fields.icon + " = ?"
			  + " WHERE " + accountTable.fields.id + " =?";
	var preparedStatement = [account.getAccount(), account.getPassword(), account.getEmail(), account.getIcon(), account.getId()];
	connection.query(query, preparedStatement, function(err, result, fields) {
		if (err) {
			console.log('Query error');
			throw err;
		}

		callBackFunction();
	});
}

exports.addCustomerAccount = function(customerAccount, callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	addAccount(customerAccount, function(){
		var query = "INSERT INTO " + customerAccountTable.tblName + "(" + customerAccountTable.fields.account_id + ", " + customerAccountTable.fields.type + ", " + customerAccountTable.fields.point + ")" 
				  + " VALUES " + "(?, ?, ?)";
		var preparedStatement = [customerAccount.getId(), customerAccount.getAccountType(), customerAccount.getPoint()];
		connection.query(query, preparedStatement, function(err, result, fields) {
			if (err) {
				console.log('Query error');
				throw err;
			}

			callBackFunction();
		});
	});
}

exports.updateCustomerAccount = function(customerAccount, callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	updateAccount(customerAccount, function() {
		var query = "UPDATE " + customerAccountTable.tblName
				  + " SET " + customerAccountTable.fields.type + " = ?, " + customerAccountTable.fields.point + " = ?"
				  + " WHERE " + customerAccountTable.fields.account_id + " = ?";
		var preparedStatement = [customerAccount.getAccountType(), customerAccount.getPoint(), customerAccount.getId()];
		connection.query(query, preparedStatement, function(err, result, fields) {
			if (err) {
				console.log('Query error');
				throw err;
			}
			
			callBackFunction();
		});
	});
}

exports.getCustomerAccountByUsernameAndPassword = function(account, password, callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var query = "SELECT * FROM " + accountTable.tblName + ", " + customerAccountTable.tblName + " WHERE " + accountTable.fields.id + " = " + customerAccountTable.fields.account_id + " AND " + accountTable.fields.account + " = ?" + " AND " + accountTable.fields.password + " = ?";
	var preparedStatement = [account, password];
	connection.query(query, preparedStatement, function(err, result, fields) {
		if (err) {
			console.log('Query error');
			throw err;
		}

		if (result.length <= 0) {
			callBackFunction(null);
			return;
		}

		var id = result[0][accountTable.fields.id];
		var email = result[0][accountTable.fields.email];
		var account = result[0][accountTable.fields.account];
		var password = result[0][accountTable.fields.password];
		var icon = result[0][accountTable.fields.icon]
		var type = result[0][customerAccountTable.fields.type];
		var point = result[0][customerAccountTable.fields.point];

		var customerAccount = new accountClass.CustomerAccount(id);
		customerAccount.setEmail(email);
		customerAccount.setAccount(account);
		customerAccount.setPassword(password);
		customerAccount.setIcon(icon);
		customerAccount.setAccountType(type);
		customerAccount.setPoint(point);

		callBackFunction(customerAccount);
	});
}