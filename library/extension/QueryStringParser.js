var querystring = require('querystring');
exports.getQueryString = function(object) {
	return querystring.stringify(object);
};