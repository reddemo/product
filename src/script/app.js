//表单模块
// var editableTable = new EditableTable({
//     jqWrapper: jQuery('#bang-gift'),
// });
// editableTable.init();
function Form() {
    var standard = config.standard;
    var exts = config.extended;
    var renderField = _.template($('#formhtml').html());
    var renderField2 = _.template($('#formhtml2').html());
    var renderAttr = _.template($('#tag').html());
    var renderFields=_.template($('#tplfields').html());

    var allfield1=config.standard;
    var allfield2=config.extended;

    var allfield1HTML=_.reduce(allfield1,function(s,x,k,allfield1){
        return s+renderField(x);
    },'');
    var allfield2HTML=_.reduce(allfield2,function(s,x,k,allfield2){
        return s+renderField2(x);
    },'');
    var allfieldsHTML=allfield1HTML+allfield2HTML;

    $('.list-group ').html(allfieldsHTML);
    //渲染表单域集合
    var fields=renderFields(config.fields);
    $('.fieldswp').html(fields);

    var checkedFields=_.map(config.standard,function(x,k,standard){
        return '.fieldswp [name="'+k+'"]'
    });
    $(checkedFields.join(',')).attr('checked',true);

    $('.standard-entry').on('change', 'input', function() {
        var jqInput = $(this);
        if (jqInput.prop('checked')) {

            var entry = jqInput.html();
            var html = renderField({
                name: jqInput.attr('name'),
                text: jqInput.attr('x-text'),
                common: []
            });
            standard[jqInput.attr('name')] = {
                name: jqInput.attr('name'),
                text: jqInput.attr('x-text'),
                common: []
            }
            $('.list-group ').prepend(html);
        } else {
            $('[x-name="' + jqInput.attr('name') + '"]', '.list-group').remove();
            delete standard[jqInput.attr('name')]
        }

    });

    // console.log($('#addExt'))

    $('#addExt').on('click', function() {
        var name = _.uniqueId('ext');
        var jqInput = $(this);
        var jqText = jqInput.closest('.col-lg-10').find('input[type="text"]');
        var value = $.trim(jqText.val());
        console.log(value)
        if (value) {

            if (_.keys(exts).length >= 5) {
                alert('扩展属性最多只能有五个');
                return;
            }

            _.map(exts, function(e, i) {
                if (value == e.text) {
                    alert('重复了，请修改后再提交');
                    throw '数据校验失败';
                }
            })

            var entry = jqInput.html();
            var html = renderField2({
                name: name,
                text: value,
                common: {}
            });
            jqText.val('');
            $('.list-group ').prepend(html);
            exts[name] = {
                name: name,
                text: value,
                common: {}
            };
        }

    });

    $(document).on('click', '.entry .tag a', function() {
        var name = $(this).closest('.entry').attr('x-name');
        var tag = $(this).attr('x-name');
        $(this).parent().remove();

        delete standard[name].common[tag];

    });

    $(document).on('click', '.removeEntry', function() {

        delete exts[$(this).closest('.entry').remove().attr('x-name')];
    });

    $(document).on('click', '.js-custom li', function(e) {
        e.stopPropagation();
        //选出所有的选中属性
        // var checked=$(this).closest('.js-custom').find('.js-check:checked');
    });

    $(document).on('click', '.js-custom .js-attr-submit', function(e) {
        e.stopPropagation();
        //选出所有的选中属性
        var checked = $(this).closest('.js-custom').find('.js-check:checked');
        checked.each(function(i, e) {
            if ($(e).attr('x-value') == '1') {
                var value = $.trim($(e).next().next().val());
                if (!value) {
                    alert('既然选中了该属性，那么该属性值不能为空');
                    throw '数据校验失败'
                    return;
                }
            }
        });
        var common = _.reduce(checked, function(c, e, i) {
            c[$(e).attr('x-name')] = {
                name: $(e).attr('x-name'),
                text: $(e).attr('x-text'),
                value: $.trim($(e).next().next().val())
            };
            return c;
        }, {});
        if (/ext\d/.test($(this).closest('.entry').attr('x-name'))) {
            exts[$(this).closest('.entry').attr('x-name')].common = common;
        } else {
            standard[$(this).closest('.entry').attr('x-name')].common = common;
        }
        $(this).closest('.entry').find('.tag-wrapper').html(_.reduce(common, function(c, e, i) {
            return c + renderAttr(e);
        }, ''));
        $(document).trigger('click');
    });
    return {
        standard: standard,
        extended: exts
    };
}

var data = new Form();

$('#submitform').on('click', function() {
    if (_.keys(data.standard).length == 0 && _.keys(data.extended).length == 0) {
        alert('数据空！');
        return;
    }
    var j = 1;
    var extended = _.reduce(data.extended, function(c, e, i) {
        c['ext' + j] = e;
        e.name = 'ext' + j;
        j++;
        return c
    }, {});
    var post = {
        standard: data.standard,
        extended: extended,
        entire: _.extend(data.standard, extended)
    };

    console.log(encodeURI(JSON.stringify({
        token:post.entire,
        id:3
    })))

    function renderForm(conf) {

        var tplInput = _.template('<input name="<%=name%>" >');
        var inputs = _.map(conf.token, function(x, k, entire) {
            return tplInput({ name: k });
        });
        inputs.push('<input class="emao-zt-submit">');
        var html = '<form class="emao-zt-form" x-conf="' + encodeURI(JSON.stringify({
            token: conf.token,
            id: conf.id
        })) + '">' + '\n  ' + inputs.join('\n  ') + '\n</form>';

        return html;
    }
});
