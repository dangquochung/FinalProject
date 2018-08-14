const dbConfig = require('../DatabaseConfiguration.js');
const bankClass = require('../../model/bank/Bank.js');

var isSuccessConnected;
var connection = dbConfig.getConnection();
connection.connect(function(err) {
	if (err) {
		isSuccessConnected = false;
		console.log('Connection error');
		throw err;
	}

    bankTable = dbConfig.getBankTable();
	isSuccessConnected = true;
});

exports.getBankList = function(callBackFunction) {
    if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var query = "SELECT * FROM " + bankTable.tblName;
    connection.query(query, function(err, result, fields) {
        if (err) {
			console.log('Query error');
			throw err;
		}

		if (result.length <= 0) {
			callBackFunction([]);
			return;
        }
        
        var bankList = [];
        for (var i = 0; i < result.length; i++) {
            var id = result[i][bankTable.fields.id];
            var name = result[i][bankTable.fields.name];
            var icon = result[i][bankTable.fields.icon];
            var link = result[i][bankTable.fields.link];

            var bank = new bankClass.Bank(id);
            bank.setName(name);
            bank.setIcon(icon);
            bank.setLink(link);
            bankList.push(bank);
        }
        callBackFunction(bankList);
    });
}

exports.addBank = function(bank, callBackFunction) {
    if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var query = "INSERT INTO " + bankTable.tblName + "(" + bankTable.fields.name + ", " + bankTable.fields.icon + ", " + bankTable.fields.link + ")"
              + " VALUES (?, ?, ?)";
    var preparedStatement = [bank.getName(), bank.getIcon(), bank.getLink()];
    connection.query(query, preparedStatement, function(err, result, fields) {
        if (err) {
			console.log('Query error');
			throw err;
        }

        callBackFunction();
    });
}