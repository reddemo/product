//表单模块
var editableTable = new EditableTable({
    jqWrapper: jQuery('#bang-gift'),
});
editableTable.init();

var render = _.template($('#formhtml').html());
var markup = render({
    name: 'mb',
    text: '手机号',
    attrs: [{
        name: 'required',
        text: '必填',
        value: ''
    }, {
        name: 'required',
        text: '必填',
        value: ''
    }, {
        name: 'required',
        text: '必填',
        value: ''
    }]
});

$('.standard-entry').on('change', 'input', function() {
    var jqInput = $(this);
    if (jqInput.prop('checked')) {

        var entry = jqInput.html();
        var html = render({
            name: jqInput.attr('name'),
            text: jqInput.attr('x-text'),
            attrs: []
        });
        $('.list-group ').prepend(html);
    } else {
    	$('[x-name="'+jqInput.attr('name')+'"]','.list-group').remove();
    }

});

$('#addExt').on('click', function() {
    var jqInput = $(this);
    var jqText=jqInput.closest('.col-lg-10').find('input[type="text"]');
    if (jqText.val()) {

        var entry = jqInput.html();
        var html = render({
            name: 'ext',
            text: jqText.val(),
            attrs: []
        });
        $('.list-group ').prepend(html);
        jqText.val('');
    }

});

$('.list-group').on('click','.removeEntry',function(){
	$(this).parent().remove();
})
