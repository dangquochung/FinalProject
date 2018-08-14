/******************************************************************************************/
/******************************************************************************************/
/******************************************************************************************/
/******************************************************************************************/
/******************************************************************************************/
/******************************************************************************************/
/******************************************************************************************/
/******************************************************************************************/

const express = require('express');

/* Start server */
const myServer = express();
myServer.listen(8080);
myServer.use(express.static(__dirname + '/view'));						//Point to view folder for client-side to use
//myServer.engine('ejs', require('ejs').renderFile);
myServer.set('views', __dirname + '/view');
myServer.set('view engine', 'ejs');
/* End */

/* Support JSON */
const bodyParser = require('body-parser')
myServer.use(bodyParser.json({ limit: '50mb' }));
myServer.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
/* End */

/* Define SESSION with MySQL */
const session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
	database: 'book_store_session',
	schema: {
        tableName: 'customer_session',
        columnNames: {
            session_id: 'id',
            expires: 'expires',
            data: 'data',
        }
    },
};
var sessionStore = new MySQLStore(options);

myServer.use(session({
    key: 'Book_Store_Session',
    secret: '_Steven_Huang_',
    store: sessionStore,
    resave: true,
    saveUninitialized: true
}));
/* End */

/******************************************************************************************/
/******************************************************************************************/
/******************************************************************************************/
/******************************************************************************************/
/******************************************************************************************/
/******************************************************************************************/
/******************************************************************************************/
/******************************************************************************************/

// GLOBAL LIBRARIES FOR CLIENT
const queryString = require('querystring');
const queryStringParser = require('./library/extension/QueryStringParser.js');
const encoder = require('./library/security/Encoder.js');
const validate = require('./library/extension/ValidateForm.js');
const file = require('./library/extension/File.js');
const jsonParser = require('./control/JSONParser.js');
const fs = require('fs');
const path = require('path');
// END

// ENTITIES CLASS
const bookClass = require('./model/book/Book.js');
const accountClass = require('./model/person/Account.js');
const personClass = require('./model/person/Person.js');
const addressClass = require('./model/address/Address.js');
const fullNameClass = require('./model/person/FullName.js');
const cartClass = require('./model/order/Cart.js');
const orderItemClass = require('./model/order/OrderItem.js');
const orderClass = require('./model/order/Order.js');
const paymentMethodClass = require('./model/order/PaymentMethod.js');
const shippingClass = require('./model/order/Shipping.js');
// END

// CONTROL CLASS
const bookDAO = require('./control/book/BookDAO.js');
const bookCategoryClass = require('./control/book/BookCategory.js');
const personDAO = require('./control/person/PersonDAO.js');
const bankDAO = require('./control/bank/BankDAO.js');
const orderDAO = require('./control/order/OrderDAO.js');
const shippingDAO = require('./control/order/ShippingDAO.js');
const returnConstant = require('./control/ReturnConstant.js');
const statistic = require('./control/Statistic.js');
// END

// GET methods go below
myServer.get('/test', function(req, res) {
	statistic.getBookQuantity(new bookClass.Book(1), function(total) {
		console.log(total);
	});
});

myServer.get('/', function(req, res) {
	var SESSION_USER = null;
	var SESSION_USER_CART = null;
	if (req.session.user_cart) {
		SESSION_USER_CART = jsonParser.toCart(req.session.user_cart);
		SESSION_USER = SESSION_USER_CART.getCustomer();
	}

	var callBackTimes = 0;

	var listSchoolBook = [];
	var listScienceBook = [];
	var listComic = [];
	var listNovel = [];
	var listReferenceBook = [];
	var listBestSellBook = [];

	statistic.getBestSellBooks(function(result) {
		callBackTimes++;
		listBestSellBook = result;

		if (callBackTimes == bookCategoryClass.BookCategory.length + 1) {
			res.render('./Public/index.ejs', {
				listBestSellBook: listBestSellBook,
				listSchoolBook: listSchoolBook,
				listScienceBook: listScienceBook,
				listComic: listComic,
				listNovel: listNovel,
				listReferenceBook: listReferenceBook,
				BookCategory: bookCategoryClass.BookCategory,
				AESEncrypt: encoder.AESEncrypt,
				QueryStringParser: queryStringParser.getQueryString,
				cart: SESSION_USER_CART,
			});
		}
	});
	
	bookDAO.getSchoolBookList(function(result) {
		callBackTimes++;
		listSchoolBook = result;

		if (callBackTimes == bookCategoryClass.BookCategory.length + 1) {
			res.render('./Public/index.ejs', {
				listBestSellBook: listBestSellBook,
				listSchoolBook: listSchoolBook,
				listScienceBook: listScienceBook,
				listComic: listComic,
				listNovel: listNovel,
				listReferenceBook: listReferenceBook,
				BookCategory: bookCategoryClass.BookCategory,
				AESEncrypt: encoder.AESEncrypt,
				QueryStringParser: queryStringParser.getQueryString,
				cart: SESSION_USER_CART,
			});
		}
	});
	bookDAO.getScienceBookList(function(result) {
		callBackTimes++;
		listScienceBook = result;

		if (callBackTimes == bookCategoryClass.BookCategory.length + 1) {
			res.render('./Public/index.ejs', {
				listBestSellBook: listBestSellBook,
				listSchoolBook: listSchoolBook,
				listScienceBook: listScienceBook,
				listComic: listComic,
				listNovel: listNovel,
				listReferenceBook: listReferenceBook,
				BookCategory: bookCategoryClass.BookCategory,
				AESEncrypt: encoder.AESEncrypt,
				QueryStringParser: queryStringParser.getQueryString,
				cart: SESSION_USER_CART,
			});
		}
	});
	bookDAO.getComicList(function(result) {
		callBackTimes++;
		listComic = result;

		if (callBackTimes == bookCategoryClass.BookCategory.length + 1) {
			res.render('./Public/index.ejs', {
				listBestSellBook: listBestSellBook,
				listSchoolBook: listSchoolBook,
				listScienceBook: listScienceBook,
				listComic: listComic,
				listNovel: listNovel,
				listReferenceBook: listReferenceBook,
				BookCategory: bookCategoryClass.BookCategory,
				AESEncrypt: encoder.AESEncrypt,
				QueryStringParser: queryStringParser.getQueryString,
				cart: SESSION_USER_CART,
			});
		}
	});
	bookDAO.getNovelList(function(result) {
		callBackTimes++;
		listNovel = result;

		if (callBackTimes == bookCategoryClass.BookCategory.length + 1) {
			res.render('./Public/index.ejs', {
				listBestSellBook: listBestSellBook,
				listSchoolBook: listSchoolBook,
				listScienceBook: listScienceBook,
				listComic: listComic,
				listNovel: listNovel,
				listReferenceBook: listReferenceBook,
				BookCategory: bookCategoryClass.BookCategory,
				AESEncrypt: encoder.AESEncrypt,
				QueryStringParser: queryStringParser.getQueryString,
				cart: SESSION_USER_CART,
			});
		}
	});
	bookDAO.getReferenceBookList(function(result) {
		callBackTimes++;
		listReferenceBook = result;

		if (callBackTimes == bookCategoryClass.BookCategory.length + 1) {
			res.render('./Public/index.ejs', {
				listBestSellBook: listBestSellBook,
				listSchoolBook: listSchoolBook,
				listScienceBook: listScienceBook,
				listComic: listComic,
				listNovel: listNovel,
				listReferenceBook: listReferenceBook,
				BookCategory: bookCategoryClass.BookCategory,
				AESEncrypt: encoder.AESEncrypt,
				QueryStringParser: queryStringParser.getQueryString,
				cart: SESSION_USER_CART,
			});
		}
	});
});

