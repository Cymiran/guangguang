define(['jquery','jquery-ui',"commen"],function($,jqueryui,commen){
    return {
        init: function(){
            const prolist = JSON.parse(Cookie.get('productlist'));
            const index = window.location.search.split('?')[1];
            let detailInfo = prolist[index];

            
            // 回显信息
            let str1 = '';
            str1 += `
            
            <h5>
                <a href="../../html/index.html">首页 ></a>
                <a href="../../html/index.html">${detailInfo.type} ></a>
                <a href="javascript:;">${detailInfo.info}</a>
            </h5>
            <div class="zoom">
                <div class="big">
                    <img id="smallImg" src="${detailInfo.url}" alt="">
                    <div id="smallCursor" class="cover"></div>
                    <div id="bigCursor" class="zooming">
                        <img id="bigImg" src="${detailInfo.url}" alt="">
                    </div>
                </div>
                <div class="small">
                    <img src="${detailInfo.url}" alt="">
                </div>
            </div> 
            <div class="info">
                <h3>儿童果汁杯</h3>
                <div class="prices">
                    <p>逛逛价: <span>￥${detailInfo.price}</span></p>
                    <p>参考价：￥${detailInfo.otherprice}</p>
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
                    <span class="static s">月销量${detailInfo.count}件</span>
                </div>
                <div class="bt">
                        <button id="buy" class="btn btn-large btn-block btn-danger" type="button">立即购买</button>
                        <button id="addCart" class="btn btn-large btn-block btn-danger" type="button">加入购物车</button>
                </div>
                <div class="service">
                    <span class="ser">特殊服务</span>
                    <img src="../../img/service1.jpeg" alt="">
                </div>
            </div>
            `;
            $('.one-l').html(str1);

            // 
            let smallImg = $('#smallImg');
            let smallCur = $('#smallCursor');
            let bigImg = $('#bigImg');
            let bigCur = $('#bigCursor');

            smallCur.width(bigCur.width()*smallImg.width()/bigImg.width())
            smallCur.height( smallCur.width() );
            //计算比例
			let scale = bigImg.width()/smallImg.width();
			
            smallImg.hover(
				function(){
                    smallCur.show();
                    bigCur.show();
				},
				function(){
                    smallCur.hide();
                    bigCur.hide();
				}
			);
			smallImg.on("mousemove", function(e){
				smallCur.css({
					// left : Math.min(smallImg.width()-smallCur.width(), Math.max(0, e.clientX - smallImg.offset().left - smallCur.width()/2)),
					// top : Math.min(smallImg.height()-smallCur.height(), Math.max(0, e.clientY - smallImg.offset().top - smallCur.height()/2))
                    left:e.clientX-smallImg.offset().left - 70,
                    top: e.clientY- smallCur.height()/2 - 70

                });
				bigImg.css({
					left: -smallCur.position().left * scale,
					top: -smallCur.position().top * scale
				})
            });
            // 评价信息
            let str2 ='';
            let assarr = detailInfo.assess;
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
           //加入购物车数量
            $('#add').on('click',function(){
                let count = $('#count').val();
                count++;
                if(count >= 999){
                    count = 999;
                }
                $('#count').val(count)
            })
            $('#reduce').on('click',function(){
                let count = $('#count').val();
                count--;
                if(count <= 1){
                    count = 1;
                }
                $('#count').val(count)
            })
            // 服务器代理获得商品 我买网
            $.ajax({
                url:'http://localhost:8000/api/activity/activityListJson.action?sid=-2&_=15058270',
                success(results){
                    
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
                    console.log(shoplist)
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
})