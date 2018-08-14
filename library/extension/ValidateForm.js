exports.validateString = function(str, isWhiteSpaceAllowed) {
	if (str.length < 0) return false;
	var regex;
	if (!isWhiteSpaceAllowed) {
		regex = /[\+\-\*\/\\\^\%\&\$\#\@\!\~\`\[\]\(\)\=\>\<\;\.\,\s]/g;
	} else {
		regex = /[\+\-\*\/\\\^\%\&\$\#\@\!\~\`\[\]\(\)\=\>\<\;\.\,]/g;
	}
	return (!regex.test(str));
}

exports.validatePassword = function(password) {
	if (password.length < 0) return false;
	var regex_1 = /[\-][\-]/g;
	var regex_2 = /[%]/g;
	return (!regex_1.test(password) && !regex_2.test(password));
}

exports.validateEmail = function(email) {
    if (email.length <= 0) return false;
	var regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

exports.validateDecimalNumber = function(number) {
    if (number.length <= 0) return false;
    var regex = /[0-9]/g;
    return regex.test(number);
}

exports.validateDate = function(date) {
    if (date.length <= 0) return false;
    var regex = /[01]?[0-9]\/^[0-3]?[0-9]\/[12][90][0-9][0-9]$/;
    return regex.test(date);
}

exports.validateGender = function(gender) {
    if (gender.length <= 0) return false;
    return (gender >= 0 && gender <= 3);
}

exports.validateDescription = function(desc) {
	if (desc.length < 0) return true;
	var regex_1 = /[\-][\-]/g;
	var regex_2 = /[%]/g;
	return (!regex_1.test(desc) && !regex_2.test(desc));
}