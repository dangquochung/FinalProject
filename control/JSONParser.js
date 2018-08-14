const personClass = require('../model/person/Person.js');
const fullNameClass = require('../model/person/FullName.js');
const addressClass = require('../model/address/Address.js');
const accountClass = require('../model/person/Account.js');
const cartClass = require('../model/order/Cart.js');
const bookClass = require('../model/book/Book.js');
const publisherClass = require('../model/publisher/Publisher.js');
const orderItemClass = require('../model/order/OrderItem.js');

function toAddress(object) {
    var address = new addressClass.Address(object["id"]);
    address.setProvince(object["province"]);
    address.setCity(object["city"]);
    address.setStreet(object["street"]);
    address.setHomeIndex(object["homeIndex"]);
    address.setDescription(object["desc"]);
    return address;
}

function toPerson(object) {
    var person = new personClass.Person(object["id"]);
    
    var fullName = object["fullName"];
    var fullName = 
    person.setFullName(new fullNameClass.FullName(fullName.firstName, fullName.midName, fullName.lastName));
    person.setDoB(object["doB"]);
    person.setGender(object["gender"]);
    person.setAvarta(object["avarta"]);
    person.setDescription(object["desc"]);
    person.setAddress(toAddress(object["address"]));
    person.setPhoneNumber(object["phoneNumber"]);
    return person;
}

function toAccount(object) {
    var account = new accountClass.Account(object["id"]);
    account.setPassword(object["password"]);
    account.setIcon(object["icon"]);
    account.setEmail(object["email"]);
    account.setAccount(object["account"]);
    return account;
}

function toCustomerAccount(object) {
    var account = toAccount(object);
    var customerAccount = new accountClass.CustomerAccount(account.getId());
    customerAccount.setPassword(account.getPassword());
    customerAccount.setIcon(account.getIcon());
    customerAccount.setEmail(account.getEmail());
    customerAccount.setAccount(account.getAccount());
    customerAccount.setAccountType(object["accountType"]);
    customerAccount.setPoint(object["point"]);
    return customerAccount;
}

function toCustomer(object) {
    var person = toPerson(object);
    var customer = new personClass.Customer(person.getId());
    customer.setGender(person.getGender());
    customer.setFullName(person.getFullName());
    customer.setDoB(person.getDoB());
    customer.setDescription(person.getDescription());
    customer.setAvarta(person.getAvarta());
    customer.setAddress(person.getAddress());
    customer.setPhoneNumber(person.getPhoneNumber());
    customer.setAccount(toCustomerAccount(object["account"]));
    return customer;
}

function toAuthor(object) {
    var person = toPerson(object);
    var author = new personClass.Author(person.getId());
    author.setGender(person.getGender());
    author.setFullName(person.getFullName());
    author.setDoB(person.getDoB());
    author.setDescription(person.getDescription());
    author.setAvarta(person.getAvarta());
    author.setAddress(person.getAddress());
    author.setPhoneNumber(person.getPhoneNumber());
    author.setMajor(object["major"]);
    return author;
}

function toPublisher(object) {
    var publisher = new publisherClass.Publisher(object["id"]);
    publisher.setName(object["name"]);
    publisher.setAddress(toAddress(object["address"]));
    return publisher;
}

function toBook(object) {
    var book = new bookClass.Book(object["id"]);
    book.setName(object["name"]);
    book.setDescription(object["desc"]);
    book.setPrice(object["price"]);
    book.setIcon(object["icon"]);
    book.setAuthor(toAuthor(object["author"]));
    book.setPublisher(toPublisher(object["publisher"]));
    book.setPublishDate(object["publishDate"]);
    return book;
}

function toItem(object) {
    var item = new orderItemClass.OrderItem();
    item.setItem(toBook(object["item"]));
    item.setQuantity(object["quantity"]);
    return item;
}

exports.toCart = function(object) {
    var cart = new cartClass.Cart();
    cart.setCustomer(toCustomer(object['customer']));
    var listItems = object["listItems"];
    for (var i = 0; i < listItems.length; i++) {
        cart.addItem(toItem(listItems[i]));
    }
    return cart;
}