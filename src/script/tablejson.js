var table = [{
    name: '新增一个城市',
    type: 'add',
    model: {
        name: '',
        type: 'city',
        children: [{
            name: '新增一个部门',
            type: 'add',
        }]
    }
}, {
    name: '北京',
    type: 'city',
    children: [{
        name: '新增一个部门',
        type: 'add',
        model: {
            name: '',
            type: 'department',
            children: [{
                name: '新增一个岗位',
                type: 'add',
            }]
        }
    }, {
        name: '产品',
        type: 'department',
        children: [{
            name: '新增一个岗位',
            type: 'add',
            model: {
                name: '',
                type: 'title',
                children: [{
                    name: '招聘要求',
                    type: 'yaoqiu',
                    children: [{
                        name: '',
                        type: 'expression',
                    }]
                }, {
                    name: '岗位描述',
                    type: 'miaoshu',
                    children: [ {
                        name: '',
                        type: 'expression',
                    }]
                }]
            }
        }, {
            name: '移动应用开发产品总监',
            type: 'title',
            children: [{
                name: '招聘要求',
                type: 'yaoqiu',
                children: [{
                    name: '1. 具有理科或者工科的本科学位。\n\r2. 具有在移动应用产品管理发5年以上的经验，熟悉并且能够管理产品的整个生命周期，包括定义、开发、测试、发布、支持和退市。熟悉互联网业态，特别是对社交类APP的产品设计及用户行为有深刻理解和独到见解。3. 有过成功的APP案例。4. 具有3年以上的项目管理经验。5. 具备明锐的商业头脑和嗅觉以及深厚的分析能力,对数据敏感。6. 具备良好的沟通技巧、领导才能和团队精神。7. 注重细节，富有想象力和创造力，注重结果。8. 抗压能力强，能够在一个快节奏的创业环境中游刃有余。9. 熟练使用办公软件和项目管理软件。',
                    type: 'expression',
                }]
            }, {
                name: '岗位描述',
                type: 'miaoshu',
                children: [{
                    name: '根据公司业务战略制订移动端APP产品战略，并负责产品战略的实施。',
                    type: 'expression',
                }]
            }]
        }, {
            name: '广告系统产品经理',
            type: 'title',
            children: [{
                name: '任职资格',
                type: 'yaoqiu',
                children: [{
                    name: '大学本科及以上学历，计算机相关专业，2年以上互联网广告产品经理工作经验；',
                    type: 'expression',
                }]
            }, {
                name: '职位描述',
                type: 'miaoshu',
                children: [ {
                    name: '负责一猫汽车网平台的互联网广告系统和广告产品的需求分析、产品设计；',
                    type: 'expression',
                }]

            }]
        }, {
            name: '产品经理(商城类)',
            type: 'title',
            children: [{
                name: '任职资格',
                type: 'yaoqiu',
                children: [{
                    name: '国家统招大学本科或以上学历；',
                    type: 'expression',
                }]

            }, {
                name: '职位描述',
                type: 'yaoqiu',
                children: [ {
                    name: '负责商城产品的功能规划；',
                    type: 'expression',
                }]

            }]
        }]
    }]
}, {
    name: '硅谷',
    type: 'city',
    children: [{
        name: '新增一个部门',
        type: 'add',
        model: {
            name: '',
            type: 'department',
            children: [{
                name: '新增一个岗位',
                type: 'add',
            }]
        }
    }, {
        name: '产品',
        type: 'department',
        children: [{
            name: '新增一个岗位',
            type: 'add',
            model: {
                name: '',
                type: 'title',
                children: [{
                    name: '招聘要求',
                    type: 'yaoqiu',
                    children: [ {
                        name: '',
                        type: 'expression',
                    }]
                }, {
                    name: '岗位描述',
                    type: 'miaoshu',
                    children: [{
                        name: '',
                        type: 'expression',
                    }]
                }]
            }
        }, {
            name: '移动应用开发产品总监',
            type: 'title',
            children: [{
                name: '招聘要求',
                type: 'yaoqiu',
                children: [{
                    name: '1. 具有理科或者工科的本科学位。\n\r2. 具有在移动应用产品管理发5年以上的经验，熟悉并且能够管理产品的整个生命周期，包括定义、开发、测试、发布、支持和退市。熟悉互联网业态，特别是对社交类APP的产品设计及用户行为有深刻理解和独到见解。3. 有过成功的APP案例。4. 具有3年以上的项目管理经验。5. 具备明锐的商业头脑和嗅觉以及深厚的分析能力,对数据敏感。6. 具备良好的沟通技巧、领导才能和团队精神。7. 注重细节，富有想象力和创造力，注重结果。8. 抗压能力强，能够在一个快节奏的创业环境中游刃有余。9. 熟练使用办公软件和项目管理软件。',
                    type: 'expression',
                }]
            }, {
                name: '岗位描述',
                type: 'miaoshu',
                children: [{
                    name: '根据公司业务战略制订移动端APP产品战略，并负责产品战略的实施。',
                    type: 'expression',
                }]
            }]
        }, {
            name: '广告系统产品经理',
            type: 'title',
            children: [{
                name: '任职资格',
                type: 'yaoqiu',
                children: [{
                    name: '大学本科及以上学历，计算机相关专业，2年以上互联网广告产品经理工作经验；',
                    type: 'expression',
                }]
            }, {
                name: '职位描述',
                type: 'miaoshu',
                children: [{
                    name: '负责一猫汽车网平台的互联网广告系统和广告产品的需求分析、产品设计；',
                    type: 'expression',
                }]

            }]
        }, {
            name: '产品经理(商城类)',
            type: 'title',
            children: [{
                name: '任职资格',
                type: 'yaoqiu',
                children: [{
                    name: '国家统招大学本科或以上学历；',
                    type: 'expression',
                }]

            }, {
                name: '职位描述',
                type: 'yaoqiu',
                children: [{
                    name: '负责商城产品的功能规划；',
                    type: 'expression',
                }]

            }]
        }]
    }]
}]
