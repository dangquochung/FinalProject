class Book {
	constructor(id) {
		this.id = id;
		this.quantity = 0;
	}

	getId() {
		return this.id;
	}

	getName() {
		return this.name;
	}

	setName(name) {
		this.name = name;
	}

	getAuthor() {
		return this.author;
	}

	setAuthor(author) {
		this.author = author;
	}

	getPublisher() {
		return this.publisher;
	}

	setPublisher(publisher) {
		this.publisher = publisher;
	}

	getDescription() {
		return this.desc;
	}

	setDescription(desc) {
		this.desc = desc;
	}

	getPrice() {
		return this.price;
	}

	setPrice(price) {
		this.price = price;
	}

	getIcon() {
		return this.icon;
	}

	setIcon(icon) {
		this.icon = icon;
	}
	
	getPublishDate() {
		return this.publishDate;
	}

	setPublishDate(publishDate) {
		this.publishDate = publishDate;
	}

	getQuantity() {
		return this.quantity;
	}

	setQuantity(quantity) {
		this.quantity = quantity;
	}
}
exports.Book = Book;

class SchoolBook extends Book {
	constructor(id) {
		super(id);
	}

	getGrade() {
		return this.grade;
	}

	setGrade(grade) {
		this.grade = grade;
	}

	getSubject() {
		return this.subject;
	}

	setSubject(subject) {
		this.subject = subject;
	}

	getType() {
		return this.type;
	}

	setType(type) {
		this.type = type;
	}
}
exports.SchoolBook = SchoolBook;

class Comic extends Book {
	constructor(id) {
		super(id);
	}

	getAge() {
		return this.age;
	}

	setAge(age) {
		this.age = age;
	}

	getType() {
		return this.type;
	}

	setType(type) {
		this.type = type;
	}
}
exports.Comic = Comic;

class Novel extends Book {
	constructor(id) {
		super(id);
	}

	getAge() {
		return this.age;
	}

	setAge(age) {
		this.age = age;
	}

	getType() {
		return this.type;
	}

	setType(type) {
		this.type = type;
	}
}
exports.Novel = Novel;

class ReferenceBook extends Book {
	constructor(id) {
		super(id);
	}

	getMajor() {
		return this.major;
	}

	setMajor(major) {
		this.major = major;
	}

	getType() {
		return this.type;
	}

	setType(type) {
		this.type = type;
	}
}
exports.ReferenceBook = ReferenceBook;

class ScienceBook extends Book {
	constructor(id) {
		super(id);
	}

	getMajor() {
		return this.major;
	}

	setMajor(major) {
		this.major = major;
	}

	getType() {
		return this.type;
	}

	setType(type) {
		this.type = type;
	}
}
exports.ScienceBook = ScienceBook;