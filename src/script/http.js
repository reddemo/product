/*提交数据start*/
function _http(data,token,id){//提交数据
    $.ajax({
            url: 'http://zt.emao.com/manage/ztinfostore',
            type: 'post',
            data: JSON.stringify({
                data:data,
                vf:{
                    token:JSON.stringify(token),
                    aid:id
                }
            }),
            dataType:'json',
            contentType:'application/json;charset=utf-8',
            headers: {
                       'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),

                       'Content-Type':'application/json;charset=utf-8'
                      },         
            success: function(response) {
                        if(response.status == 1)
                        {
                            alert("操作成功");

                        }else
                        {
                            alert("操作失败！");
  
                        }
            },
            error: function(error) {
                console.log(error);
            }
    });
}
/*提交数据end*/