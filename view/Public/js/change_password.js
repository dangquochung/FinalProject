$(function() {
    $('#inputForm').validate({
		submitHandler: function(form) {
			onChangePassword();
		}
    });
    
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#anchor").offset().top - 100
    }, 1000);
});

function onChangePassword() {
    var currentPassword = $('#tf_CurrentPassword').val();
    var newPassword = $('#tf_NewPassword').val();
    var newPassword2 = $('#tf_NewPassword2').val();

    $('#error_message').hide();
    $('#error_message').html('');
    if (currentPassword.length <= 0) {
        $('#error_message').show();
        $('#error_message').html('Mật khẩu hiện tại không được để trống!');
        $('#tf_CurrentPassword').focus();
        return false;
    }
    if (newPassword.length <= 0) {
        $('#error_message').show();
        $('#error_message').html('Mật khẩu mới không được để trống!');
        $('#tf_NewPassword').focus();
        return false;
    }
    if (newPassword2.length <= 0) {
        $('#error_message').show();
        $('#error_message').html('Hãy nhập lại mật khẩu mới!');
        $('#tf_NewPassword2').focus();
        return false;
    }
    if (newPassword.localeCompare(newPassword2) != 0) {
        $('#error_message').show();
        $('#error_message').html('Mật khẩu mới nhập lại không khớp với mật khẩu bên trên!');
        $('#tf_NewPassword2').focus();
        return false;
    }

    $.ajax({
		url: '/change-password',
		type: 'POST',
		data: {
			currentPassword: RSAEncrypt(currentPassword),
			newPassword: RSAEncrypt(newPassword),
			newPassword2: RSAEncrypt(newPassword2),
		},
		success: function(data) {
			if (data.result === 'ERROR') {
                $('#error_message').show();
                $('#error_message').html(data.message);
            } else if (data.result === 'OK') {
                openDialog("Đổi mật khẩu thành công", "Mật khẩu của <b>" + data.message + "</b> đã được đổi thành công!", function() {
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