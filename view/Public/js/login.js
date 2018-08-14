$(function() {
    $('#inputForm').validate({
		submitHandler: function(form) {
			onLogin();
		}
    });

    $([document.documentElement, document.body]).animate({
        scrollTop: $("#archon").offset().top - 100
    }, 1000);
});

function onLogin() {
    var account = $('#tf_Account').val();
    var password = $('#tf_Password').val();

    $('#error_message').hide();
    $('#error_message').html('');
    if (account.length <= 0) {
        $('#error_message').show();
        $('#error_message').html('Tài khoản không được để trống!');
        $('#tf_Account').focus();
        return false;
    }
    if (password.length <= 0) {
        $('#error_message').show();
        $('#error_message').html('Mật khẩu không được để trống!');
        $('#tf_Password').focus();
        return false;
    }

    $.ajax({
		url: '/login',
		type: 'POST',
		data: {
			account: RSAEncrypt(account),
			password: RSAEncrypt(password),
		},
		success: function(data) {
			if (data.result === 'ERROR') {
                $('#error_message').show();
                $('#error_message').html(data.message);
            } else if (data.result === 'OK') {
                openDialog("Đăng nhập thành công", "Xin chào <b>" + data.message + "</b>!", function() {
                    window.location.href = "/";
                });
            }
		},
		error: function(xhl, type, err) {
			$('#error_message').show();
            $('#error_message').html(err);
		}
	});
}