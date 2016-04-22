/**
 * [getUrl 立即返回异步值的映射]
 * @Author   wanghongxin492@emao.com
 * @DateTime 2016-03-31T16:50:48+0800
 * @param    {[string]}                 url [description]
 * @return   {[Promise]}                     [description]
 */
function getUrl(url){
    return Promise.resolve(
    	$.ajax(
    		_.merge({},{
    			//default props
    	
    			},url)
    		)
    	)
    );
}