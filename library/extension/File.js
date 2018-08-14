const fs = require("fs");

exports.writeBase64ImageToFile = function(imgData, fileName) {
    const base64Data = imgData.replace(/^data:([A-Za-z-+/]+);base64,/, '');
    var path = "./view/Resources/User/" + fileName;
    fs.writeFile(path, base64Data, 'base64', function(err) {
    });
}

exports.isImageData = function(imgData) {
    var regex = /^data:([A-Za-z-+/]+);base64,/g;
    return regex.test(imgData);
}