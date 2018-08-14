const dbConfig = require('../DatabaseConfiguration.js');
const bookClass = require('../../model/book/Book.js');
const personDAO = require('../person/PersonDAO.js');
const publisherDAO = require('../publisher/PublisherDAO.js');
const statistic = require('../Statistic.js');

var isSuccessConnected;
var connection = dbConfig.getConnection();
connection.connect(function(err) {
	if (err) {
		isSuccessConnected = false;
		console.log('Connection error');
		throw err;
	}

	bookTable = dbConfig.getBookTable();
	schoolBookTable = dbConfig.getSchoolBookTable();
	scienceBookTable = dbConfig.getScienceBookTable();
	comicTable = dbConfig.getComicTable();
	novelTable = dbConfig.getNovelTable();
	referenceBookTable = dbConfig.getReferenceBookTable();
	isSuccessConnected = true;
});

exports.getSchoolBookList = function(callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var listBook = [];

	var query = "SELECT * FROM " + schoolBookTable.tblName + ", " + bookTable.tblName + " WHERE " + schoolBookTable.fields.book_id + " = " + bookTable.fields.id;
	connection.query(query, function(err, result, fields) {
		if (err) {
			console.log('Query error');
			throw err;
		}

		if (result.length <= 0) {
			callBackFunction([]);
		}

		var callBackTimes_1 = 0;
		var callBackTimes_2 = 0;
		var callBackTimes_3 = 0;

		//Get result book list
		for (var i = 0; i < result.length; i++) {
			var id = result[i][bookTable.fields.id];
			var name = result[i][bookTable.fields.name];
			var authorId = result[i][bookTable.fields.authorId];
			var publisherId = result[i][bookTable.fields.publisherId];
			var desc = result[i][bookTable.fields.desc];
			var price = result[i][bookTable.fields.price];
			var icon = result[i][bookTable.fields.icon];
			var publishDate = result[i][bookTable.fields.publishDate];
			var grade = result[i][schoolBookTable.fields.grade];
			var subject = result[i][schoolBookTable.fields.subject];
			var type = result[i][schoolBookTable.fields.type];

			var schoolBook = new bookClass.SchoolBook(id);
			schoolBook.setName(name);
			schoolBook.setDescription(desc);
			schoolBook.setPrice(price);
			schoolBook.setIcon(icon);
			schoolBook.setPublishDate(publishDate);
			schoolBook.setGrade(grade);
			schoolBook.setSubject(subject);
			schoolBook.setType(type);
			listBook.push(schoolBook);

			//Get quantity
			statistic.getBookQuantity(schoolBook, function(total) {
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
		//End
	});
}

exports.getSchoolBookListByName = function(name, callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var listBook = [];

	var query = "SELECT * FROM " + schoolBookTable.tblName + ", " + bookTable.tblName + " WHERE " + schoolBookTable.fields.book_id + " = " + bookTable.fields.id + " AND LOWER(" + bookTable.fields.name + ") LIKE ?";
	var preparedStatement = ['%' + name + '%'];
	connection.query(query, preparedStatement, function(err, result, fields) {
		if (err) {
			console.log('Query error');
			throw err;
		}

		if (result.length <= 0) {
			callBackFunction([]);
		}

		var callBackTimes_1 = 0;
		var callBackTimes_2 = 0;
		var callBackTimes_3 = 0;

		//Get result book list
		for (var i = 0; i < result.length; i++) {
			var id = result[i][bookTable.fields.id];
			var name = result[i][bookTable.fields.name];
			var authorId = result[i][bookTable.fields.authorId];
			var publisherId = result[i][bookTable.fields.publisherId];
			var desc = result[i][bookTable.fields.desc];
			var price = result[i][bookTable.fields.price];
			var icon = result[i][bookTable.fields.icon];
			var publishDate = result[i][bookTable.fields.publishDate];
			var grade = result[i][schoolBookTable.fields.grade];
			var subject = result[i][schoolBookTable.fields.subject];
			var type = result[i][schoolBookTable.fields.type];

			var schoolBook = new bookClass.SchoolBook(id);
			schoolBook.setName(name);
			schoolBook.setDescription(desc);
			schoolBook.setPrice(price);
			schoolBook.setIcon(icon);
			schoolBook.setPublishDate(publishDate);
			schoolBook.setGrade(grade);
			schoolBook.setSubject(subject);
			schoolBook.setType(type);
			listBook.push(schoolBook);

			//Get quantity
			statistic.getBookQuantity(schoolBook, function(total) {
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
		//End
	});
}

exports.getSchoolBookById = function(id, callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var query = "SELECT * FROM " + schoolBookTable.tblName + ", " + bookTable.tblName + " WHERE " + schoolBookTable.fields.book_id + " = " + bookTable.fields.id + " AND " + bookTable.fields.id + " = ?";
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

		var callBackTimes_1 = 0;
		var callBackTimes_2 = 0;
		var callBackTimes_3 = 0;

		var id = result[0][bookTable.fields.id];
		var name = result[0][bookTable.fields.name];
		var authorId = result[0][bookTable.fields.authorId];
		var publisherId = result[0][bookTable.fields.publisherId];
		var desc = result[0][bookTable.fields.desc];
		var price = result[0][bookTable.fields.price];
		var icon = result[0][bookTable.fields.icon];
		var publishDate = result[0][bookTable.fields.publishDate];
		var grade = result[0][schoolBookTable.fields.grade];
		var subject = result[0][schoolBookTable.fields.subject];
		var type = result[0][schoolBookTable.fields.type];

		var schoolBook = new bookClass.SchoolBook(id);
		schoolBook.setName(name);
		schoolBook.setDescription(desc);
		schoolBook.setPrice(price);
		schoolBook.setIcon(icon);
		schoolBook.setGrade(grade);
		schoolBook.setPublishDate(publishDate);
		schoolBook.setSubject(subject);
		schoolBook.setType(type);

		//Get quantity
		statistic.getBookQuantity(schoolBook, function(total) {
			callBackTimes_3++;
			schoolBook.setQuantity(total);

			if (callBackTimes_1 == callBackTimes_2 && callBackTimes_2 == callBackTimes_3 && callBackTimes_3 == 1) {
				callBackFunction(schoolBook);
			}
		});
		//End

		personDAO.getAuthorById(authorId, function(author) {
			callBackTimes_1++;
			schoolBook.setAuthor(author);
			if (callBackTimes_1 == callBackTimes_2 && callBackTimes_2 == callBackTimes_3 && callBackTimes_3 == 1) {
				callBackFunction(schoolBook);
			}
		});

		publisherDAO.getPublisherById(publisherId, function(publisher) {
			callBackTimes_2++;
			schoolBook.setPublisher(publisher);
			if (callBackTimes_1 == callBackTimes_2 && callBackTimes_2 == callBackTimes_3 && callBackTimes_3 == 1) {
				callBackFunction(schoolBook);
			}
		});
	});
}

exports.getScienceBookList = function(callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var listBook = [];

	var query = "SELECT * FROM " + scienceBookTable.tblName + ", " + bookTable.tblName + " WHERE " + scienceBookTable.fields.book_id + " = " + bookTable.fields.id;
	connection.query(query, function(err, result, fields) {
		if (err) {
			console.log('Query error');
			throw err;
		}

		if (result.length <= 0) {
			callBackFunction([]);
		}

		var callBackTimes_1 = 0;
		var callBackTimes_2 = 0;
		var callBackTimes_3 = 0;

		//Get result book list
		for (var i = 0; i < result.length; i++) {
			var id = result[i][bookTable.fields.id];
			var name = result[i][bookTable.fields.name];
			var authorId = result[i][bookTable.fields.authorId];
			var publisherId = result[i][bookTable.fields.publisherId];
			var desc = result[i][bookTable.fields.desc];
			var price = result[i][bookTable.fields.price];
			var icon = result[i][bookTable.fields.icon];
			var publishDate = result[i][bookTable.fields.publishDate];
			var major = result[i][scienceBookTable.fields.major];
			var type = result[i][scienceBookTable.fields.type];

			var scienceBook = new bookClass.ScienceBook(id);
			scienceBook.setName(name);
			scienceBook.setDescription(desc);
			scienceBook.setPrice(price);
			scienceBook.setIcon(icon);
			scienceBook.setPublishDate(publishDate);
			scienceBook.setMajor(major);
			scienceBook.setType(type);
			listBook.push(scienceBook);

			//Get quantity
			statistic.getBookQuantity(scienceBook, function(total) {
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
		//End
	});
}

exports.getScienceBookListByName = function(name, callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var listBook = [];

	var query = "SELECT * FROM " + scienceBookTable.tblName + ", " + bookTable.tblName + " WHERE " + scienceBookTable.fields.book_id + " = " + bookTable.fields.id + " AND LOWER(" + bookTable.fields.name + ") LIKE ?";
	var preparedStatement = ['%' + name + '%'];
	connection.query(query, preparedStatement, function(err, result, fields) {
		if (err) {
			console.log('Query error');
			throw err;
		}

		if (result.length <= 0) {
			callBackFunction([]);
		}

		var callBackTimes_1 = 0;
		var callBackTimes_2 = 0;
		var callBackTimes_3 = 0;

		//Get result book list
		for (var i = 0; i < result.length; i++) {
			var id = result[i][bookTable.fields.id];
			var name = result[i][bookTable.fields.name];
			var authorId = result[i][bookTable.fields.authorId];
			var publisherId = result[i][bookTable.fields.publisherId];
			var desc = result[i][bookTable.fields.desc];
			var price = result[i][bookTable.fields.price];
			var icon = result[i][bookTable.fields.icon];
			var publishDate = result[i][bookTable.fields.publishDate];
			var major = result[i][scienceBookTable.fields.major];
			var type = result[i][scienceBookTable.fields.type];

			var scienceBook = new bookClass.ScienceBook(id);
			scienceBook.setName(name);
			scienceBook.setDescription(desc);
			scienceBook.setPrice(price);
			scienceBook.setIcon(icon);
			scienceBook.setPublishDate(publishDate);
			scienceBook.setMajor(major);
			scienceBook.setType(type);
			listBook.push(scienceBook);

			//Get quantity
			statistic.getBookQuantity(scienceBook, function(total) {
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
		//End
	});
}

exports.getScienceBookById = function(id, callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var query = "SELECT * FROM " + scienceBookTable.tblName + ", " + bookTable.tblName + " WHERE " + scienceBookTable.fields.book_id + " = " + bookTable.fields.id + " AND " + bookTable.fields.id + " = ?";
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

		var callBackTimes_1 = 0;
		var callBackTimes_2 = 0;
		var callBackTimes_3 = 0;

		var id = result[0][bookTable.fields.id];
		var name = result[0][bookTable.fields.name];
		var authorId = result[0][bookTable.fields.authorId];
		var publisherId = result[0][bookTable.fields.publisherId];
		var desc = result[0][bookTable.fields.desc];
		var price = result[0][bookTable.fields.price];
		var icon = result[0][bookTable.fields.icon];
		var publishDate = result[0][bookTable.fields.publishDate];
		var major = result[0][scienceBookTable.fields.major];
		var type = result[0][scienceBookTable.fields.type];

		var scienceBook = new bookClass.ScienceBook(id);
		scienceBook.setName(name);
		scienceBook.setDescription(desc);
		scienceBook.setPrice(price);
		scienceBook.setIcon(icon);
		scienceBook.setPublishDate(publishDate);
		scienceBook.setMajor(major);
		scienceBook.setType(type);

		//Get quantity
		statistic.getBookQuantity(scienceBook, function(total) {
			callBackTimes_3++;
			scienceBook.setQuantity(total);

			if (callBackTimes_1 == callBackTimes_2 && callBackTimes_2 == callBackTimes_3 && callBackTimes_3 == result.length) {
				callBackFunction(scienceBook);
			}
		});
		//End

		personDAO.getAuthorById(authorId, function(author) {
			callBackTimes_1++;
			scienceBook.setAuthor(author);
			if (callBackTimes_1 == callBackTimes_2 && callBackTimes_2 == callBackTimes_3 && callBackTimes_3 == 1) {
				callBackFunction(scienceBook);
			}
		});

		publisherDAO.getPublisherById(publisherId, function(publisher) {
			callBackTimes_2++;
			scienceBook.setPublisher(publisher);
			if (callBackTimes_1 == callBackTimes_2 && callBackTimes_2 == callBackTimes_3 && callBackTimes_3 == 1) {
				callBackFunction(scienceBook);
			}
		});
	});
}

exports.getComicList = function(callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var listBook = [];

	var query = "SELECT * FROM " + comicTable.tblName + ", " + bookTable.tblName + " WHERE " + comicTable.fields.book_id + " = " + bookTable.fields.id;
	connection.query(query, function(err, result, fields) {
		if (err) {
			console.log('Query error');
			throw err;
		}

		if (result.length <= 0) {
			callBackFunction([]);
		}

		var callBackTimes_1 = 0;
		var callBackTimes_2 = 0;
		var callBackTimes_3 = 0;

		//Get result book list
		for (var i = 0; i < result.length; i++) {
			var id = result[i][bookTable.fields.id];
			var name = result[i][bookTable.fields.name];
			var authorId = result[i][bookTable.fields.authorId];
			var publisherId = result[i][bookTable.fields.publisherId];
			var desc = result[i][bookTable.fields.desc];
			var price = result[i][bookTable.fields.price];
			var icon = result[i][bookTable.fields.icon];
			var publishDate = result[i][bookTable.fields.publishDate];
			var age = result[i][comicTable.fields.age];
			var type = result[i][comicTable.fields.type];

			var comic = new bookClass.Comic(id);
			comic.setName(name);
			comic.setDescription(desc);
			comic.setPrice(price);
			comic.setIcon(icon);
			comic.setPublishDate(publishDate);
			comic.setAge(age);
			comic.setType(type);
			listBook.push(comic);

			//Get quantity
			statistic.getBookQuantity(comic, function(total) {
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
		//End
	});
}

exports.getComicListByName = function(name, callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var listBook = [];

	var query = "SELECT * FROM " + comicTable.tblName + ", " + bookTable.tblName + " WHERE " + comicTable.fields.book_id + " = " + bookTable.fields.id + " AND LOWER(" + bookTable.fields.name + ") LIKE ?";
	var preparedStatement = ['%' + name + '%'];
	connection.query(query, preparedStatement, function(err, result, fields) {
		if (err) {
			console.log('Query error');
			throw err;
		}

		if (result.length <= 0) {
			callBackFunction([]);
		}

		var callBackTimes_1 = 0;
		var callBackTimes_2 = 0;
		var callBackTimes_3 = 0;

		//Get result book list
		for (var i = 0; i < result.length; i++) {
			var id = result[i][bookTable.fields.id];
			var name = result[i][bookTable.fields.name];
			var authorId = result[i][bookTable.fields.authorId];
			var publisherId = result[i][bookTable.fields.publisherId];
			var desc = result[i][bookTable.fields.desc];
			var price = result[i][bookTable.fields.price];
			var icon = result[i][bookTable.fields.icon];
			var publishDate = result[i][bookTable.fields.publishDate];
			var age = result[i][comicTable.fields.age];
			var type = result[i][comicTable.fields.type];

			var comic = new bookClass.Comic(id);
			comic.setName(name);
			comic.setDescription(desc);
			comic.setPrice(price);
			comic.setIcon(icon);
			comic.setPublishDate(publishDate);
			comic.setAge(age);
			comic.setType(type);
			listBook.push(comic);

			//Get quantity
			statistic.getBookQuantity(comic, function(total) {
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
		//End
	});
}

exports.getComicById = function(id, callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var query = "SELECT * FROM " + comicTable.tblName + ", " + bookTable.tblName + " WHERE " + comicTable.fields.book_id + " = " + bookTable.fields.id + " AND " + bookTable.fields.id + " = ?";
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

		var callBackTimes_1 = 0;
		var callBackTimes_2 = 0;
		var callBackTimes_3 = 0;

		var id = result[0][bookTable.fields.id];
		var name = result[0][bookTable.fields.name];
		var authorId = result[0][bookTable.fields.authorId];
		var publisherId = result[0][bookTable.fields.publisherId];
		var desc = result[0][bookTable.fields.desc];
		var price = result[0][bookTable.fields.price];
		var icon = result[0][bookTable.fields.icon];
		var publishDate = result[0][bookTable.fields.publishDate];
		var age = result[0][comicTable.fields.age];
		var type = result[0][comicTable.fields.type];

		var comic = new bookClass.Comic(id);
		comic.setName(name);
		comic.setDescription(desc);
		comic.setPrice(price);
		comic.setIcon(icon);
		comic.setPublishDate(publishDate);
		comic.setAge(age);
		comic.setType(type);

		//Get quantity
		statistic.getBookQuantity(comic, function(total) {
			callBackTimes_3++;
			comic.setQuantity(total);

			if (callBackTimes_1 == callBackTimes_2 && callBackTimes_2 == callBackTimes_3 && callBackTimes_3 == result.length) {
				callBackFunction(comic);
			}
		});
		//End

		//Get author
		personDAO.getAuthorById(authorId, function(author) {
			callBackTimes_1++;
			comic.setAuthor(author);
			if (callBackTimes_1 == callBackTimes_2 && callBackTimes_2 == callBackTimes_3 && callBackTimes_3 == result.length) {
				callBackFunction(comic);
			}
		});
		//End

		//Get publisher
		publisherDAO.getPublisherById(publisherId, function(publisher) {
			callBackTimes_2++;
			comic.setPublisher(publisher);
			if (callBackTimes_1 == callBackTimes_2 && callBackTimes_2 == callBackTimes_3 && callBackTimes_3 == result.length) {
				callBackFunction(comic);
			}
		});
		//End
	});
}

exports.getNovelList = function(callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var listBook = [];

	var query = "SELECT * FROM " + novelTable.tblName + ", " + bookTable.tblName + " WHERE " + novelTable.fields.book_id + " = " + bookTable.fields.id;
	connection.query(query, function(err, result, fields) {
		if (err) {
			console.log('Query error');
			throw err;
		}

		if (result.length <= 0) {
			callBackFunction([]);
		}

		var callBackTimes_1 = 0;
		var callBackTimes_2 = 0;
		var callBackTimes_3 = 0;

		//Get result book list
		for (var i = 0; i < result.length; i++) {
			var id = result[i][bookTable.fields.id];
			var name = result[i][bookTable.fields.name];
			var authorId = result[i][bookTable.fields.authorId];
			var publisherId = result[i][bookTable.fields.publisherId];
			var desc = result[i][bookTable.fields.desc];
			var price = result[i][bookTable.fields.price];
			var icon = result[i][bookTable.fields.icon];
			var publishDate = result[i][bookTable.fields.publishDate];
			var age = result[i][novelTable.fields.age];
			var type = result[i][novelTable.fields.type];

			var novel = new bookClass.Novel(id);
			novel.setName(name);
			novel.setDescription(desc);
			novel.setPrice(price);
			novel.setIcon(icon);
			novel.setPublishDate(publishDate);
			novel.setAge(age);
			novel.setType(type);
			listBook.push(novel);

			//Get quantity
			statistic.getBookQuantity(novel, function(total) {
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
		//End
	});
}

exports.getNovelListByName = function(name, callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var listBook = [];

	var query = "SELECT * FROM " + novelTable.tblName + ", " + bookTable.tblName + " WHERE " + novelTable.fields.book_id + " = " + bookTable.fields.id + " AND LOWER(" + bookTable.fields.name + ") LIKE ?";
	var preparedStatement = ['%' + name + '%'];
	connection.query(query, preparedStatement, function(err, result, fields) {
		if (err) {
			console.log('Query error');
			throw err;
		}

		if (result.length <= 0) {
			callBackFunction([]);
		}

		var callBackTimes_1 = 0;
		var callBackTimes_2 = 0;
		var callBackTimes_3 = 0;

		//Get result book list
		for (var i = 0; i < result.length; i++) {
			var id = result[i][bookTable.fields.id];
			var name = result[i][bookTable.fields.name];
			var authorId = result[i][bookTable.fields.authorId];
			var publisherId = result[i][bookTable.fields.publisherId];
			var desc = result[i][bookTable.fields.desc];
			var price = result[i][bookTable.fields.price];
			var icon = result[i][bookTable.fields.icon];
			var publishDate = result[i][bookTable.fields.publishDate];
			var age = result[i][novelTable.fields.age];
			var type = result[i][novelTable.fields.type];

			var novel = new bookClass.Novel(id);
			novel.setName(name);
			novel.setDescription(desc);
			novel.setPrice(price);
			novel.setIcon(icon);
			novel.setPublishDate(publishDate);
			novel.setAge(age);
			novel.setType(type);
			listBook.push(novel);

			//Get quantity
			statistic.getBookQuantity(novel, function(total) {
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
		//End
	});
}

exports.getNovelById = function(id, callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var query = "SELECT * FROM " + novelTable.tblName + ", " + bookTable.tblName + " WHERE " + novelTable.fields.book_id + " = " + bookTable.fields.id + " AND " + bookTable.fields.id + " = ?";
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

		var callBackTimes_1 = 0;
		var callBackTimes_2 = 0;
		var callBackTimes_3 = 0;

		var id = result[0][bookTable.fields.id];
		var name = result[0][bookTable.fields.name];
		var authorId = result[0][bookTable.fields.authorId];
		var publisherId = result[0][bookTable.fields.publisherId];
		var desc = result[0][bookTable.fields.desc];
		var price = result[0][bookTable.fields.price];
		var icon = result[0][bookTable.fields.icon];
		var publishDate = result[0][bookTable.fields.publishDate];
		var age = result[0][novelTable.fields.age];
		var type = result[0][novelTable.fields.type];

		var novel = new bookClass.Novel(id);
		novel.setName(name);
		novel.setDescription(desc);
		novel.setPrice(price);
		novel.setIcon(icon);
		novel.setPublishDate(publishDate);
		novel.setAge(age);
		novel.setType(type);

		//Get quantity
		statistic.getBookQuantity(novel, function(total) {
			callBackTimes_3++;
			novel.setQuantity(total);

			if (callBackTimes_1 == callBackTimes_2 && callBackTimes_2 == callBackTimes_3 && callBackTimes_3 == result.length) {
				callBackFunction(novel);
			}
		});
		//End

		//Get author
		personDAO.getAuthorById(authorId, function(author) {
			callBackTimes_1++;
			novel.setAuthor(author);
			if (callBackTimes_1 == callBackTimes_2 && callBackTimes_2 == callBackTimes_3 && callBackTimes_3 == result.length) {
				callBackFunction(novel);
			}
		});
		//End

		//Get publisher
		publisherDAO.getPublisherById(publisherId, function(publisher) {
			callBackTimes_2++;
			novel.setPublisher(publisher);
			if (callBackTimes_1 == callBackTimes_2 && callBackTimes_2 == callBackTimes_3 && callBackTimes_3 == result.length) {
				callBackFunction(novel);
			}
		});
		//End
	});
}

exports.getReferenceBookList = function(callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var listBook = [];

	var query = "SELECT * FROM " + referenceBookTable.tblName + ", " + bookTable.tblName + " WHERE " + referenceBookTable.fields.book_id + " = " + bookTable.fields.id;
	connection.query(query, function(err, result, fields) {
		if (err) {
			console.log('Query error');
			throw err;
		}

		if (result.length <= 0) {
			callBackFunction([]);
		}

		var callBackTimes_1 = 0;
		var callBackTimes_2 = 0;
		var callBackTimes_3 = 0;

		//Get result book list
		for (var i = 0; i < result.length; i++) {
			var id = result[i][bookTable.fields.id];
			var name = result[i][bookTable.fields.name];
			var authorId = result[i][bookTable.fields.authorId];
			var publisherId = result[i][bookTable.fields.publisherId];
			var desc = result[i][bookTable.fields.desc];
			var price = result[i][bookTable.fields.price];
			var icon = result[i][bookTable.fields.icon];
			var publishDate = result[i][bookTable.fields.publishDate];
			var major = result[i][referenceBookTable.fields.major];
			var type = result[i][referenceBookTable.fields.type];

			var referenceBook = new bookClass.ReferenceBook(id);
			referenceBook.setName(name);
			referenceBook.setDescription(desc);
			referenceBook.setPrice(price);
			referenceBook.setIcon(icon);
			referenceBook.setPublishDate(publishDate);
			referenceBook.setMajor(major);
			referenceBook.setType(type);
			listBook.push(referenceBook);

			//Get quantity
			statistic.getBookQuantity(referenceBook, function(total) {
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
		//End
	});
}

exports.getReferenceBookListByName = function(name, callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var listBook = [];

	var query = "SELECT * FROM " + referenceBookTable.tblName + ", " + bookTable.tblName + " WHERE " + referenceBookTable.fields.book_id + " = " + bookTable.fields.id + " AND LOWER(" + bookTable.fields.name + ") LIKE ?";
	var preparedStatement = ['%' + name + '%'];
	connection.query(query, preparedStatement, function(err, result, fields) {
		if (err) {
			console.log('Query error');
			throw err;
		}

		if (result.length <= 0) {
			callBackFunction([]);
		}

		var callBackTimes_1 = 0;
		var callBackTimes_2 = 0;
		var callBackTimes_3 = 0;

		//Get result book list
		for (var i = 0; i < result.length; i++) {
			var id = result[i][bookTable.fields.id];
			var name = result[i][bookTable.fields.name];
			var authorId = result[i][bookTable.fields.authorId];
			var publisherId = result[i][bookTable.fields.publisherId];
			var desc = result[i][bookTable.fields.desc];
			var price = result[i][bookTable.fields.price];
			var icon = result[i][bookTable.fields.icon];
			var publishDate = result[i][bookTable.fields.publishDate];
			var major = result[i][referenceBookTable.fields.major];
			var type = result[i][referenceBookTable.fields.type];

			var referenceBook = new bookClass.ReferenceBook(id);
			referenceBook.setName(name);
			referenceBook.setDescription(desc);
			referenceBook.setPrice(price);
			referenceBook.setIcon(icon);
			referenceBook.setPublishDate(publishDate);
			referenceBook.setMajor(major);
			referenceBook.setType(type);
			listBook.push(referenceBook);

			//Get quantity
			statistic.getBookQuantity(referenceBook, function(total) {
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
		//End
	});
}

exports.getReferenceBookById = function(id, callBackFunction) {
	if (!isSuccessConnected) {
		console.log('Connection error');
		return;
	}

	var query = "SELECT * FROM " + referenceBookTable.tblName + ", " + bookTable.tblName + " WHERE " + referenceBookTable.fields.book_id + " = " + bookTable.fields.id + " AND " + bookTable.fields.id + " = ?";
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

		var callBackTimes_1 = 0;
		var callBackTimes_2 = 0;
		var callBackTimes_3 = 0;

		var id = result[0][bookTable.fields.id];
		var name = result[0][bookTable.fields.name];
		var authorId = result[0][bookTable.fields.authorId];
		var publisherId = result[0][bookTable.fields.publisherId];
		var desc = result[0][bookTable.fields.desc];
		var price = result[0][bookTable.fields.price];
		var icon = result[0][bookTable.fields.icon];
		var publishDate = result[0][bookTable.fields.publishDate];
		var major = result[0][referenceBookTable.fields.major];
		var type = result[0][referenceBookTable.fields.type];

		var referenceBook = new bookClass.ReferenceBook(id);
		referenceBook.setName(name);
		referenceBook.setDescription(desc);
		referenceBook.setPrice(price);
		referenceBook.setIcon(icon);
		referenceBook.setPublishDate(publishDate);
		referenceBook.setMajor(major);
		referenceBook.setType(type);

		//Get quantity
		statistic.getBookQuantity(referenceBook, function(total) {
			callBackTimes_3++;
			referenceBook.setQuantity(total);

			if (callBackTimes_1 == callBackTimes_2 && callBackTimes_2 == callBackTimes_3 && callBackTimes_3 == result.length) {
				callBackFunction(referenceBook);
			}
		});
		//End

		//Get author
		personDAO.getAuthorById(authorId, function(author) {
			callBackTimes_1++;
			referenceBook.setAuthor(author);
			if (callBackTimes_1 == callBackTimes_2 && callBackTimes_2 == callBackTimes_3 && callBackTimes_3 == result.length) {
				callBackFunction(referenceBook);
			}
		});
		//End

		//Get publisher
		publisherDAO.getPublisherById(publisherId, function(publisher) {
			callBackTimes_2++;
			referenceBook.setPublisher(publisher);
			if (callBackTimes_1 == callBackTimes_2 && callBackTimes_2 == callBackTimes_3 && callBackTimes_3 == result.length) {
				callBackFunction(referenceBook);
			}
		});
		//End
	});
}