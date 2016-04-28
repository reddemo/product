var renderTr=_.template(jQuery('#tr').html());
var renderTable=_.template(jQuery('#tbody').html());
var render=function recur(table){
	return _.reduce(table,function(c,v,k,e){
		if(!v.children){
			return c+renderTr(v);
		}else{
			return c+renderTr(v)+recur(v.children);
		}
	},'');
};
var table_html=renderTable();