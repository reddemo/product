var Nestable = function () {
    var jqList=jQuery('#accordion2');
    jqList.sortable();
    jQuery('#accordion2').on('mouseup,mousemove,mousedown',function(e){
        e.stopPropagation();
    })
    
    // jqList.on('click','[data-action="collapse"]',function(){
    //     var jqMe=$(this);
    //     jqMe.hide();
    //     jqMe.next().show();
    //     jqMe.closest('.dd-item').find('.accordion2').hide();
    // });
    // jqList.on('click','[data-action="expand"]',function(){
    //     var jqMe=$(this);
    //     jqMe.hide();
    //     jqMe.prev().show();
    //     $(this).closest('.dd-item').find('.accordion2').show();
    // });
};
new Nestable();