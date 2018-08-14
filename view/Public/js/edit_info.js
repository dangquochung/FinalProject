$(function() {
    $('#btn_BrowseFile').on('change', function () {
        var fileReader = new FileReader();
        fileReader.onload = function () {
            var data = fileReader.result;
            $('#img_Avarta').attr('src', data);
            $selectedAvarta = data;
        };
        fileReader.readAsDataURL($('#btn_BrowseFile').prop('files')[0]);
    });
    
    $('#inputForm').validate({
		submitHandler: function(form) {
			onUpdateSelfInfo();
		}
    });

    $([document.documentElement, document.body]).animate({
        scrollTop: $("#anchor").offset().top - 100
    }, 1000);
});

function onUpdateSelfInfo() {
    var name = $('#tf_Name').val();
    var avarta = $selectedAvarta;
    var phone = $('#tf_PhoneNumber').val();
    var doB = $('#tf_DoB').val();
    var gender = $('#cb_Gender').val();
    var province = $('#tf_Province').val();
    var city = $('#tf_City').val();
    var street = $('#tf_Street').val();
    var homeindex = $('#tf_HomeIndex').val();
    var desc = $('#ta_Desc').val();

    if (name.length <= 0) {
        $('#error_message').show();
        $('#error_message').html('Họ tên không được để trống!');
        $('#tf_Name').focus();
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

    $.ajax({
		url: '/update-self-info',
		type: 'POST',
		data: {
            name: RSAEncrypt(name),
            avarta: RSAEncrypt(avarta),
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
                openDialog("Sửa thông tin thành công", "Thông tin của <b>" + data.message + "</b> đã được cập nhật thành công!", function() {
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