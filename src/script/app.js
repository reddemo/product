//表单模块

function MaoEarth() {
    var jqContainer = jQuery('#table-wrapper');
    var jqSubmit=jQuery('.bang-wrapper .submitall');
    var jqModal = jQuery('#bang-city');
    init();

    var renderTr = _.template(jQuery('#tr').html()); //tr的动态模板
    var renderTable = _.template(jQuery('#tbody').html()); //拼出表格
    var render = function recur(table, father) { //递归的拼接tr，计算出正确的id和father
        return _.reduce(table, function(c, v, k, e) {
            v.id = _.filter([father, k], function(v) {
                return v !== null }).join('-');
            v.father = father;
            return v.children ? (c + renderTr(v) + recur(v.children, v.id)) :
                (c + renderTr(v))
        }, '');
    };
    var search = function search(table, id) { //遍历table
        var container;
        var now;
        _.reduce(id.split('-'), function(c, v, k, e) {
            container = c;
            now=c[v];
            c = now.children;
            return c;
        }, table);
        return {
            container: container,
            model: container[0].model,
            target:now
        };
    };

    function update() {
        jqContainer.html(renderTable());
        $("#example-advanced").treetable({
            expandable: true
        });
    }

    function listener() {
        var id;
        jqContainer.on('click', '.add', function() {
            // var 
            var jqThis = jQuery(this);
            id = jqThis.attr('x-id')
            jqModal.modal({
                title: jqThis.html()
            });
        }).on('click', '.editable,.expression', function() {
            // var 
            var jqThis = jQuery(this);
            var id = jqThis.attr('x-id');
        }).on('click','.editable',function(){
            var input=jQuery('<input>');
            input.addClass('input');
            input.val(jQuery(this).html());
            jQuery(this).html('').append(input).removeClass('editable');
            input.trigger('focus');
        }).on('click','.expression',function(){
            var input=jQuery('<textarea>');
            input.attr('rows',10).attr('cols',100);
            input.addClass('textarea');
            input.val(jQuery(this).html());
            jQuery(this).html('').append(input).removeClass('expression');
            input.trigger('focus');
        }).on('blur','.input',function(){
            var id=jQuery(this).parent().attr('x-id');
            var shape = search(table, id);
            shape.target.name=jQuery(this).val();
            jQuery(this).parent().html(jQuery(this).val()).addClass('editable');
        }).on('blur','.textarea',function(){
            var id=jQuery(this).parent().attr('x-id');
            var shape = search(table, id);
            shape.target.name=jQuery(this).val();
            jQuery(this).parent().html(jQuery(this).val()).addClass('expression');
        }).on('click','.remove',function(){
            var id=jQuery(this).attr('x-id');
            var shape=search(table,id);
            // var last=shape.container[_.last(id.split('-'))];
            shape.container.splice(_.last(id.split('-')),1);
            update();
        });

        jqModal.on('click', '.submit', function() {
            var shape = search(table, id);
            var row = jQuery.extend(true, {}, shape.model, { name: jQuery('#inputEmail1').val() });
            var double=_.find(shape.container,function(v,k,e){
                return v.name==jQuery('#inputEmail1').val();
            })
            if(double){
                alert('请检查已有的数据，确保不和他们重复！');
                return;
            }
            shape.container.push(row);

            update();
            jqModal.modal('hide');

        });
        jqSubmit.on('click',function(){
            localStorage.setItem('__maoearch',JSON.stringify({
                data:table
            }))
        });
    }

    function init() {
        listener();
    }
    return {
        update:render,
        render:update
    }
}

var maoEarth = new MaoEarth();
maoEarth.render();
