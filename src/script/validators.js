/**
 * require $ for querying and event
 */
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
    'phone': {
        rules: {
            'number': {}
        }
    },
    'age': {
        rules: {
            'number': {}
        }
    }
};

var rules = { //支持函数、正则、字符串
    'zh': {
        type: 'function',
        error: '必须是中文',
        predicator: function(value) {
            return !(/[^\u4E00-\u9FFF]/).test(value) && value !== '';
        },
        id: 1
    },
    'number': {
        type: 'function',
        error: '必须是数字',
        predicator: /^\d+$/,
        id: 2
    },
    'minLength': {
        type: 'function',
        error: '低于最小范围',
        predicator: function(value, config) {

            // console.log(value,config)
            return value.length >= config
        },
        id: 4
    },
    'maxLength': {
        type: 'function',
        error: '超出最大范围',
        predicator: function(value, config) {
            return value.length <= config;
        },
        id: 5
    }
};