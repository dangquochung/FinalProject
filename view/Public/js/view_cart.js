$(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#archon").offset().top - 100
    }, 1000);
});

function removeBookFromCart(queryString) {
    openDialog("Xóa sách khỏi giỏ hàng", "Bạn xác nhận xóa sách này khỏi giỏ hàng?", function() {
		$.ajax({
			url: '/remove-item-from-cart',
			type: 'POST',
			data: {
                key: queryString,
            },
			success: function(data) {
				if (data.result === "OK") {
					window.location.reload(true);
				} else if (data.result === "ERROR") {
					openDialog("Xóa sách khỏi giỏ thất bại", "Lỗi: " + data.message + "!", function() {});
				} else if (data.result === "REQUIRE_LOGIN") {
					openDialog("Yêu cầu đăng nhập", data.message, function() {
						window.location.href = "/login";
					});
				}
			},
			error: function(xhl, type, err) {
				alert(err);
			}
		});
	});
}

function emptyCart() {
    openDialog("Xóa sách khỏi giỏ hàng", "Bạn xác nhận xóa toàn bộ sách khỏi giỏ hàng?", function() {
		$.ajax({
			url: '/remove-all-item-from-cart',
			type: 'POST',
			data: {},
			success: function(data) {
				if (data.result === "OK") {
					window.location.reload(true);
				} else if (data.result === "ERROR") {
					openDialog("Xóa sách khỏi giỏ thất bại", "Lỗi: " + data.message + "!", function() {});
				} else if (data.result === "REQUIRE_LOGIN") {
					openDialog("Yêu cầu đăng nhập", data.message, function() {
						window.location.href = "/login";
					});
				}
			},
			error: function(xhl, type, err) {
				alert(err);
			}
		});
	});
}

function gotoPay() {
	window.location.href = "/pay";
}