myServer.get('/view-book-info', function(req, res) {
	var SESSION_USER = null;
	var SESSION_USER_CART = null;
	if (req.session.user_cart) {
		SESSION_USER_CART = jsonParser.toCart(req.session.user_cart);
		SESSION_USER = SESSION_USER_CART.getCustomer();
	}

	var query = req.query.key;
	query = queryString.parse(encoder.AESDecrypt(query));

	var id = query.id;
	var kind = query.kind;

	var sendObject = {
		kind: kind,
		BookCategory: bookCategoryClass.BookCategory,
		AESEncrypt: encoder.AESEncrypt,
		QueryStringParser: queryStringParser.getQueryString,
		cart: SESSION_USER_CART,
	};

	if (!id || !kind) {
		sendObject.error_message = 'Thao tác bị lỗi, hãy tải lại trang!';
		res.render('./Public/error.ejs', sendObject);
		return;
	}

	var callBackTimes = 0;
	if (kind == 9999) {
		statistic.getBestSellBooks(function(result) {
			callBackTimes++;
			sendObject.listBestSellBook = result;
	
			if (callBackTimes == bookCategoryClass.BookCategory.length + 2) {
				res.render('./Public/view_book.ejs', sendObject);
			}
		});

		bookDAO.getSchoolBookById(id, function(book) {
			callBackTimes++;
			if (book != null) {
				sendObject.book = book;
				sendObject.kind = 0;
				bookDAO.getSchoolBookList(function(sameCategoryBook) {
					callBackTimes++;
					sendObject.sameCategoryBook = sameCategoryBook;
					if (callBackTimes == bookCategoryClass.BookCategory.length + 2) {
						res.render('./Public/view_book.ejs', sendObject);
					}
				});
			}
			if (callBackTimes == bookCategoryClass.BookCategory.length + 2) {
				res.render('./Public/view_book.ejs', sendObject);
			}
		});

		bookDAO.getScienceBookById(id, function(book) {
			callBackTimes++;
			if (book != null) {
				sendObject.book = book;
				sendObject.kind = 1;
				bookDAO.getScienceBookList(function(sameCategoryBook) {
					callBackTimes++;
					sendObject.sameCategoryBook = sameCategoryBook;
					if (callBackTimes == bookCategoryClass.BookCategory.length + 2) {
						res.render('./Public/view_book.ejs', sendObject);
					}
				});
			}
			if (callBackTimes == bookCategoryClass.BookCategory.length + 2) {
				res.render('./Public/view_book.ejs', sendObject);
			}
		});

		bookDAO.getComicById(id, function(book) {
			callBackTimes++;
			if (book != null) {
				sendObject.book = book;
				sendObject.kind = 2;
				bookDAO.getComicList(function(sameCategoryBook) {
					callBackTimes++;
					sendObject.sameCategoryBook = sameCategoryBook;
					if (callBackTimes == bookCategoryClass.BookCategory.length + 2) {
						res.render('./Public/view_book.ejs', sendObject);
					}
				});
			}
			if (callBackTimes == bookCategoryClass.BookCategory.length + 2) {
				res.render('./Public/view_book.ejs', sendObject);
			}
		});

		bookDAO.getNovelById(id, function(book) {
			callBackTimes++;
			if (book != null) {
				sendObject.book = book;
				sendObject.kind = 3;
				bookDAO.getNovelList(function(sameCategoryBook) {
					callBackTimes++;
					sendObject.sameCategoryBook = sameCategoryBook;
					if (callBackTimes == bookCategoryClass.BookCategory.length + 2) {
						res.render('./Public/view_book.ejs', sendObject);
					}
				});
			}
			if (callBackTimes == bookCategoryClass.BookCategory.length + 2) {
				res.render('./Public/view_book.ejs', sendObject);
			}
		});

		bookDAO.getReferenceBookById(id, function(book) {
			callBackTimes++;
			if (book != null) {
				sendObject.book = book;
				sendObject.kind = 4;
				bookDAO.getReferenceBookList(function(sameCategoryBook) {
					callBackTimes++;
					sendObject.sameCategoryBook = sameCategoryBook;
					if (callBackTimes == bookCategoryClass.BookCategory.length + 2) {
						res.render('./Public/view_book.ejs', sendObject);
					}
				});
			}
			if (callBackTimes == bookCategoryClass.BookCategory.length + 2) {
				res.render('./Public/view_book.ejs', sendObject);
			}
		});
		
		return;
	}

	var callBackTimes = 0;
	statistic.getBestSellBooks(function(result) {
		callBackTimes++;
		sendObject.listBestSellBook = result;

		if (callBackTimes == 3) {
			res.render('./Public/view_book.ejs', sendObject);
		}
	});

	if (kind == 0) {
		bookDAO.getSchoolBookById(id, function(book) {
			callBackTimes++;
			sendObject.book = book;
			if (callBackTimes == 3) {
				res.render('./Public/view_book.ejs', sendObject);
			}
		});
		bookDAO.getSchoolBookList(function(sameCategoryBook) {
			callBackTimes++;
			sendObject.sameCategoryBook = sameCategoryBook;
			if (callBackTimes == 3) {
				res.render('./Public/view_book.ejs', sendObject);
			}
		});
	} else if (kind == 1) {
		bookDAO.getScienceBookById(id, function(book) {
			callBackTimes++;
			sendObject.book = book;
			if (callBackTimes == 3) {
				res.render('./Public/view_book.ejs', sendObject);
			}
		});
		bookDAO.getScienceBookList(function(sameCategoryBook) {
			callBackTimes++;
			sendObject.sameCategoryBook = sameCategoryBook;
			if (callBackTimes == 3) {
				res.render('./Public/view_book.ejs', sendObject);
			}
		});
	} else if (kind == 2) {
		bookDAO.getComicById(id, function(book) {
			callBackTimes++;
			sendObject.book = book;
			if (callBackTimes == 3) {
				res.render('./Public/view_book.ejs', sendObject);
			}
		});
		bookDAO.getComicList(function(sameCategoryBook) {
			callBackTimes++;
			sendObject.sameCategoryBook = sameCategoryBook;
			if (callBackTimes == 3) {
				res.render('./Public/view_book.ejs', sendObject);
			}
		});
	} else if (kind == 3) {
		bookDAO.getNovelById(id, function(book) {
			callBackTimes++;
			sendObject.book = book;
			if (callBackTimes == 3) {
				res.render('./Public/view_book.ejs', sendObject);
			}
		});
		bookDAO.getNovelList(function(sameCategoryBook) {
			callBackTimes++;
			sendObject.sameCategoryBook = sameCategoryBook;
			if (callBackTimes == 3) {
				res.render('./Public/view_book.ejs', sendObject);
			}
		});
	} else if (kind == 4) {
		bookDAO.getReferenceBookById(id, function(book) {
			callBackTimes++;
			sendObject.book = book;
			if (callBackTimes == 3) {
				res.render('./Public/view_book.ejs', sendObject);
			}
		});
		bookDAO.getReferenceBookList(function(sameCategoryBook) {
			callBackTimes++;
			sendObject.sameCategoryBook = sameCategoryBook;
			if (callBackTimes == 3) {
				res.render('./Public/view_book.ejs', sendObject);
			}
		});
	}
});

