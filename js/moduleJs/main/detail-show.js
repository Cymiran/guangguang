define(['jquery','jquery-ui',"commen",'zoom'],function($,jqueryui,commen,zoom){
    return {
        init: function(){
            const prolist = JSON.parse(Cookie.get('productlist'));
            let detailInfo = Cookie.get('curGoods');
            detailInfo = JSON.parse(detailInfo);
            // 获得当前购物车中 该商品数量
            let curNumber = 0;
           
            getComment();
            getContent();
            getWoMai();
            // 回显信息
            function getContent(){
                let str1 = '';
                str1 += `
                
                <h5>
                    <a href="../../html/index.html">首页 ></a>
                    <a href="../../html/index.html">${detailInfo.className} ></a>
                    <a href="javascript:;">${detailInfo.goodsName}</a>
                </h5>
                <div class="zoom" id="fangdajing">
                    <div class="big">
                        <img id="smallImg" src="${detailInfo.goodsListImg}" alt="">
                        <div id="smallCursor" class="cover"></div>
                        <div id="bigCursor" class="zooming">
                            <img id="bigImg" src="${detailInfo.goodsListImg}" alt="">
                        </div>
                    </div>
                    <div class="small">
                        <img src="${detailInfo.goodsListImg}" alt="">
                    </div>
                </div> 
                <div class="info">
                    <h3>${detailInfo.goodsName}</h3>
                    <div class="prices">
                        <p>逛逛价: <span>￥${detailInfo.price}</span></p>
                        <p>参考价：￥${detailInfo.price}</p>
                    </div>
                    <h4>运费&nbsp;&nbsp;快递：10元 EMS：20.0元</h4>
                    <h4 class="has-border">
                        <span>商品编号：<label>5174087</label></span>
                        |<span>客服咨询</span>
                    </h4>
                    <div class="count">
                        <span class="static">数量</span>
                        <span id="reduce" class="add">-</span>
                        <input id="count" type="text" value="1">
                        <span id="add" class="reduce">+</span>
                        <span class="static s">月销量898件</span>
                    </div>
                    <div class="bt">
                            <button id="buy" class="btn btn-large btn-block btn-danger" type="button">立即购买</button>
                            <button id="addCart" class="btn btn-large btn-block btn-danger" type="button">加入购物车<b id="ele">aa</b></button>
                    </div>
                    <div class="service">
                        <span class="ser">特殊服务</span>
                        <img src="../../img/service1.jpeg" alt="">
                    </div>
                </div>
                `;
                $('.one-l').html(str1);
                zoom();
            }
            

            // 放大镜 
            function zoom(){
                let smallImg = $('#smallImg');
                let smallCur = $('#smallCursor');
                let bigImg = $('#bigImg');
                let bigCur = $('#bigCursor');
    
                smallCur.width(bigCur.width()*smallImg.width()/bigImg.width())
                smallCur.height( smallCur.width() );
                //计算比例
                let scale = bigImg.width()/smallImg.width();
                let flag = true
                smallImg.on('mouseover',function(){
                    smallCur.show();
                    bigCur.show();
                    flag = true
                });
                $(document).on("mousemove", function(e){
                    let lmin =smallImg.offset().left
                    let lmax =smallImg.offset().left+smallImg.width()
                    let tmin =smallImg.offset().top-$('body,html').scrollTop()
                    let tmax =smallImg.offset().top-$('body,html').scrollTop()+smallImg.height()
                    
                    if(e.pageX > lmax || e.pageX < lmin||e.pageY>tmax||e.pageY<tmin){
                        console.log(1)
                        smallCur.hide();
                        bigCur.hide();
                        return;
                    }
                    smallCur.css({
                        left : Math.min(smallImg.width()-smallCur.width(), Math.max(0, e.pageX - smallImg.offset().left - smallCur.width()/2)),
                        top : Math.min(smallImg.height()-smallCur.height(), Math.max(0, e.pageY - smallImg.offset().top - smallCur.height()/2))
                    });
                    bigImg.css({
                        left: -smallCur.position().left * scale + 'px',
                        top: -smallCur.position().top * scale
                    })
                });
            }
            
            // 评价信息
            function getComment(){
                $.ajax({
                    type:'get',
                    url : '../../../json/product.json',
                    success:function(data){
                        forlist = data.prolist;
                        let index = detailInfo.classID;
                        let str2 ='';
                        let assarr = forlist[index].assess;
                        if(assarr.length > 0){
                            for(let i=0;i<assarr.length;i++){
                                str2 += `
                                
                                    <li>
                                        <div class="head">
                                            <img src="${assarr[i].url}" alt="">
                                            <p>${assarr[i].uname}</p>
                                        </div>
                                        <div class="level">
                                            <p><img src="${assarr[i].star}" alt=""></p>
                                            <p>${assarr[i].descreption}</p>
                                        </div>
                                        <div class="num">
                                            订单号：${assarr[i].no}
                                        </div>
                                    </li>
                                
                                `;
                            }
                            $('ul#pingj').show();
                            $('ul#pingj').html(str2)
                        }else{
                            $('#nocom').show()
                        }
                        
                    }
                })
            }
            
            let count = 1;
            //加入购物车数量
            $('#add').on('click',function(){
                count = $('#count').val();
                count++;
                if(count >= 999){
                    count = 999;
                }
                $('#count').val(count)
            })
            $('#reduce').on('click',function(){
                count = $('#count').val();
                count--;
                if(count <= 1){
                    count = 1;
                }
                $('#count').val(count)
            })
            $('#count').on('keyup',function(){
                count = parseInt($(this).val());
                
                if(count <= 1 || count == NaN){
                    count = 1;
                }
            })
            // 显示购物车数量
            let username = Cookie.get('username');
            let discount = 0;
            $.ajax({
                url: 'http://datainfo.duapp.com/shopdata/getCar.php',
                dataType : 'jsonp',
                data : {
                    userID : username,
                },
                success:function(data){
                    if(data == 0){
                        $('#cart-count').hide();
                    }else{
                        $('#cart-count').show();
                        for(let i=0;i<data.length;i++){
                            discount +=parseInt(data[i].number);
                            if(data[i].goodsID == detailInfo.goodsID){
                                curNumber = parseInt(data[i].number) || 0;
                            }
                        }
                        let c = discount;
                        if(c>99){
                            c = '99+';
                        }
                        $('#cart-count').html(c);
                    }

                }
            })
            // 添加购物车
            $('#addCart').on('click',function(){
                // animate.animate($('#ele'), {top: 0, right:0,opacity: 0}, 500, function(){
                //     console.log('运动完成...')
                // })
                // 获得当前购物车中 该商品数量
                count = parseInt($('#count').val());
                curNumber += count;
                discount += count;;
                $.ajax({
                    url: 'http://datainfo.duapp.com/shopdata/updatecar.php',
                    data : {
                        userID : username,
                        goodsID : detailInfo.goodsID,
                        number : curNumber
                    },
                    success:function(data){
                        if(data == 0){
                            console.log('数据更新失败')
                        }else{
                            console.log('数据更新成功')
                            let c = discount;
                            if(c>99){
                                c = '99+';
                            }
                            $('#cart-count').html(c);
                            $('#cart-count').show();
                        }
                    }
                })
            })
            
           
            
            // 服务器代理获得商品 我买网
            function getWoMai(){
                var date = new Date();
                let times = date.getTime();
                $.ajax({
                    url:'/api/activity/activityListJson.action?sid=-2&_='+times,
                    success(results){
                        console.log('代理请求成功')
                        let newlist = results.skulist
                        let counter = 0;
                        let shoplist = [];
                        for(let key in newlist){
                            shoplist.push(newlist[key])
                            counter++;
                            if(counter >= 10){
                                break;
                            }
                        }
                        let str2 = '';
                        for(let i=0;i<shoplist.length;i++){
                            str2 += `
                            <li>
                                <img src="${shoplist[i].pic}" alt="">
                                <a href="javascript:;">${shoplist[i].name}</a>
                                <span class="text-danger text-center">${shoplist[i].price1.value}</span>
                            </li>
                            `;
                        }
                        $('ul#shoplist').html(str2);
                    }
                })
            }
            
        }
    }
})

