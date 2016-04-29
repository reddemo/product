// 表单模块
var editableTable=new EditableTable({
	jqWrapper:jQuery('#bang-gift'),
});
editableTable.init();
// 
// var jqMaybeRule = $('#maybeRule');
    // jqMaybeRule.on('click', '.submit', function() {
    //     var data = jqMaybeRule.serialize();
    //     getUrl({
    //         url: 'test/prize.json',
    //         data: data
    //     }).
    //     then(function(remote) {
    //         console.log(remote)
    //         if (remote.code == 0) {

    //         }
    //     });
    // });
    // jqMaybeRule
    //     .bootstrapValidator({
    //         message: 'This value is not valid',
    //         fields: {
    //             starttime: {
    //                 message: '容我考虑一分钟',
    //                 validators: {
    //                     notEmpty: {
    //                         message: '不能为空'
    //                     },
    //                     stringLength: {
    //                         min: 1,
    //                         max: 4,
    //                         message: '数字必须在有效范围内'
    //                     },
    //                     /*remote: {
    //                         url: 'remote.php',
    //                         message: 'The username is not available'
    //                     },*/
    //                     regexp: {
    //                         regexp: /^\d+$/,
    //                         message: '必须是数字'
    //                     }
    //                 }
    //             },
    //             endtime: {
    //                 message: '容我考虑一分钟',
    //                 validators: {
    //                     notEmpty: {
    //                         message: '不能为空'
    //                     },
    //                     stringLength: {
    //                         min: 1,
    //                         max: 4,
    //                         message: '数字必须在有效范围内'
    //                     },
    //                     /*remote: {
    //                         url: 'remote.php',
    //                         message: 'The username is not available'
    //                     },*/
    //                     regexp: {
    //                         regexp: /^\d+$/,
    //                         message: '必须是数字'
    //                     }
    //                 }
    //             },
    //             prizecount: {
    //                 validators: {
    //                     notEmpty: {
    //                         message: ''
    //                     },
    //                     regexp: {
    //                         regexp: /^\d+$/,
    //                         message: '必须是数字'
    //                     }
    //                 }
    //             }
    //         }
    //     })
    //     .on('success.form.bv', function(e) {
    //         console.log(e)
    //         // Prevent form submission
    //         e.preventDefault();

    //         // Get the form instance

    //         // Get the BootstrapValidator instance
    //         var bv = jQuery.data('bootstrapValidator');
    //         console.log(bv);

    //         // Use Ajax to submit form data
    //         getUrl({
    //             url:'test/json',
    //             data:jqMaybeRule.serialize()
    //         }).then(function(remote){
    //             console.log(remote)
    //         })
    //     });