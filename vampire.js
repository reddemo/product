var sogou_wx_url = 'http://weixin.sogou.com';
var sogou_search_url = ['http://weixin.sogou.com/weixin?type=1&query=','&ie=utf8'];
var media_API = 'http://wemedia.emao.com/api/article/pushRowsToQueue';
//var media_API = 'http://localhost/test/index.php';
var landing_page = '';
var article_links = [];
var real_gzh_url = [];

var allagents = ['Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.99 Safari/537.36','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4','Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:41.0) Gecko/20100101 Firefox/41.0','Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36','Mozilla/5.0 (Windows NT 6.1; WOW64; rv:41.0) Gecko/20100101 Firefox/41.0','Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko','Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25','Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30','Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.122 Safari/537.36 SE 2.X MetaSr 1.0'];


function getRandomUA(array){
    var randomIndex=Math.floor(Math.random()*array.length);
    return array[randomIndex];
}

var vampire = require('casper').create({
	verbose: true,
	logLevel: 'error',

	stepTimeout: 5000,
	onStepTimeout: function(){
		console.log(1502);
		console.log('single step exec timeout');
		vampire.exit();
	},

	pageSettings:{
		loadImages: false,
		loadPlugins: false,
	},

	exitOnError: true,
});

var gzhname = vampire.cli.get("wechaten");

if(!gzhname){
	console.log('gzhname error');
	vampire.exit();
}

var gzhid = vampire.cli.get("wechatid");
var portal_url = sogou_search_url[0] + gzhname + sogou_search_url[1];

vampire.userAgent(getRandomUA(allagents));

vampire.start(portal_url,function(response){
	var req_status = response.status;

	if(req_status > 400 ){
		console.log(1500);
		console.log('portal page load fail');	
		vampire.exit();
	}

	if(this.exists('#noresult_part1_container')){
		console.log(2404);	
		console.log('The gzh not exists');
		vampire.exit();
	}else{
		var gzh_real_url = this.evaluate(function(){
			return  document.querySelector('.wx-rb').getAttribute('href');
		});
		if(gzh_real_url){
			landing_page = sogou_wx_url+gzh_real_url;
		}else{
			console.log(2500);
			console.log('Get gzh real url fail');
			vampire.exit();
		}
	}
	
	vampire.thenOpen(landing_page,function(response){
		var req_status = response.status;
		if(req_status > 400){
			console.log(2501);	
			console.log('Load landing page fail');
			vampire.exit();
		}
		
		vampire.waitFor(function check(){
			return this.evaluate(function(){
				return document.querySelectorAll('.weui_media_title').length > 2;
			});
		},function then(){
			article_links = this.evaluate(function(){
							var link_url = document.querySelectorAll('.weui_media_title');

							return Array.prototype.map.call(link_url,function(e){
								 return e.getAttribute('hrefs');
							}).filter(function(e){
								return e;
							});

						});
		},function onTimeout(){
			console.log(2503);
			console.log('Wait load article list timeout');
			vampire.exit();
		},6000);
		
	});
	

});


vampire.then(function(){

		article_links.forEach(function(url){
			var real_url = sogou_wx_url + url;	
			
			vampire.thenOpen(real_url,function(response){
				real_gzh_url.push({'sourceTitle':this.getTitle(),'sourceUrl':this.getCurrentUrl()});
			});

		});

});	


vampire.then(function(){
		vampire.thenOpen(media_API,{method:'POST',data:{'articleRows':JSON.stringify(real_gzh_url),'accountId':gzhid}},function(response){
			if(response.status != 200){
				console.log(1502);			
				console.log('open mediaAPI fail');
				vampire.exit();
			}
		});
});


vampire.run(function(){
	console.log(2000);
	console.log(real_gzh_url.length+' links capture');
	vampire.exit();

});