myServer.get('/view-category', function(req, res) {
	var SESSION_USER = null;
	var SESSION_USER_CART = null;
	if (req.session.user_cart) {
		SESSION_USER_CART = jsonParser.toCart(req.session.user_cart);
		SESSION_USER = SESSION_USER_CART.getCustomer();
	}

	var query = req.query.key;
	query = queryString.parse(encoder.AESDecrypt(query));

	var kind = query.kind;

	var sendObject = {
		kind: kind,
		BookCategory: bookCategoryClass.BookCategory,
		AESEncrypt: encoder.AESEncrypt,
		QueryStringParser: queryStringParser.getQueryString,
		cart: SESSION_USER_CART,
	};

	if (!kind) {
		sendObject.error_message = 'Thao tác bị lỗi, hãy tải lại trang!';
		res.render('./Public/error.ejs', sendObject);
		return;
	}

	var callBackTimes = 0;
	statistic.getBestSellBooks(function(result) {
		callBackTimes++;
		sendObject.listBestSellBook = result;

		if (callBackTimes == 2) {
			res.render('./Public/view_category.ejs', sendObject);
		}
	});

	if (kind == 0) {
		bookDAO.getSchoolBookList(function(sameCategoryBook) {
			sendObject.sameCategoryBook = sameCategoryBook;
			callBackTimes++;
			if (callBackTimes == 2) {
				res.render('./Public/view_category.ejs', sendObject);
			}
		});
	} else if (kind == 1) {
		bookDAO.getScienceBookList(function(sameCategoryBook) {
			sendObject.sameCategoryBook = sameCategoryBook;
			callBackTimes++;
			if (callBackTimes == 2) {
				res.render('./Public/view_category.ejs', sendObject);
			}
		});
	} else if (kind == 2) {
		bookDAO.getComicList(function(sameCategoryBook) {
			sendObject.sameCategoryBook = sameCategoryBook;
			callBackTimes++;
			if (callBackTimes == 2) {
				res.render('./Public/view_category.ejs', sendObject);
			}
		});
	} else if (kind == 3) {
		bookDAO.getNovelList(function(sameCategoryBook) {
			sendObject.sameCategoryBook = sameCategoryBook;
			callBackTimes++;
			if (callBackTimes == 2) {
				res.render('./Public/view_category.ejs', sendObject);
			}
		});
	} else if (kind == 4) {
		bookDAO.getReferenceBookList(function(sameCategoryBook) {
			sendObject.sameCategoryBook = sameCategoryBook;
			callBackTimes++;
			if (callBackTimes == 2) {
				res.render('./Public/view_category.ejs', sendObject);
			}
		});
	}
});

myServer.get('/search-book', function(req, res) {
	var SESSION_USER = null;
	var SESSION_USER_CART = null;
	if (req.session.user_cart) {
		SESSION_USER_CART = jsonParser.toCart(req.session.user_cart);
		SESSION_USER = SESSION_USER_CART.getCustomer();
	}

	var query = req.query.key;
	query = queryString.parse(encoder.AESDecrypt(query));

	var searchKey = query.search_key;

	var sendObject = {
		searchKey: searchKey,
		BookCategory: bookCategoryClass.BookCategory,
		AESEncrypt: encoder.AESEncrypt,
		QueryStringParser: queryStringParser.getQueryString,
		cart: SESSION_USER_CART,
	};

	var callBackTimes = 0;
	statistic.getBestSellBooks(function(result) {
		callBackTimes++;
		sendObject.listBestSellBook = result;

		if (callBackTimes == bookCategoryClass.BookCategory.length + 1) {
			res.render('./Public/search_book.ejs', sendObject);
		}
	});

	if (!searchKey) {
		sendObject.error_message = 'Thao tác bị lỗi, hãy tải lại trang!';
		res.render('./Public/error.ejs', sendObject);
		return;
	}

	var callBackTimes = 0;

	bookDAO.getSchoolBookListByName(searchKey, function(schoolBookList) {
		callBackTimes++;
		sendObject.schoolBookList = schoolBookList;

		if (callBackTimes == bookCategoryClass.BookCategory.length + 1) {
			res.render('./Public/search_book.ejs', sendObject);
		}
	});
	bookDAO.getScienceBookListByName(searchKey, function(scienceBookList) {
		callBackTimes++;
		sendObject.scienceBookList = scienceBookList;

		if (callBackTimes == bookCategoryClass.BookCategory.length + 1) {
			res.render('./Public/search_book.ejs', sendObject);
		}
	});
	bookDAO.getComicListByName(searchKey, function(comicList) {
		callBackTimes++;
		sendObject.comicList = comicList;

		if (callBackTimes == bookCategoryClass.BookCategory.length + 1) {
			res.render('./Public/search_book.ejs', sendObject);
		}
	});
	bookDAO.getNovelListByName(searchKey, function(novelList) {
		callBackTimes++;
		sendObject.novelList = novelList;

		if (callBackTimes == bookCategoryClass.BookCategory.length + 1) {
			res.render('./Public/search_book.ejs', sendObject);
		}
	});
	bookDAO.getReferenceBookListByName(searchKey, function(referenceBookList) {
		callBackTimes++;
		sendObject.referenceBookList = referenceBookList;

		if (callBackTimes == bookCategoryClass.BookCategory.length + 1) {
			res.render('./Public/search_book.ejs', sendObject);
		}
	});
});

myServer.get('/register', function(req, res) {
	var SESSION_USER = null;
	var SESSION_USER_CART = null;
	if (req.session.user_cart) {
		SESSION_USER_CART = jsonParser.toCart(req.session.user_cart);
		SESSION_USER = SESSION_USER_CART.getCustomer();
	}

	var sendObject = {
		BookCategory: bookCategoryClass.BookCategory,
		AESEncrypt: encoder.AESEncrypt,
		QueryStringParser: queryStringParser.getQueryString,
		cart: SESSION_USER_CART,
	};

	if (SESSION_USER != null) {
		sendObject.error_message = 'Thao tác bị lỗi, hãy tải lại trang!';
		res.render('./Public/error.ejs', sendObject);
		return;
	}

	res.render('./Public/register.ejs', sendObject);
});

