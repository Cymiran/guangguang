define(['jquery','commen'],function($,com){
    return {
        init : function(){
            // 加载购物车信息
            console.log('加载购物车信息...')
            let username = Cookie.get('username');
            $.ajax({
                url: 'http://datainfo.duapp.com/shopdata/getCar.php',
                dataType : 'jsonp',
                data : {
                    userID : username,
                },
                success:function(data){
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
                    //加入购物车数量
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
                    $('#cartlist').on('keydown','#count',function(){
                        count = parseInt($(this).val());
                        console.log(count)
                        debugger
                        if(count <= 1 || count == NaN){
                            count = 1;
                        }
                        let price = $(this).parent().parent().find('.price').html();
                        $(this).parent().parent().find('.money').html(changeTwoDecimal_f(price*count))
                    })
                }
            })
            // 
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