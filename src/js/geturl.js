/**
 * [getUrl 立即返回异步值的映射]
 * @Author   wanghongxin492@emao.com
 * @DateTime 2016-03-31T16:50:48+0800
 * @param    {[string]}                 url [description]
 * @return   {[Promise]}                     [description]
 */
function getUrl(url){
	_.extend(url.headers||(url.headers={}),{
		'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	});
	var options={};
	_.extend(
    			options,
    			{
    				//default props
					type:'post',
					dataType:'json'
    			},
    			url);
    return Promise.resolve($.ajax(options));
}