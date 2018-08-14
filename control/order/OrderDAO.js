const dbConfig = require('../DatabaseConfiguration.js');
const orderClass = require('../../model/order/Order.js');
const orderItemDAO = require('./OrderItemDAO.js');
const paymentMethodDAO = require('./PaymentMethodDAO.js');

var isSuccessConnected;
var connection = dbConfig.getConnection();
connection.connect(function(err) {
	if (err) {
		isSuccessConnected = false;
		console.log('Connection error');
		throw err;
	}

    orderTable = dbConfig.getOrderTable();
	isSuccessConnected = true;
});

exports.addOrder = function(order, callBackFunction) {
    if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

    var query = "INSERT INTO " + orderTable.tblName + "(" + orderTable.fields.date + ", " + orderTable.fields.status + ")"
              + " VALUES " + "(?, ?)";
    var preparedStatement = [order.getDate(), order.getStatus()];
    connection.query(query, preparedStatement, function(err, result, fields) {
        if (err) {
			console.log('Query error');
			throw err;
		}

		order.setId(result.insertId);

		var callBackTimes = 0;
		orderItemDAO.addOrderItems(order, function() {
			callBackTimes++;
			if (callBackTimes == 2) {
				callBackFunction();
			}
		});
		paymentMethodDAO.addPaymentMethod(order, function() {
			callBackTimes++;
			if (callBackTimes == 2) {
				callBackFunction();
			}
		});
    });
}