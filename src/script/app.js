//表单模块

function MaoEarth() {

    var jqContainer = jQuery('#table-wrapper');
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
        _.reduce(id.split('-'), function(c, v, k, e) {
            container = c;
            c = c[v].children;
            return c;
        }, table);
        return {
            container: container,
            model: container[0].model
        };
    };

    function render1() {
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
        });

        jqModal.on('click', '.submit', function() {

            var shape = search(table, id);
            var row = jQuery.extend(true, {}, shape.model, { name: jQuery('#inputEmail1').val() });
            shape.container.push(row);

            render1();

        });
    }

    function init() {
        listener();
    }
    return {
        render: render1,
        _renderTable:render
    }
}

var maoEarth = new MaoEarth();
maoEarth.render();
