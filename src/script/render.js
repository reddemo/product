var renderTr=_.template(jQuery('#tr').html());
var renderTable=_.template(jQuery('#tbody').html());
var render=function recur(table){
	return _.reduce(table,function(c,v,k,e){
		return v.children?(c+renderTr(v)+recur(v.children)):
						  (c+renderTr(v))
	},'');		
};