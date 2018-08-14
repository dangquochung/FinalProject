const dbConfig = require('../DatabaseConfiguration.js');
const publisherClass = require('../../model/publisher/Publisher.js');
const addressDAO = require('../address/AddressDAO.js');

var isSuccessConnected;
var connection = dbConfig.getConnection();
connection.connect(function(err) {
	if (err) {
		isSuccessConnected = false;
		console.log('Connection error');
		throw err;
	}

	publisherTable = dbConfig.getPublisherTable();
	isSuccessConnected = true;
});

exports.getPublisherList = function(callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var query = "SELECT * FROM " + publisherTable.tblName;
	connection.query(query, function(err, result, fields) {
		if (err) {
			console.log('Query error');
			throw err;
		}

		if (result.length <= 0) {
			callBackFunction([]);
			return;
		}

		var publisherList = [];
		var callBackTimes = 0;
		for (var i = 0; i < result.length; i++) {
			var addressId = result[i][publisherTable.fields.addressId];
			var id = result[i][publisherTable.fields.id];
			var name = result[i][publisherTable.fields.name];
			var publisher = new publisherClass.Publisher(id);
			publisher.setName(name);
			publisherList.push(publisher);

			addressDAO.getAddressById(addressId, function(address) {
				publisherList[callBackTimes++].setAddress(address);
				if (callBackTimes == result.length) {
					callBackFunction(publisherList);
				}
			});
		}
	});
}

exports.getPublisherById = function(id, callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var query = "SELECT * FROM " + publisherTable.tblName + " WHERE " + publisherTable.fields.id + " = ?";
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

		var id = result[0][publisherTable.fields.id];
		var name = result[0][publisherTable.fields.name];
		var addressId = result[0][publisherTable.fields.addressId];
		var publisher = new publisherClass.Publisher(id);
		publisher.setName(name);

		addressDAO.getAddressById(addressId, function(address) {
			publisher.setAddress(address);
			callBackFunction(publisher);
		});
	});
}