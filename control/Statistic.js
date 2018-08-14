const dbConfig = require('./DatabaseConfiguration.js');
const orderDAO = require('./order/OrderDAO.js');
const personDAO = require('./person/PersonDAO.js');
const publisherDAO = require('./publisher/PublisherDAO.js');
const ReturnConstant = require('./ReturnConstant.js');
const bookClass = require('../model/book/Book.js');

var isSuccessConnected;
var connection = dbConfig.getConnection();
connection.connect(function(err) {
	if (err) {
		isSuccessConnected = false;
		console.log('Connection error');
		throw err;
	}

    bookTable = dbConfig.getBookTable();
	orderItemTable = dbConfig.getOrderItemTable();
    orderTable = dbConfig.getOrderTable();
    
    importBookTable = dbConfig.getImportBookTable();

	isSuccessConnected = true;
});

exports.getBestSellBooks = function(callBackFunction) {
    if (!isSuccessConnected) {
		console.log('Connection error');
		return;
    }
    
    var query = "SELECT " + "OrderedBook" + "." + "*" + ", " + orderTable.tblName + "." + orderTable.fields.date + ", " + "SUM(" + "OrderedBook" + "." + orderItemTable.fields.quantity + ")"
              + " FROM ("
              +             "SELECT " + bookTable.tblName + "." + "*" + ", " + orderItemTable.tblName + "." + orderItemTable.fields.order_id + ", " + orderItemTable.tblName + "." + orderItemTable.fields.quantity + " FROM " + bookTable.tblName
              +             " INNER JOIN " + orderItemTable.tblName
              +             " ON " + bookTable.tblName + "." + bookTable.fields.id + " = " + orderItemTable.tblName + "." + orderItemTable.fields.book_id
              +        ") AS " + "OrderedBook"
              + " INNER JOIN " + orderTable.tblName
              + " ON " + "OrderedBook" + "." + orderItemTable.fields.order_id + " = " + orderTable.tblName + "." + orderTable.fields.id
              + " WHERE " + orderTable.tblName + "." + orderTable.fields.status + " = " + ReturnConstant.ORDER_SUCCESS
              + " GROUP BY " + "OrderedBook" + "." + bookTable.fields.id
              + " ORDER BY " + "OrderedBook" + "." + orderItemTable.fields.quantity + " DESC";
    
    var listBook = [];
    connection.query(query, function(err, result, fields) {
        if (err) {
			console.log('Query error');
			throw err;
        }

        if (result.length <= 0) {
            callBackFunction([]);
            return;
		}

        var callBackTimes_1 = 0;
        var callBackTimes_2 = 0;
        var callBackTimes_3 = 0;
        
        for (var i = 0; i < result.length; i++) {
            var id = result[i][bookTable.fields.id];
			var name = result[i][bookTable.fields.name];
			var authorId = result[i][bookTable.fields.authorId];
			var publisherId = result[i][bookTable.fields.publisherId];
			var desc = result[i][bookTable.fields.desc];
			var price = result[i][bookTable.fields.price];
			var icon = result[i][bookTable.fields.icon];
			var publishDate = result[i][bookTable.fields.publishDate];
            var book = new bookClass.Book(id);
            book.setName(name);
            book.setDescription(desc);
            book.setPrice(price);
            book.setIcon(icon);
            book.setPublishDate(publishDate);
            listBook.push(book);

            //Get quantity
            getBookQuantity(book, function(total) {
                listBook[callBackTimes_3++].setQuantity(total);
                if (callBackTimes_1 == callBackTimes_2 && callBackTimes_2 == callBackTimes_3 && callBackTimes_3 == result.length) {
                    callBackFunction(listBook);
                }
            });
            //End
            
            //Get author
			personDAO.getAuthorById(authorId, function(author) {
				listBook[callBackTimes_1++].setAuthor(author);
				if (callBackTimes_1 == callBackTimes_2 && callBackTimes_2 == callBackTimes_3 && callBackTimes_3 == result.length) {
					callBackFunction(listBook);
				}
			});
			//End

			//Get publisher
			publisherDAO.getPublisherById(publisherId, function(publisher) {
				listBook[callBackTimes_2++].setPublisher(publisher);
				if (callBackTimes_1 == callBackTimes_2 && callBackTimes_2 == callBackTimes_3 && callBackTimes_3 == result.length) {
					callBackFunction(listBook);
				}
			});
			//End
        }
        
    });
}

function getBookQuantity(book, callBackFunction) {
    if (!isSuccessConnected) {
		console.log('Connection error');
		return;
    }

    var query = "SELECT (imported - exported) AS total"
              + " FROM " + "(SELECT " + "ExportedBook" + "." + bookTable.fields.id + ", " + importBookTable.tblName + "." + importBookTable.fields.quantity + " AS imported" + ", " + "ExportedBook.numb AS exported"
              +            " FROM " + "(SELECT OrderedBook" + "." + "*" + ", " + "SUM(" + "OrderedBook" + "." + orderItemTable.fields.quantity + ") AS numb"
              +                       " FROM (SELECT " + bookTable.tblName + "." + "*" + ", " + orderItemTable.tblName + "." + orderItemTable.fields.order_id + ", " + orderItemTable.tblName + "." + orderItemTable.fields.quantity
              +                             " FROM " + bookTable.tblName
              +                             " INNER JOIN " + orderItemTable.tblName
              +                             " ON " + bookTable.tblName + "." + bookTable.fields.id + " = " + orderItemTable.tblName + "." + orderItemTable.fields.book_id
              +                             ") AS OrderedBook"
              +                       " INNER JOIN " + orderTable.tblName
              +                       " ON " + "OrderedBook" + "." + orderItemTable.fields.order_id + " = " + orderTable.tblName + "." + orderTable.fields.id
              +                       " WHERE " + orderTable.tblName + "." + orderTable.fields.status + " = " + ReturnConstant.ORDER_SUCCESS
              +                       " GROUP BY " + "OrderedBook" + "." + bookTable.fields.id
              +                       ") AS ExportedBook"
              +             " INNER JOIN " + importBookTable.tblName
              +             " ON " + importBookTable.tblName + "." + importBookTable.fields.book_id + " = " + "ExportedBook" + "." + bookTable.fields.id
              +             ") AS BookQuantity"
              + " WHERE " + "BookQuantity" + "." + bookTable.fields.id + " = ?";
    var preparedStatement = [book.getId()];
    connection.query(query, preparedStatement, function(err, result, fields) {
        if (err) {
            console.log('Query error');
            throw err;
        }

        if (result.length <= 0 || typeof(result[0]) == "undefined") {
            callBackFunction(0);
            return;
        }
        callBackFunction(result[0].total);
    });
}
exports.getBookQuantity = getBookQuantity;