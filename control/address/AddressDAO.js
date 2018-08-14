const dbConfig = require('../DatabaseConfiguration.js');
const addressClass = require('../../model/address/Address.js');

var isSuccessConnected;
var connection = dbConfig.getConnection();
connection.connect(function(err) {
	if (err) {
		isSuccessConnected = false;
		console.log('Connection error');
		throw err;
	}

	addressTable = dbConfig.getAddressTable();
	isSuccessConnected = true;
});

exports.getAddressList = function(callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var query = "SELECT * FROM " + addressTable.tblName;
	connection.query(query, function(err, result, fields) {
		if (err) {
			console.log('Query error');
			throw err;
		}

		if (result.length <= 0) {
			callBackFunction([]);
			return;
		}

		var returnObject = [];
		for (var i = 0; i < result.length; i++) {
			var id = result[i][addressTable.fields.id];
			var province = result[i][addressTable.fields.province];
			var city = result[i][addressTable.fields.city];
			var street = result[i][addressTable.fields.street];
			var homeIndex = result[i][addressTable.fields.homeIndex];
			var desc = result[i][addressTable.fields.desc];

			var address = new addressClass.Address(id, province, city, street, homeIndex, desc);
			returnObject.push(address);
		}
		callBackFunction(returnObject);
	});
}

exports.getAddressById = function(id, callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var query = "SELECT * FROM " + addressTable.tblName + " WHERE " + addressTable.fields.id + " = ?";
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

		var id = result[0][addressTable.fields.id];
		var province = result[0][addressTable.fields.province];
		var city = result[0][addressTable.fields.city];
		var street = result[0][addressTable.fields.street];
		var homeIndex = result[0][addressTable.fields.homeIndex];
		var desc = result[0][addressTable.fields.desc];

		var address = new addressClass.Address(id, province, city, street, homeIndex, desc);
		callBackFunction(address);
	});
}

exports.addAddress = function(address, callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var query = "INSERT INTO " + addressTable.tblName + "(" + addressTable.fields.province + ", " + addressTable.fields.city + ", " + addressTable.fields.street + ", " + addressTable.fields.homeIndex + ", " + addressTable.fields.desc + ")"
			  + " VALUES (?, ?, ?, ?, ?)";
	var preparedStatement = [address.getProvince(), address.getCity(), address.getStreet(), address.getHomeIndex(), address.getDescription()];
	connection.query(query, preparedStatement, function(err, result, fields) {
		if (err) {
			console.log('Query error');
			throw err;
		}

		address.setId(result.insertId);
		callBackFunction();
	});
}

exports.updateAddress = function(address, callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var query = "UPDATE " + addressTable.tblName
			  + " SET " + addressTable.fields.province + " = ?, " + addressTable.fields.city + " = ?, " + addressTable.fields.street + " = ?, " + addressTable.fields.homeIndex + " = ?, " + addressTable.fields.desc + " = ?"
			  + " WHERE " + addressTable.fields.id + " = ?";
	var preparedStatement = [address.getProvince(), address.getCity(), address.getStreet(), address.getHomeIndex(), address.getDescription(), address.getId()];
	connection.query(query, preparedStatement, function(err, result, fields) {
		if (err) {
			console.log('Query error');
			throw err;
		}

		callBackFunction();
	});
}