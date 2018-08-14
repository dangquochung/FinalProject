const dbConfig = require('../DatabaseConfiguration.js');
const orderDAO = require('./OrderDAO.js');
const personDAO = require('../person/PersonDAO.js');

var isSuccessConnected;
var connection = dbConfig.getConnection();
connection.connect(function(err) {
	if (err) {
		isSuccessConnected = false;
		console.log('Connection error');
		throw err;
	}

    shippingTable = dbConfig.getShippingTable();
	isSuccessConnected = true;
});

exports.addShipping = function(shipping, callBackFunction) {
    if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

    var query = "INSERT INTO " + shippingTable.tblName + "(" + shippingTable.fields.order_id + ", " + shippingTable.fields.receiver_id + ")"
              + " VALUES " + "(?, ?)";
    var preparedStatement = [shipping.getOrder().getId(), shipping.getReceiver().getId()];
    connection.query(query, preparedStatement, function(err, result, fields) {
        if (err) {
			console.log('Query error');
			throw err;
        }
        shipping.setId(result.insertId);

        var callBackTimes = 0;
        orderDAO.addOrder(shipping.getOrder(), function() {
            callBackTimes++;
            if (callBackTimes == 2) {
                callBackFunction();
            }
        });
        personDAO.addPerson(shipping.getReceiver(), function() {
            callBackTimes++;
            if (callBackTimes == 2) {
                callBackFunction();
            }
        });
    });
}