myServer.get('/login', function(req, res) {
	var SESSION_USER = null;
	var SESSION_USER_CART = null;
	if (req.session.user_cart) {
		SESSION_USER_CART = jsonParser.toCart(req.session.user_cart);
		SESSION_USER = SESSION_USER_CART.getCustomer();
	}

	var sendObject = {
		BookCategory: bookCategoryClass.BookCategory,
		AESEncrypt: encoder.AESEncrypt,
		QueryStringParser: queryStringParser.getQueryString,
		cart: SESSION_USER_CART,
	};

	if (SESSION_USER != null) {
		sendObject.error_message = 'Thao tác bị lỗi, hãy tải lại trang!';
		res.render('./Public/error.ejs', sendObject);
		return;
	}

	res.render('./Public/login.ejs', sendObject);
});

myServer.get('/self-info', function(req, res) {
	var SESSION_USER = null;
	var SESSION_USER_CART = null;
	if (req.session.user_cart) {
		SESSION_USER_CART = jsonParser.toCart(req.session.user_cart);
		SESSION_USER = SESSION_USER_CART.getCustomer();
	}

	var sendObject = {
		BookCategory: bookCategoryClass.BookCategory,
		AESEncrypt: encoder.AESEncrypt,
		QueryStringParser: queryStringParser.getQueryString,
		cart: SESSION_USER_CART,
	};

	if (SESSION_USER == null) {
		sendObject.error_message = 'Thao tác bị lỗi, hãy tải lại trang!';
		res.render('./Public/error.ejs', sendObject);
		return;
	}

	res.render('./Public/edit_info.ejs', sendObject);
});

myServer.get('/change-password', function(req, res) {
	var SESSION_USER = null;
	var SESSION_USER_CART = null;
	if (req.session.user_cart) {
		SESSION_USER_CART = jsonParser.toCart(req.session.user_cart);
		SESSION_USER = SESSION_USER_CART.getCustomer();
	}

	var sendObject = {
		BookCategory: bookCategoryClass.BookCategory,
		AESEncrypt: encoder.AESEncrypt,
		QueryStringParser: queryStringParser.getQueryString,
		cart: SESSION_USER_CART,
	};

	if (SESSION_USER == null) {
		sendObject.error_message = 'Thao tác bị lỗi, hãy tải lại trang!';
		res.render('./Public/error.ejs', sendObject);
		return;
	}

	res.render('./Public/change_password.ejs', sendObject);
});

myServer.get('/view-cart', function(req, res) {
	var SESSION_USER = null;
	var SESSION_USER_CART = null;
	if (req.session.user_cart) {
		SESSION_USER_CART = jsonParser.toCart(req.session.user_cart);
		SESSION_USER = SESSION_USER_CART.getCustomer();
	}

	var sendObject = {
		BookCategory: bookCategoryClass.BookCategory,
		AESEncrypt: encoder.AESEncrypt,
		QueryStringParser: queryStringParser.getQueryString,
		cart: SESSION_USER_CART,
	};

	if (SESSION_USER == null) {
		sendObject.error_message = 'Cần đăng nhập trước khi thực hiện chức năng này!';
		res.render('./Public/error.ejs', sendObject);
		return;
	}

	res.render('./Public/view_cart.ejs', sendObject);
});

myServer.get('/pay', function(req, res) {
	var SESSION_USER = null;
	var SESSION_USER_CART = null;
	if (req.session.user_cart) {
		SESSION_USER_CART = jsonParser.toCart(req.session.user_cart);
		SESSION_USER = SESSION_USER_CART.getCustomer();
	}

	var sendObject = {
		BookCategory: bookCategoryClass.BookCategory,
		AESEncrypt: encoder.AESEncrypt,
		QueryStringParser: queryStringParser.getQueryString,
		cart: SESSION_USER_CART,
	};

	if (SESSION_USER == null) {
		sendObject.error_message = 'Cần đăng nhập trước khi thực hiện chức năng này!';
		res.render('./Public/error.ejs', sendObject);
		return;
	}

	if (SESSION_USER_CART.getTotalProducts() <= 0) {
		sendObject.error_message = 'Giỏ hàng trống, không có gì để thanh toán!';
		res.render('./Public/error.ejs', sendObject);
		return;
	}

	bankDAO.getBankList(function(bankList) {
		sendObject.bankList = bankList;
		sendObject.selfCreditInfo = {
			bank: "Ngân hàng W3Schools",
			owner: "Steven Huang",
			cardSerial: "ABCXYZ",
			content: "Thanh toán hóa đơn BLABLA",
		};
		res.render('./Public/pay.ejs', sendObject);
	});
});
// End

