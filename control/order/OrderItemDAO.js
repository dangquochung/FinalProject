const dbConfig = require('../DatabaseConfiguration.js');
const orderItemClass = require('../../model/order/OrderItem.js');

var isSuccessConnected;
var connection = dbConfig.getConnection();
connection.connect(function(err) {
	if (err) {
		isSuccessConnected = false;
		console.log('Connection error');
		throw err;
	}

    orderItemTable = dbConfig.getOrderItemTable();
	isSuccessConnected = true;
});

exports.addOrderItems = function(order, callBackFunction) {
    if (!isSuccessConnected) {
		console.log('Connection error');
		return;
    }
    
    var callBackTimes = 0;
    for (var i = 0; i < order.getCart().getListItems().length; i++) {
        var orderItem = order.getCart().getListItems()[i];

        var query = "INSERT INTO " + orderItemTable.tblName + "(" + orderItemTable.fields.order_id + ", " + orderItemTable.fields.book_id + ", " + orderItemTable.fields.quantity + ")"
                  + " VALUES " + "(?, ?, ?)";
        var preparedStatement = [order.getId(), orderItem.getItem().getId(), orderItem.getQuantity()];
        connection.query(query, preparedStatement, function(err, result, fields) {
            callBackTimes++;

            if (err) {
                console.log('Query error');
                throw err;
            }
            
            if (callBackTimes == order.getCart().getListItems().length) {
                callBackFunction();
            }
        });
    }
}