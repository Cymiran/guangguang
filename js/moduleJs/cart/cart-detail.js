define(['jquery','commen','sweet-alert'],function($,com,sweetalert){
    return {
        init : function(){
            // 加载购物车信息
            console.log('加载购物车信息...')
            // 已选商品件数 总价钱
            let count = 0;
            let totail = 0;
            let goodslist = [];
            let username = Cookie.get('username');
            $('#username').html(username);
            getGoodsInfo();   
            
            function getGoodsInfo(){
                $.ajax({
                    url: 'http://datainfo.duapp.com/shopdata/getCar.php',
                    dataType : 'jsonp',
                    data : {
                        userID : username,
                    },
                    success:function(data){
                        // 页面回显
                        goodslist = data;
                        let str = '';
                        for(let i=0;i<data.length;i++){
                            str += `
                                <tr>
                                    <td>
                                        <div class="shop">
                                            <input id="shopbox" type="checkbox">
                                            <span>店铺：${data[i].goodsName}</span>
                                        </div>
                                        <div class="info">
                                            <div class="box">
                                                <input id="onebox" type="checkbox"></th>
                                            </div>
                                            <div class="goodinfo">
                                                <img src="${data[i].goodsListImg}" alt="">
                                                <span>${data[i].goodsName}</span>
                                            </div>
                                            <div class="price">${changeTwoDecimal_f(data[i].price)}</div>
                                            <div class="count">
                                                <span id="reduce">-</span><input id="count" type="text" value="${data[i].number}"><span id="add">+</span>
                                            </div>
                                            <div class="money">${changeTwoDecimal_f((data[i].price)*(data[i].number))}</div>
                                            <div class="option">删除</div>
                                        </div>
                                    </td>
                                </tr>               
                            `;
                        }
                        $('#cartlist').html(str)
                        addCartCount();
                        seletGoods();
                        deleteGoods();
                        summery();
                        deleteGoodsAll();
                    }
                })
            }
            
            //加入购物车数量
            function addCartCount() {
                $('#cartlist').on('click','#add',function(){
                    count = $(this).parent().find('#count').val();
                    count++;
                    if(count >= 999){
                        count = 999;
                    }
                    $(this).parent().find('#count').val(count);
                    let price = $(this).parent().parent().find('.price').html();
                    $(this).parent().parent().find('.money').html(changeTwoDecimal_f(price*count))
                })
                $('#cartlist').on('click','#reduce',function(){
                    count = $(this).parent().find('#count').val();
                    count--;
                    if(count <= 1){
                        count = 1;
                    }
                    $(this).parent().find('#count').val(count);
                    let price = $(this).parent().parent().find('.price').html();
                    $(this).parent().parent().find('.money').html(changeTwoDecimal_f(price*count))
                })
                $('#cartlist').on('keyup','#count',function(){
                    count = parseInt($(this).val());
                    
                    if(count <= 1 || count == NaN){
                        count = 1;
                    }
                    console.log(count)
                    let price = $(this).parent().parent().find('.price').html();
                    $(this).parent().parent().find('.money').html(changeTwoDecimal_f(price*count))
                })
            }
            // 选商品
            function seletGoods (){
                // 单选商品
                $('.info').on('click','#onebox',function(){
                    let m = $(this).parent().parent().find('.money').html();
                    $(this).parent().parent().parent().find('#shopbox').prop("checked",$(this).prop("checked"))
                    if($(this).prop("checked")){
                        count += parseInt($(this).parent().parent().find('#count').val())
                        totail += parseFloat(m);
                    }else{
                        count -= parseInt($(this).parent().parent().find('#count').val())
                        totail -= parseFloat(m);
                    }
                    $('#selectcount').html(count)
                    $('#totail').html("￥"+changeTwoDecimal_f(totail))
                    isAllSelect();
                })
                // 全选
                $('.cart-main').on('click','#allbox',function(){
                    count = 0;
                    totail = 0;

                    let isselect = $(this).prop('checked');
                    $('.cart-main #allbox').each(function(index){
                        $(this).prop('checked',isselect);
                    })
                    $('.info #onebox,#shopbox').each(function(index){
                        $(this).prop("checked",isselect)
                    })
                    
                    if(isselect){
                        $('.info #count').each(function(index){
                          count += parseInt($(this).val())
                        })  
                        $('.info .money').each(function(index){
                            totail += parseFloat($(this).html())
                        })
                        $('#selectcount').html(count)
                        $('#totail').html("￥"+changeTwoDecimal_f(totail))
                    }else{
                        $('#selectcount').html('0')
                        $('#totail').html('￥0.00')
                    }
                })
                // 选商铺
                $('.cart-main').on('click','#shopbox',function(){
                    let m = $(this).parent().parent().find('.money').html();
                    $(this).parent().parent().find('#onebox').prop('checked',$(this).prop('checked'));
                    isAllSelect();
                    if($(this).prop('checked')){
                        count += parseInt($(this).parent().parent().find('#count').val())
                        totail += parseFloat(m);
                    }else{
                        count -= parseInt($(this).parent().parent().find('#count').val())
                        totail -= parseFloat(m);
                    }
                    $('#selectcount').html(count)
                    $('#totail').html("￥"+changeTwoDecimal_f(totail))
                })
            }
            // 判断 是否 商铺 商品 全选
            function isAllSelect (){
                let all = true;
                $('.info #onebox').each(function(index){
                    if($(this).prop("checked") == false){
                        all = false;
                    }
                    if(all){
                        $('.cart-main #allbox').each(function(index){
                            $(this).prop('checked',true);
                        })
                    }else{
                        $('.cart-main #allbox').each(function(index){
                            $(this).prop('checked',false);
                        })
                    }
                })
            }
            // 删除商品
            function deleteGoods(){
                $('.info').on('click','.option',function(){
                    let index = $(this).parent().parent().parent().index();
                    let id = goodslist[index].goodsID;
                    $.ajax({
                        url: 'http://datainfo.duapp.com/shopdata/updatecar.php',
                        data : {
                            userID : username,
                            goodsID: id,
                            number : 0
                        },
                        success:function(data){
                            if(data == 1){
                                getGoodsInfo()
                            }else{
                                console.log('购物车更新失败')
                            }
                        }
                    })
                })
            }
            // 删除全部商品
            function deleteGoodsAll(){
                $('#deleteAll').click(function(){
                    // debugger
                    let flag = false;
                    $('.info #onebox').each(function(index){
                        console.log($(this).prop('checked'))
                        if($(this).prop('checked') == true){
                            flag = true;
                            let index = $(this).parent().parent().parent().parent().index();
                            let id = goodslist[index].goodsID;
                            console.log(id)  
                            $.ajax({
                                url: 'http://datainfo.duapp.com/shopdata/updatecar.php',
                                data : {
                                    userID : username,
                                    goodsID: id,
                                    number : 0
                                },
                                success:function(data){
                                    if(data == 1){
                                        swal("删除成功!", "购物车又少了，快去剁手...", "success"); 
                                        getGoodsInfo();
                                    }else{
                                        console.log('购物车更新失败')
                                    }
                                }
                            })
                        }
                    })
                    if(flag == false){
                        swal({
                             title: "不要酱紫..",
                             text: "选择要删除的商品哦..!", 
                             type : "warning",
                             showCancelButton: true,  
                             confirmButtonColor: "#DD6B55",
                             closeOnCancel: true
                          },
                             function(isConfirm){ 
                                 console.log('准备删除..')
                         })
                        // swal("Here's a message!", "It's pretty, isn't it?")
                    }
                })
            }
            // 结算时 更新购物车数量
            function summery() {
                $('.jiesuan').click(function(){
                    updateCart();
                })
            }
            // 页面离开 更新购物车数量
            // function leavePage(){
            //     console.log('页面离开...')
            // }
            // 结算 离开页面都实时更新购物车数量
            function updateCart(){
                $('tbody tr').each(function(index){
                    let $index = $(this).index();
                    let count = $(this).find('#count').val();
                    for(let i=0;i<goodslist.length;i++){
                        if($index == i){
                            let id = goodslist[i].goodsID;
                            $.ajax({
                                url: 'http://datainfo.duapp.com/shopdata/updatecar.php',
                                data : {
                                    userID : username,
                                    goodsID: id,
                                    number : count
                                },
                                success:function(data){
                                    if(data == 1){
                                        console.log('更新成功')
                                    }else{
                                        console.log('购物车更新失败')
                                    }
                                    getGoodsInfo();
                                }
                            })
                        }
                    }
                })
            }
            //格式化 数字 精度为2
            function changeTwoDecimal_f(x)    
            {    
            　　var f_x = parseFloat(x);    
            　　if (isNaN(f_x))    
            　　{    
            　　　　return 0;    
            　　}    
            　　var f_x = Math.round(x*100)/100;    
            　　var s_x = f_x.toString();    
            　　var pos_decimal = s_x.indexOf('.');    
            　　if (pos_decimal < 0)    
            　　{    
            　　　　pos_decimal = s_x.length;    
            　　s_x += '.';    
            　　}    
            　　while (s_x.length <= pos_decimal + 2)    
            　　{    
            　　　　s_x += '0';    
            　　}    
            　　return s_x;    
            } 


            
        }
    }
})



// 