$(document).ready(function(){
	$("#sticker").sticky({topSpacing:0});

	$(document).ready(function(){
		$('[data-toggle="tooltip"]').tooltip(); 
	});
});

function viewBook(queryString) {
	window.location.href = "/view-book-info" + "?key=" + queryString;
}

function searchBook() {
	var searchKey = $('#tf_SearchKey').val();

	if (searchKey.length <= 0) {
		alert('Hãy nhập từ khóa cần tìm kiếm.');
		return;
	}

	$.ajax({
		url: '/search-book',
		type: 'POST',
		data: {
			search_key: RSAEncrypt(searchKey),
		},
		success: function(data) {
			window.location.href = data;
		},
		error: function(xhl, type, err) {
			alert(err);
		}
	});
}

function onLogout(accountName) {
	openDialog("Xác nhận đăng xuất", "Bạn xác nhận đăng xuất khỏi hệ thống từ tài khoản '" + accountName + "'?", function() {
		$.ajax({
			url: '/logout',
			type: 'POST',
			data: {},
			success: function(data) {
				if (data.result === "OK") {
					window.location.href = "/";
				} else if (data.result === "ERROR") {
					openDialog("Lỗi đăng xuất", "Lỗi: " + data.message + "!", function() {});
				}
			},
			error: function(xhl, type, err) {
				alert(err);
			}
		});
	});
}

function addBookToCart(queryString) {
	$.ajax({
		url: '/add-item-to-cart',
		type: 'POST',
		data: {
			key: queryString,
		},
		success: function(data) {
			if (data.result === "OK") {
				openDialog("Thêm vào giỏ thành công", "Thêm sách  '" + data.message + "' vào giỏ hàng thành công!", function() {
					location.reload(true);
				});
			} else if (data.result === "ERROR") {
				openDialog("Thêm vào giỏ thất bại", "Lỗi: " + data.message, function() {});
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
}