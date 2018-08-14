$(function() {
    $('#shippingAddressForm').validate({
		submitHandler: function(form) {
		    makeOrder();
		}
    });
});

function makeOrder() {
    var rb_DirectPay = $('#rb_DirectPay');
    var rb_BankPay = $('#rb_BankPay');
    var rb_ToCurrentAddress = $('#rb_ToCurrentAddress');
    var rb_ToNewAddress = $('#rb_ToNewAddress');

    var data = {};
    if (rb_ToCurrentAddress.is(":checked")) {
        data.shippingType = RSAEncrypt(0);
    } else if (rb_ToNewAddress.is(":checked")) {
        var name = $('#tf_Name').val();
        var phone = $('#tf_Phone').val();
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
            $('#tf_Phone').focus();
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

        data.shippingType = RSAEncrypt(1);
        data.name = RSAEncrypt(name);
        data.phone = RSAEncrypt(phone);
        data.province = RSAEncrypt(province);
        data.city = RSAEncrypt(city);
        data.street = RSAEncrypt(street);
        data.homeindex = RSAEncrypt(homeindex);
        data.desc = RSAEncrypt(desc);
    }

    if (rb_BankPay.is(":checked")) {
        $.ajax({
            url: '/bank-pay',
            type: 'POST',
            data: data,
            success: function(data) {
                if (data.result === 'ERROR') {
                    $('#error_message').show();
                    $('#error_message').html(data.message);
                } else if (data.result === 'OK') {
                    openDialog("Đặt hàng thành công", "Đơn hàng của bạn đã được ghi lại, nhân viên sẽ liên lạc với bạn trong thời gian sớm nhất!", function() {});
                }
            },
            error: function(xhl, type, err) {
                $('#error_message').show();
                $('#error_message').html(err);
            }
        });
    }

    if (rb_DirectPay.is(":checked")) {
        $.ajax({
            url: '/direct-pay',
            type: 'POST',
            data: data,
            success: function(data) {
                if (data.result === 'ERROR') {
                    $('#error_message').show();
                    $('#error_message').html(data.message);
                } else if (data.result === 'OK') {
                    openDialog("Đặt hàng thành công", "Đơn hàng của bạn (" + data.message + ") đã được ghi lại, nhân viên sẽ liên lạc với bạn trong thời gian sớm nhất!", function() {
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
    
}