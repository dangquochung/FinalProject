function openDialog(title, content, onOK) {
    $('#dialog_title').html(title);
    $('#dialog_content').html(content);
    $('#btnOK').click(function() {
        onOK();
        $('#dialog_box').modal('hide');
    });
    $('#btnCancel').click(function() {
        $('#dialog_box').modal('hide');
    });
    $('#dialog_box').modal('show');
}