/**
 * require $ for querying and event
 */
/*标准表单start*/
var fields = {
    'name': {
        rules: {
            'zh': {
                failure: false, //默认为false
                value: null //默认为空，提供一些配置参数
            },
            'minLength': {
                value: 2
            },
            'maxLength': {
                value: 4
            }
        }
    },
    'age': {
        rules: {
            'int': {}
        }
    },
    'mb':{
        rules:{
            int:{}
        }
    },
    'ext1':{
        rules:{}
    },
    'ext2':{
        rules:{}
    },
    'ext3':{
        rules:{}
    },
    'ext4':{
        rules:{}
    },
    'ext5':{
        rules:{}
    },
    'ext6':{
        rules:{}
    },
    'ext7':{
        rules:{}
    },
    'ext8':{
        rules:{}
    },
    'ext9':{
        rules:{}
    },
    'ext10':{
        rules:{}
    }
};
/*标准表单end*/


/*验证规则start*/
var rules = { //支持函数、正则、字符串
    'required':{
        type:'function',
        error:'不能为空',
        predicator:function(value){
            return value!==''
        },
        id:0
    },
    'alt':{
        type:'function',
        error:'永远都是正确的',
        predicator:function(value){
            return true;
        },
        id:1
    },
    'zh': {
        type: 'function',
        error: '必须是中文',
        predicator: function(value) {
            return !(/[^\u4E00-\u9FFF]/).test(value);
        },
        id: 2
    },
    'int': {
        type: 'function',
        error: '必须是整数',
        predicator: /^\d+$/,
        id: 3
    },
    'minLength': {
        type: 'function',
        error: '低于最小长度',
        predicator: function(value, config) {

            // console.log(value,config)
            return value.length >= config
        },
        id: 4
    },
    'maxLength': {
        type: 'function',
        error: '超出最大长度',
        predicator: function(value, config) {
            return value.length <= config;
        },
        id: 5
    },
    'unique':{
        type:'function',
        error:'永远都是正确的',
        predicator:function(){
            return true;
        },
        id:6
    },
    en:{
        type:'function',
        error:'只能是英文',
        predicator:/[^a-zA-Z]/,
        failure:true,
        id:7
    }
};
/*验证规则end*/