// POST methods go below
myServer.post('/search-book', function(req, res) {
	var searchKey = encoder.RSADecrypt(req.body.search_key);
	searchKey = searchKey.replace(/[\+\-\*\/\\\^\%\&\$\#\@\!\~\`\[\]\(\)\=\>\<\;\.\,]/g, ' ');
	searchKey = searchKey.trim();
	while (searchKey.indexOf('  ') != -1) {
		searchKey = searchKey.replace('  ', ' ');
	}
	searchKey = searchKey.toLowerCase();
	
	var sendBack = "/search-book?key=" + encoder.AESEncrypt(queryStringParser.getQueryString({search_key: searchKey}));
	res.send(sendBack);
});

myServer.post('/register', function(req, res) {
	var SESSION_USER = null;
	var SESSION_USER_CART = null;
	if (req.session.user_cart) {
		SESSION_USER_CART = jsonParser.toCart(req.session.user_cart);
		SESSION_USER = SESSION_USER_CART.getCustomer();
	}

	if (SESSION_USER != null) {
		res.send({ result: 'ERROR', message: "Thao tác bị lỗi, hãy tải lại trang!" });
		return;
	}

	var account = encoder.RSADecrypt(req.body.account);
	var password = encoder.RSADecrypt(req.body.password);
	var name = encoder.RSADecrypt(req.body.name);
	var email = encoder.RSADecrypt(req.body.email);
	var phone = encoder.RSADecrypt(req.body.phone);
	var doB = encoder.RSADecrypt(req.body.doB);
	var gender = encoder.RSADecrypt(req.body.gender);
	var province = encoder.RSADecrypt(req.body.province);
	var city = encoder.RSADecrypt(req.body.city);
	var street = encoder.RSADecrypt(req.body.street);
	var homeIndex = encoder.RSADecrypt(req.body.homeindex);
	var desc = encoder.RSADecrypt(req.body.desc);

	if (!validate.validateString(account, false)) {
		res.send({ result: 'ERROR', message: "Tài khoản không hợp lệ!" });
		return;
	}
	if (!validate.validatePassword(password)) {
		res.send({ result: 'ERROR', message: "Mật khẩu không hợp lệ!" });
		return;
	}
	if (!validate.validateString(name, true)) {
		res.send({ result: 'ERROR', message: "Họ tên không hợp lệ!" });
		return;
	}
	if (name.length >= 50) {
		res.send({ result: 'ERROR', message: "Họ tên quá dài!" });
		return;
	}
	if (!validate.validateEmail(email)) {
		res.send({ result: 'ERROR', message: "Email không hợp lệ!" });
		return;
	}
	if (!validate.validateDecimalNumber(phone)) {
		res.send({ result: 'ERROR', message: "Số điện thoại không hợp lệ!" });
		return;
	}
	/*if (!validate.validateDate(doB)) {
		res.send({ result: 'ERROR', message: "Ngày sinh không hợp lệ!" });
		return;
	}*/
	if (!validate.validateGender(gender)) {
		res.send({ result: 'ERROR', message: "Giới tính không hợp lệ!" });
		return;
	}
	if (!validate.validateString(province, true)) {
		res.send({ result: 'ERROR', message: "Tỉnh/Thành phố không hợp lệ!" });
		return;
	}
	if (!validate.validateString(city, true)) {
		res.send({ result: 'ERROR', message: "Quận/Huyện không hợp lệ!" });
		return;
	}
	if (!validate.validateString(street, true)) {
		res.send({ result: 'ERROR', message: "Xã/Đường phố không hợp lệ!" });
		return;
	}
	if (!validate.validateDecimalNumber(homeIndex, true)) {
		res.send({ result: 'ERROR', message: "Số nhà không hợp lệ!" });
		return;
	}
	if (!validate.validateDescription(desc)) {
		res.send({ result: 'ERROR', message: "Ghi chú không hợp lệ!" });
		return;
	}

	var customer = new personClass.Customer(-1);

	var customerAccount = new accountClass.CustomerAccount(-1);
	customerAccount.setAccount(account);
	customerAccount.setPassword(encoder.MD5Encrypt(password));
	customerAccount.setEmail(email);
	customerAccount.setIcon(null);
	customerAccount.setAccountType(0);
	customerAccount.setPoint(0);

	var avarta = "Unknow_Empty_Avarta.png";
	if (gender == 0) {
		avarta = "Male_Empty_Avarta.png";
	} else if (gender == 1) {
		avarta = "Female_Empty_Avarta.jpg";
	}
	customer.setAvarta(avarta);

	customer.setAccount(customerAccount);

	var customerAddress = new addressClass.Address(-1, province, city, street, parseInt(homeIndex), "", "");
	customer.setAddress(customerAddress);
	
	var customerFullName;
	if (name.length <= 0) {
		customerFullName = new fullNameClass.FullName('', '', '');
	} else {
		var nameSplitted = name.split(' ');
		var firstName = nameSplitted[0];
		if (nameSplitted.length == 1) {
			customerFullName = new fullNameClass.FullName(firstName, '', '');
		} else if (nameSplitted.length == 2) {
			var lastName = nameSplitted[1];
			customerFullName = new fullNameClass.FullName(firstName, '', lastName);
		} else {
			var midName = '';
			for (var j = 1; j < nameSplitted.length - 1; j++) {
				midName += nameSplitted[j];
			}
			var lastName = nameSplitted[nameSplitted.length - 1];
			customerFullName = new fullNameClass.FullName(firstName, midName, lastName);
		}
	}
	customer.setFullName(customerFullName);
	customer.setPhoneNumber(phone);
	customer.setGender(gender);
	customer.setDoB(doB);
	customer.setDescription(desc);

	personDAO.addCustomer(customer, function(response) {
		if (response == returnConstant.ACCOUNT_IS_ALREADY_EXIST) {
			res.send({ result: 'ERROR', message: "Đăng ký thất bại. Tài khoản '" + account + "' đã tồn tại!" });
		} else if (response == returnConstant.ADD_ACCOUNT_SUCCESS) {
			personDAO.customerLogin(account, encoder.MD5Encrypt(password), function(user) {
				if (user == null) {
					res.send({ result: 'ERROR', message: 'Tên đăng nhập hoặc mật khẩu không chính xác!' });
				} else {
					var cart = new cartClass.Cart();
					cart.setCustomer(user);
					req.session.user_cart = cart;
					res.send({ result: 'OK', message: user.getFullName().toString() });
				}
			});
		}
	});
});

myServer.post('/login', function(req, res) {
	var SESSION_USER = null;
	var SESSION_USER_CART = null;
	if (req.session.user_cart) {
		SESSION_USER_CART = jsonParser.toCart(req.session.user_cart);
		SESSION_USER = SESSION_USER_CART.getCustomer();
	}

	if (SESSION_USER != null) {
		res.send({ result: 'ERROR', message: "Thao tác bị lỗi, hãy tải lại trang!" });
		return;
	}

	var account = encoder.RSADecrypt(req.body.account);
	var password = encoder.RSADecrypt(req.body.password);

	if (!validate.validateString(account, false)) {
		res.send({ result: 'ERROR', message: "Tài khoản không hợp lệ!" });
		return;
	}
	if (!validate.validatePassword(password)) {
		res.send({ result: 'ERROR', message: "Mật khẩu không hợp lệ!" });
		return;
	}

	personDAO.customerLogin(account, encoder.MD5Encrypt(password), function(user) {
		if (user == null) {
			res.send({ result: 'ERROR', message: 'Tên đăng nhập hoặc mật khẩu không chính xác!' });
		} else {
			var cart = new cartClass.Cart();
			cart.setCustomer(user);
			req.session.user_cart = cart;
			res.send({ result: 'OK', message: user.getFullName().toString() });
		}
	});
});

myServer.post('/logout', function(req, res) {
	var SESSION_USER = null;
	var SESSION_USER_CART = null;
	if (req.session.user_cart) {
		SESSION_USER_CART = jsonParser.toCart(req.session.user_cart);
		SESSION_USER = SESSION_USER_CART.getCustomer();
	}

	if (SESSION_USER == null) {
		res.send({ result: 'ERROR', message: "Thao tác bị lỗi, hãy tải lại trang!" });
		return;
	}

	req.session.destroy(function(err) {
		if (err) {
			console.log(err);
		}
	});
	res.send({ result: 'OK', message: '' });
});

myServer.post('/update-self-info', function(req, res) {
	var SESSION_USER = null;
	var SESSION_USER_CART = null;
	if (req.session.user_cart) {
		SESSION_USER_CART = jsonParser.toCart(req.session.user_cart);
		SESSION_USER = SESSION_USER_CART.getCustomer();
	}

	if (SESSION_USER == null) {
		res.send({ result: 'ERROR', message: "Thao tác bị lỗi, hãy tải lại trang!" });
		return;
	}

	var name = encoder.RSADecrypt(req.body.name);
	var avarta = encoder.RSADecrypt(req.body.avarta);
	var phone = encoder.RSADecrypt(req.body.phone);
	var doB = encoder.RSADecrypt(req.body.doB);
	var gender = encoder.RSADecrypt(req.body.gender);
	var province = encoder.RSADecrypt(req.body.province);
	var city = encoder.RSADecrypt(req.body.city);
	var street = encoder.RSADecrypt(req.body.street);
	var homeIndex = encoder.RSADecrypt(req.body.homeindex);
	var desc = encoder.RSADecrypt(req.body.desc);

	if (!validate.validateString(name, true)) {
		res.send({ result: 'ERROR', message: "Họ tên không hợp lệ!" });
		return;
	}
	if (name.length >= 50) {
		res.send({ result: 'ERROR', message: "Họ tên quá dài!" });
		return;
	}
	if (!validate.validateDecimalNumber(phone)) {
		res.send({ result: 'ERROR', message: "Số điện thoại không hợp lệ!" });
		return;
	}
	/*if (!validate.validateDate(doB)) {
		res.send({ result: 'ERROR', message: "Ngày sinh không hợp lệ!" });
		return;
	}*/
	if (!validate.validateGender(gender)) {
		res.send({ result: 'ERROR', message: "Giới tính không hợp lệ!" });
		return;
	}
	if (!validate.validateString(province, true)) {
		res.send({ result: 'ERROR', message: "Tỉnh/Thành phố không hợp lệ!" });
		return;
	}
	if (!validate.validateString(city, true)) {
		res.send({ result: 'ERROR', message: "Quận/Huyện không hợp lệ!" });
		return;
	}
	if (!validate.validateString(street, true)) {
		res.send({ result: 'ERROR', message: "Xã/Đường phố không hợp lệ!" });
		return;
	}
	if (!validate.validateDecimalNumber(homeIndex, true)) {
		res.send({ result: 'ERROR', message: "Số nhà không hợp lệ!" });
		return;
	}
	if (!validate.validateDescription(desc)) {
		res.send({ result: 'ERROR', message: "Ghi chú không hợp lệ!" });
		return;
	}

	personDAO.customerLogin(SESSION_USER.getAccount().getAccount(), SESSION_USER.getAccount().getPassword(), function(user) {
		if (user == null) {
			req.session.destroy(function(err) {
				if (err) {
					console.log(err);
				}
			});
			res.send({ result: 'ERROR', message: 'Không tìm thấy thông tin người dùng tương ứng!'});
			return;
		} else {
			user.setPhoneNumber(phone);
			user.getAccount().setIcon(null);
			user.getAccount().setAccountType(0);
			user.getAccount().setPoint(0);
			
			if (file.isImageData(avarta)) {
				file.writeBase64ImageToFile(avarta, user.getAccount().getAccount() + ".jpg");
				user.setAvarta(user.getAccount().getAccount() + ".jpg");
			}

			user.getAddress().setProvince(province);
			user.getAddress().setCity(city);
			user.getAddress().setStreet(street);
			user.getAddress().setHomeIndex(homeIndex);
			
			var fullName;
			if (name.length <= 0) {
				fullName = new fullNameClass.FullName('', '', '');
			} else {
				var nameSplitted = name.split(' ');
				var firstName = nameSplitted[0];
				if (nameSplitted.length == 1) {
					fullName = new fullNameClass.FullName(firstName, '', '');
				} else if (nameSplitted.length == 2) {
					var lastName = nameSplitted[1];
					fullName = new fullNameClass.FullName(firstName, '', lastName);
				} else {
					var midName = '';
					for (var j = 1; j < nameSplitted.length - 1; j++) {
						midName += nameSplitted[j];
					}
					var lastName = nameSplitted[nameSplitted.length - 1];
					fullName = new fullNameClass.FullName(firstName, midName, lastName);
				}
			}
			user.setFullName(fullName);

			user.setGender(gender);
			user.setDoB(doB);
			user.setDescription(desc);
			
			personDAO.updateCustomer(user, function(result) {
				if (result === returnConstant.EDIT_CUSTOMERINFO_SUCCESS) {
					SESSION_USER_CART.setCustomer(user);
					req.session.user_cart = SESSION_USER_CART;
					res.send({ result: 'OK', message: user.getFullName().toString() });
				} else {
					SESSION_USER_CART.setCustomer(user);
					req.session.user_cart = SESSION_USER_CART;
					res.send({ result: 'FAILED', message: user.getFullName().toString() });
				}
			});
		}
	});
});

myServer.post('/change-password', function(req, res) {
	var SESSION_USER = null;
	var SESSION_USER_CART = null;
	if (req.session.user_cart) {
		SESSION_USER_CART = jsonParser.toCart(req.session.user_cart);
		SESSION_USER = SESSION_USER_CART.getCustomer();
	}

	var sendObject = {
		BookCategory: bookCategoryClass.BookCategory,
		AESEncrypt: encoder.AESEncrypt,
		QueryStringParser: queryStringParser.getQueryString,
		user: SESSION_USER,
	};

	if (SESSION_USER == null) {
		sendObject.error_message = 'Thao tác bị lỗi, hãy tải lại trang!';
		res.render('./Public/error.ejs', sendObject);
		return;
	}

	var currentPassword = encoder.RSADecrypt(req.body.currentPassword);
	var newPassword = encoder.RSADecrypt(req.body.newPassword);
	var newPassword2 = encoder.RSADecrypt(req.body.newPassword2);

	if (!validate.validatePassword(currentPassword)) {
		res.send({ result: 'ERROR', message: "Mật khẩu cũ không hợp lệ!" });
		return;
	}
	if (!validate.validatePassword(newPassword)) {
		res.send({ result: 'ERROR', message: "Mật khẩu mới không hợp lệ!" });
		return;
	}
	if (!validate.validatePassword(newPassword2)) {
		res.send({ result: 'ERROR', message: "Nhập lại mật khẩu mới không hợp lệ!" });
		return;
	}
	if (newPassword.localeCompare(newPassword2) != 0) {
		res.send({ result: 'ERROR', message: "Mật khẩu mới nhập lại không khớp với mật khẩu bên trên!" });
		return;
	}

	personDAO.customerLogin(SESSION_USER.getAccount().getAccount(), encoder.MD5Encrypt(currentPassword), function(user) {
		if (user == null) {
			res.send({ result: 'ERROR', message: 'Mật khẩu nhập vào không chính xác!'});
			return;
		} else {
			user.getAccount().setPassword(encoder.MD5Encrypt(newPassword));
			personDAO.updateCustomer(user, function(result) {
				if (result === returnConstant.EDIT_CUSTOMERINFO_SUCCESS) {
					SESSION_USER_CART.setCustomer(user);
					req.session.user_cart = SESSION_USER_CART;
					res.send({ result: 'OK', message: user.getFullName().toString() });
				} else {
					SESSION_USER_CART.setCustomer(user);
					req.session.user_cart = SESSION_USER_CART;
					res.send({ result: 'FAILED', message: user.getFullName().toString() });
				}
			});
		}
	});
});

myServer.post('/add-item-to-cart', function(req, res) {
	var SESSION_USER = null;
	var SESSION_USER_CART = null;
	if (req.session.user_cart) {
		SESSION_USER_CART = jsonParser.toCart(req.session.user_cart);
		SESSION_USER = SESSION_USER_CART.getCustomer();
	}

	if (SESSION_USER == null) {
		res.send({ result: 'REQUIRE_LOGIN', message: 'Hãy đăng nhập để sử dụng chức năng này. Ấn OK để đến giao diện đăng nhập.'});
		return;
	}

	if (SESSION_USER_CART == null) {
		res.send({ result: 'ERROR', message: 'Thao tác bị lỗi, hãy ấn tải lại trang!'});
		return;
	}

	var query = req.body.key;
	query = queryString.parse(encoder.AESDecrypt(query));

	var bookId = query.id;
	var kind = query.kind;
	if (!bookId || !kind) {
		res.send({ result: 'ERROR', message: 'Thao tác bị lỗi, hãy ấn tải lại trang!'});
		return;
	}

	if (kind == 0) {
		bookDAO.getSchoolBookById(bookId, function(book) {
			if (book != null) {
				var item = new orderItemClass.OrderItem();
				item.setItem(book);
				item.setQuantity(1);
				SESSION_USER_CART.addItem(item);
				req.session.user_cart = SESSION_USER_CART;
				res.send({ result: 'OK', message: book.getName() });
			}
		});
	} else if (kind == 1) {
		bookDAO.getScienceBookById(bookId, function(book) {
			if (book != null) {
				var item = new orderItemClass.OrderItem();
				item.setItem(book);
				item.setQuantity(1);
				SESSION_USER_CART.addItem(item);
				req.session.user_cart = SESSION_USER_CART;
				res.send({ result: 'OK', message: book.getName() });
			}
		});
	} else if (kind == 2) {
		bookDAO.getComicById(bookId, function(book) {
			if (book != null) {
				var item = new orderItemClass.OrderItem();
				item.setItem(book);
				item.setQuantity(1);
				SESSION_USER_CART.addItem(item);
				req.session.user_cart = SESSION_USER_CART;
				res.send({ result: 'OK', message: book.getName() });
			}
		});
	} else if (kind == 3) {
		bookDAO.getNovelById(bookId, function(book) {
			if (book != null) {
				var item = new orderItemClass.OrderItem();
				item.setItem(book);
				item.setQuantity(1);
				SESSION_USER_CART.addItem(item);
				req.session.user_cart = SESSION_USER_CART;
				res.send({ result: 'OK', message: book.getName() });
			}
		});
	} else if (kind == 4) {
		bookDAO.getReferenceBookById(bookId, function(book) {
			if (book != null) {
				var item = new orderItemClass.OrderItem();
				item.setItem(book);
				item.setQuantity(1);
				SESSION_USER_CART.addItem(item);
				req.session.user_cart = SESSION_USER_CART;
				res.send({ result: 'OK', message: book.getName() });
			}
		});
	}
});

myServer.post('/remove-item-from-cart', function(req, res) {
	var SESSION_USER = null;
	var SESSION_USER_CART = null;
	if (req.session.user_cart) {
		SESSION_USER_CART = jsonParser.toCart(req.session.user_cart);
		SESSION_USER = SESSION_USER_CART.getCustomer();
	}

	if (SESSION_USER == null) {
		res.send({ result: 'REQUIRE_LOGIN', message: 'Hãy đăng nhập để sử dụng chức năng này!'});
		return;
	}

	if (SESSION_USER_CART == null) {
		res.send({ result: 'ERROR', message: 'Thao tác bị lỗi, hãy ấn tải lại trang!'});
		return;
	}

	var query = req.body.key;
	query = queryString.parse(encoder.AESDecrypt(query));

	var id = query.id;
	if (!id) {
		res.send({ result: 'ERROR', message: 'Thao tác bị lỗi, hãy ấn tải lại trang!'});
		return;
	}

	var callBackTimes = 0;

	bookDAO.getSchoolBookById(id, function(book) {
		callBackTimes++;
		if (book != null) {
			var item = new orderItemClass.OrderItem();
			item.setItem(book);
			SESSION_USER_CART.removeItem(item);
			req.session.user_cart = SESSION_USER_CART;
		}
		if (callBackTimes == bookCategoryClass.BookCategory.length) {
			res.send({ result: 'OK', message: '' });
		}
	});

	bookDAO.getScienceBookById(id, function(book) {
		callBackTimes++;
		if (book != null) {
			var item = new orderItemClass.OrderItem();
			item.setItem(book);
			SESSION_USER_CART.removeItem(item);
			req.session.user_cart = SESSION_USER_CART;
		}
		if (callBackTimes == bookCategoryClass.BookCategory.length) {
			res.send({ result: 'OK', message: '' });
		}
	});

	bookDAO.getComicById(id, function(book) {
		callBackTimes++;
		if (book != null) {
			var item = new orderItemClass.OrderItem();
			item.setItem(book);
			SESSION_USER_CART.removeItem(item);
			req.session.user_cart = SESSION_USER_CART;
		}
		if (callBackTimes == bookCategoryClass.BookCategory.length) {
			res.send({ result: 'OK', message: '' });
		}
	});

	bookDAO.getNovelById(id, function(book) {
		callBackTimes++;
		if (book != null) {
			var item = new orderItemClass.OrderItem();
			item.setItem(book);
			SESSION_USER_CART.removeItem(item);
			req.session.user_cart = SESSION_USER_CART;
		}
		if (callBackTimes == bookCategoryClass.BookCategory.length) {
			res.send({ result: 'OK', message: '' });
		}
	});

	bookDAO.getReferenceBookById(id, function(book) {
		callBackTimes++;
		if (book != null) {
			var item = new orderItemClass.OrderItem();
			item.setItem(book);
			SESSION_USER_CART.removeItem(item);
			req.session.user_cart = SESSION_USER_CART;
		}
		if (callBackTimes == bookCategoryClass.BookCategory.length) {
			res.send({ result: 'OK', message: '' });
		}
	});
});

myServer.post('/remove-all-item-from-cart', function(req, res) {
	var SESSION_USER = null;
	var SESSION_USER_CART = null;
	if (req.session.user_cart) {
		SESSION_USER_CART = jsonParser.toCart(req.session.user_cart);
		SESSION_USER = SESSION_USER_CART.getCustomer();
	}

	if (SESSION_USER == null) {
		res.send({ result: 'REQUIRE_LOGIN', message: 'Hãy đăng nhập để sử dụng chức năng này!'});
		return;
	}

	if (SESSION_USER_CART == null) {
		res.send({ result: 'ERROR', message: 'Thao tác bị lỗi, hãy ấn tải lại trang!'});
		return;
	}

	SESSION_USER_CART.removeAllItems();
	req.session.user_cart = SESSION_USER_CART;
	res.send({ result: 'OK', message: '' });
});

myServer.post('/get-public-key', function(req, res) {
	var absolutePath = path.resolve('library/security/RSAPublicKey.txt');
	var publicKey = fs.readFileSync(absolutePath, "utf8");
	res.send({ result: 'OK', message: publicKey });
});

myServer.post('/direct-pay', function(req, res) {
	var SESSION_USER = null;
	var SESSION_USER_CART = null;
	if (req.session.user_cart) {
		SESSION_USER_CART = jsonParser.toCart(req.session.user_cart);
		SESSION_USER = SESSION_USER_CART.getCustomer();
	}

	if (SESSION_USER == null) {
		res.send({ result: 'ERROR', message: 'Thao tác bị lỗi, hãy ấn tải lại trang!'});
		return;
	}

	var shippingType = encoder.RSADecrypt(req.body.shippingType);
	var receiver;
	if (shippingType == 1) {							//To another address
		var name = encoder.RSADecrypt(req.body.name);
		var phone = encoder.RSADecrypt(req.body.phone);
		var province = encoder.RSADecrypt(req.body.province);
		var city = encoder.RSADecrypt(req.body.city);
		var street = encoder.RSADecrypt(req.body.street);
		var homeindex = encoder.RSADecrypt(req.body.homeindex);
		var desc = encoder.RSADecrypt(req.body.desc);

		var person = new personClass.Person(-1);

		var personFullName;
		if (name.length <= 0) {
			personFullName = new fullNameClass.FullName('', '', '');
		} else {
			var nameSplitted = name.split(' ');
			var firstName = nameSplitted[0];
			if (nameSplitted.length == 1) {
				personFullName = new fullNameClass.FullName(firstName, '', '');
			} else if (nameSplitted.length == 2) {
				var lastName = nameSplitted[1];
				personFullName = new fullNameClass.FullName(firstName, '', lastName);
			} else {
				var midName = '';
				for (var j = 1; j < nameSplitted.length - 1; j++) {
					midName += nameSplitted[j];
				}
				var lastName = nameSplitted[nameSplitted.length - 1];
				personFullName = new fullNameClass.FullName(firstName, midName, lastName);
			}
		}
		person.setFullName(personFullName);
		person.setPhoneNumber(phone);
		person.setAddress(new addressClass.Address(-1, province, city, street, homeindex, '', ''));
		person.setDescription(desc);
		
		receiver = person;
	} else if (shippingType == 0) {							//To current address
		receiver = SESSION_USER;
	}

	var paymentMethod = new paymentMethodClass.PaymentMethod(-1);
	paymentMethod.setStatus(returnConstant.PAYMENTMETHOD_UNPAID);

	var order = new orderClass.Order(-1);
	order.setCart(SESSION_USER_CART);
	order.setDate(new Date());
	order.setPaymentMethod(paymentMethod);
	order.setStatus(returnConstant.ORDER_REQUESTING);

	orderDAO.addOrder(order, function() {
		SESSION_USER_CART.removeAllItems();
		req.session.user_cart = SESSION_USER_CART;
		res.send({ result: 'OK', message: 'ORDER_' + order.getId()});
	});
});
// End

//BACK-END
//GET Methods
myServer.get('/backend-tbl-address', function(req, res) {
	res.render('./Backend/tbl-address.ejs');
});
myServer.get('/backend-tbl-book', function(req, res) {
	res.render('./Backend/tbl-book.ejs');
});
myServer.get('/backend-tbl-person', function(req, res) {
	res.render('./Backend/tbl-person.ejs');
});
myServer.get('/backend-tbl-publisher', function(req, res) {
	res.render('./Backend/tbl-publisher.ejs');
});
myServer.get('/backend-tbl-account', function(req, res) {
	res.render('./Backend/tbl-account.ejs');
});
myServer.get('/backend-tbl-author', function(req, res) {
	res.render('./Backend/tbl-author.ejs');
});
myServer.get('/backend-tbl-bank', function(req, res) {
	res.render('./Backend/tbl-bank.ejs');
});
myServer.get('/backend-tbl-comic', function(req, res) {
	res.render('./Backend/tbl-comic.ejs');
});
myServer.get('/backend-tbl-customer', function(req, res) {
	res.render('./Backend/tbl-customer.ejs');
});
myServer.get('/backend-tbl-customeraccount', function(req, res) {
	res.render('./Backend/tbl-customeraccount.ejs');
});
myServer.get('/backend-tbl-importbook', function(req, res) {
	res.render('./Backend/tbl-importbook.ejs');
});
myServer.get('/backend-tbl-novel', function(req, res) {
	res.render('./Backend/tbl-novel.ejs');
});
myServer.get('/backend-tbl-order', function(req, res) {
	res.render('./Backend/tbl-order.ejs');
});
myServer.get('/backend-tbl-orderitem', function(req, res) {
	res.render('./Backend/tbl-orderitem.ejs');
});
myServer.get('/backend-tbl-paymentmethod', function(req, res) {
	res.render('./Backend/tbl-paymentmethod.ejs');
});
myServer.get('/backend-tbl-useradmin', function(req, res) {
	res.render('./Backend/tbl-useradmin.ejs');
});
myServer.get('/backend-tbl-referencebook', function(req, res) {
	res.render('./Backend/tbl-referencebook.ejs');
});
myServer.get('/backend-tbl-schoolbook', function(req, res) {
	res.render('./Backend/tbl-schoolbook.ejs');
});
myServer.get('/backend-tbl-sciencebook', function(req, res) {
	res.render('./Backend/tbl-sciencebook.ejs');
});
myServer.get('/backend-tbl-shipping', function(req, res) {
	res.render('./Backend/tbl-shipping.ejs');
});
myServer.get('/backend-index', function(req, res) {
	res.render('./Backend/index.ejs');
});
myServer.get('/backend-page-login', function(req, res) {
	res.render('./Backend/page-login.ejs');
});
myServer.get('/backend-page-register', function(req, res) {
	res.render('./Backend/page-register.ejs');
});
myServer.get('/backend-page-forget', function(req, res) {
	res.render('./Backend/page-forget.ejs');
});
myServer.get('/backend-statistic-month', function(req, res) {
	res.render('./Backend/statistic-month.ejs');
});
myServer.get('/backend-statistic-quaterly', function(req, res) {
	res.render('./Backend/statistic-quaterly.ejs');
});
myServer.get('/backend-statistic-week', function(req, res) {
	res.render('./Backend/statistic-week.ejs');
});
myServer.get('/backend-statistic-year', function(req, res) {
	res.render('./Backend/statistic-year.ejs');
});
//End

//POST Methods
myServer.post('/backend-tbl-address'), function(req, res) {

}
myServer.post('/backend-tbl-book'), function(req, res) {

}
myServer.post('/backend-tbl-person'), function(req, res) {

}
myServer.post('/backend-tbl-publisher'), function(req, res) {

}
myServer.post('/backend-tbl-account'), function(req, res) {

}
myServer.post('/backend-tbl-author'), function(req, res) {

}
myServer.post('/backend-tbl-bank'), function(req, res) {

}
myServer.post('/backend-tbl-comic'), function(req, res) {

}
myServer.post('/backend-tbl-customer'), function(req, res) {

}
myServer.post('/backend-tbl-customeraccount'), function(req, res) {

}
myServer.post('/backend-tbl-importbook'), function(req, res) {

}
myServer.post('/backend-tbl-novel'), function(req, res) {

}
myServer.post('/backend-tbl-order'), function(req, res) {

}
myServer.post('/backend-tbl-orderitem'), function(req, res) {

}
myServer.post('/backend-tbl-paymentmethod'), function(req, res) {

}
myServer.post('/backend-tbl-referencebook'), function(req, res) {

}
myServer.post('/backend-tbl-schoolbook'), function(req, res) {

}
myServer.post('/backend-tbl-sciencebook'), function(req, res) {

}
myServer.post('/backend-tbl-shipping'), function(req, res) {

}
myServer.post('/backend-tbl-useradmin'), function(req, res) {

}
//End
//END