$(function() {
    $publicKey = null;
    getPublicKey();
});

function getPublicKey() {
    $.ajax({
		url: '/get-public-key',
		type: 'POST',
		data: {},
		success: function(data) {
			if (data.result === 'OK') {
                $publicKey = data.message;
            }
		},
		error: function(xhl, type, err) {
            openDialog("Lỗi tải trang", "Có lỗi xảy ra trong quá trình tải trang, hãy tải lại trang để khắc phục!", function() {
                window.location.href = "/";
            });
		}
	});
}

function RSAEncrypt(text) {
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey($publicKey);
    var encrypted = encrypt.encrypt(text);
    return encrypted;
}