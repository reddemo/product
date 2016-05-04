// var renderTr=_.template(jQuery('#tr').html());//tr的动态模板
// var renderTable=_.template(jQuery('#tbody').html());//拼出表格
// var render=function recur(table,father){//递归的拼接tr，计算出正确的id和father
// 	return _.reduce(table,function(c,v,k,e){
// 		v.id=_.filter([father,k],function(v){return v!==null}).join('-');
// 		v.father=father;
// 		return v.children?(c+renderTr(v)+recur(v.children,v.id)):
// 						  (c+renderTr(v))
// 	},'');		
// };
// var search=function search(table,id){//遍历table
// 	var container;
// 	_.reduce(id.split('-'),function(c,v,k,e){
// 		container=c;
// 		c=c[v].children;
// 		return c;
// 	},table);
// 	return {
// 		container:container,
// 		model:container[0].model
// 	};
// };