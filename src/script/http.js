var http={
	savePrize:function(params){
		_.extend(params,{
			url:_config.http.savePrize,
			type:'get'
		});
		return getUrl(params);
	}
};