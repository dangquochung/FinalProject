var mySQL = require("mysql");

exports.getConnection = function() {
	return mySQL.createConnection({
		host: "localhost",
		user: "root", 
		password: "", 
		database: "book_store",
	});
}

/* TABLE BOOK */
exports.getBookTable = function() {
	return {
		tblName: "tblBook",
		fields: {
			id: "id",
			name: "name",
			authorId: "author_id",
			publisherId: "publisher_id",
			desc: "description",
			price: "price",
			icon: "icon",
			publishDate: "publish_date",
		},
	}
}

exports.getSchoolBookTable = function() {
	return {
		tblName: "tblSchoolBook",
		fields: {
			book_id: "book_id",
			grade: "grade",
			subject: "subject",
			type: "type",
		},
	};
}

exports.getScienceBookTable = function() {
	return {
		tblName: "tblScienceBook",
		fields: {
			book_id: "book_id",
			major: "major",
			type: "type",
		},
	};
}

exports.getComicTable = function() {
	return {
		tblName: "tblComic",
		fields: {
			book_id: "book_id",
			age: "age",
			type: "type",
		},
	};
}

exports.getNovelTable = function() {
	return {
		tblName: "tblNovel",
		fields: {
			book_id: "book_id",
			age: "age",
			type: "type",
		},
	};
}

exports.getReferenceBookTable = function() {
	return {
		tblName: "tblReferenceBook",
		fields: {
			book_id: "book_id",
			major: "major",
			type: "type",
		},
	};
}
/* END */

/* TABLE ADDRESS */
exports.getAddressTable = function() {
	return {
		tblName: "tblAddress",
		fields: {
			id: "id",
			province: "province",
			city: "city",
			street: "street",
			homeIndex: "home_index",
			desc: "description",
		},
	};
}
/* END */

/* TABLE PUBLISHER */
exports.getPublisherTable = function() {
	return {
		tblName: "tblPublisher",
		fields: {
			id: "id",
			name: "name",
			addressId: "address_id",
		},
	}
}
/* END */

/* TABLE PERSON */
exports.getPersonTable = function() {
	return {
		tblName: "tblPerson",
		fields: {
			id: "id",
			name: "name",
			gender: "gender",
			addressId: "address_id",
			doB: "dob",
			desc: "description",
			avarta: "avarta",
			phone: "phone",
		},
	};
}

exports.getAuthorTable = function() {
	return {
		tblName: "tblAuthor",
		fields: {
			person_id: "person_id",
			major: "major",
		},
	};
}

exports.getCustomerTable = function() {
	return {
		tblName: "tblCustomer",
		fields: {
			person_id: "person_id",
			account_id: "account_id",
		},
	};
}
/* END */

/* TABLE ACCOUNT */
exports.getAccountTable = function() {
	return {
		tblName: "tblAccount",
		fields: {
			id: "id",
			account: "account",
			password: "password",
			email: "email",
			icon: "icon",
		},
	};
}

exports.getCustomerAccountTable = function() {
	return {
		tblName: "tblCustomerAccount",
		fields: {
			account_id: "account_id",
			type: "type",
			point: "point",
		},
	};
}
/* END */

/* TABLE BANK */
exports.getBankTable = function() {
	return {
		tblName: "tblBank",
		fields: {
			id: "id",
			name: "name",
			icon: "icon",
			link: "link",
		},
	};
}
/* END */

/* TABLE ORDER */
exports.getOrderTable = function() {
	return {
		tblName: "tblOrder",
		fields: {
			id: "id",
			date: "date",
			status: "status",
		},
	};
}

exports.getPaymentMethodTable = function() {
	return {
		tblName: "tblPaymentMethod",
		fields: {
			order_id: "order_id",
			status: "status",
		},
	};
}

exports.getOrderItemTable = function() {
	return {
		tblName: "tblOrderItem",
		fields: {
			order_id: "order_id",
			book_id: "book_id",
			quantity: "quantity",
		},
	};
}

exports.getShippingTable = function() {
	return {
		tblName: "tblShipping",
		fields: {
			order_id: "order_id",
			receiver_id: "receiver_id",
		},
	};
}
/* END */

/* STATISTIC TABLES */
exports.getImportBookTable = function() {
	return {
		tblName: "tblImportBook",
		fields: {
			book_id: "book_id",
			price: "price",
			quantity: "quantity",
			date: "date",
		},
	};
}
/* END */