var checkor={
	'name':{
		rules:{
			'zh':{
				message:'姓名只能有中文',
				failure:false,//默认为false
				value:null,//默认为空，提供一些配置参数
			},
			'minLength':{
				message:'姓名不能低于2个字符',
				value:2
			},
			'maxLength':{
				message:'姓名不能高于4个字符',
				value:4
			}
		}
	},
	'phone':{
		rules:{
			'number':{
				message:'必须为数字'
			},
		}
	}
};

var rules={//支持函数、正则、字符串
	'zh':{
		type:'function',
		semantics:'判断是否是中文',
		message:'必须是中文'
		predicator:function(value){
			return false;
		}
	}
};