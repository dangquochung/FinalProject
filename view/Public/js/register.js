$(function() {
    $('#inputForm').validate({
		submitHandler: function(form) {
			onRegister();
		}
    });

    $([document.documentElement, document.body]).animate({
        scrollTop: $("#anchor").offset().top - 100
    }, 1000);
});

function onRegister() {
    var account = $('#tf_Account').val();
    var password = $('#tf_Password').val();
    var name = $('#tf_Name').val();
    var email = $('#tf_Email').val();
    var phone = $('#tf_PhoneNumber').val();
    var doB = $('#tf_DoB').val();
    var gender = $('#cb_Gender').val();
    var province = $('#tf_Province').val();
    var city = $('#tf_City').val();
    var street = $('#tf_Street').val();
    var homeindex = $('#tf_HomeIndex').val();
    var desc = $('#ta_Desc').val();
    var cbAgree = $('#cb_AllowLisence');

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
    if (name.length <= 0) {
        $('#error_message').show();
        $('#error_message').html('Họ tên không được để trống!');
        $('#tf_Name').focus();
        return false;
    }
    if (email.length <= 0) {
        $('#error_message').show();
        $('#error_message').html('Địa chỉ email không được để trống!');
        $('#tf_Email').focus();
        return false;
    }
    if (phone.length <= 0) {
        $('#error_message').show();
        $('#error_message').html('Số điện thoại không được để trống!');
        $('#tf_PhoneNumber').focus();
        return false;
    }
    if (doB.length <= 0) {
        $('#error_message').show();
        $('#error_message').html('Ngày sinh không được để trống!');
        $('#tf_DoB').focus();
        return false;
    }
    if (gender.length <= 0) {
        $('#error_message').show();
        $('#error_message').html('Giới tính không được để trống!');
        $('#tf_Province').focus();
        return false;
    }
    if (province.length <= 0) {
        $('#error_message').show();
        $('#error_message').html('Tỉnh/Thành phố không được để trống!');
        $('#tf_Province').focus();
        return false;
    }
    if (city.length <= 0) {
        $('#error_message').show();
        $('#error_message').html('Quận/Huyện không được để trống!');
        $('#tf_City').focus();
        return false;
    }
    if (street.length <= 0) {
        $('#error_message').show();
        $('#error_message').html('Xã/Đường không được để trống!');
        $('#tf_Street').focus();
        return false;
    }
    if (homeindex.length <= 0) {
        $('#error_message').show();
        $('#error_message').html('Số nhà không được để trống!');
        $('#tf_HomeIndex').focus();
        return false;
    }
    if (!cbAgree.is(":checked")) {
        $('#error_message').show();
        $('#error_message').html('Hãy đọc kỹ điều khoản và xác nhận đồng ý trước khi tiến hành đăng ký thành viên!');
        $('#cb_AllowLisence').focus();
        return false;
    }

    $.ajax({
		url: '/register',
		type: 'POST',
		data: {
			account: RSAEncrypt(account),
			password: RSAEncrypt(password),
			name: RSAEncrypt(name),
			email: RSAEncrypt(email),
			phone: RSAEncrypt(phone),
			doB: RSAEncrypt(doB),
			gender: RSAEncrypt(gender),
			province: RSAEncrypt(province),
			city: RSAEncrypt(city),
			street: RSAEncrypt(street),
			homeindex: RSAEncrypt(homeindex),
			desc: RSAEncrypt(desc),
		},
		success: function(data) {
			if (data.result === 'ERROR') {
                $('#error_message').show();
                $('#error_message').html(data.message);
            } else if (data.result === 'OK') {
                openDialog("Chào mừng", "Chào mừng <b>" + data.message + "</b>!", function() {
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