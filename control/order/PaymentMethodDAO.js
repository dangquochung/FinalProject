const dbConfig = require('../DatabaseConfiguration.js');
const paymentMethodClass = require('../../model/order/PaymentMethod.js');

var isSuccessConnected;
var connection = dbConfig.getConnection();
connection.connect(function(err) {
	if (err) {
		isSuccessConnected = false;
		console.log('Connection error');
		throw err;
	}

    paymentMethodTable = dbConfig.getPaymentMethodTable();
	isSuccessConnected = true;
});

exports.addPaymentMethod = function(order, callBackFunction) {
    if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var paymentMethod = order.getPaymentMethod();

    var query = "INSERT INTO " + paymentMethodTable.tblName + "(" + paymentMethodTable.fields.order_id + ", " + paymentMethodTable.fields.status + ")"
              + " VALUES " + "(?, ?)";
    var preparedStatement = [order.getId(), paymentMethod.getStatus()];
    connection.query(query, preparedStatement, function(err, result, fields) {
        if (err) {
			console.log('Query error');
			throw err;
		}
        callBackFunction();
    });
}