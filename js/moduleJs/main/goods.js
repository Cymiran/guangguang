define(['jquery','commen'],function($,com){
    return {
        init : function(){
            console.log('加载商品列表');
            let datalist = [];
            let forlist = [];
            $.ajax({
                type: 'get',
                url : '../../../json/goods.json',
                success : function(data){
                    datalist = data.list;
                    let str = "";
                    let str1 = "";
                    let str2 = "";

                    let str3 = '';
                    let str4 = '';
                    let s = '';
                    for(let i =0;i<datalist.length;i++){
                        if(datalist[i].type == '1'){
                            s += `<li class="sm">
                                <h1>
                                    <div class="title">
                                        <span>${datalist[i].title1}</span>
                                        <label>${datalist[i].title2[0]}<br>${datalist[i].title2[1]}</label>
                                    </div>
                                </h1>`
                                let goodslist = datalist[i].goods;
                                for (let j=0;j<goodslist.length;j++){
                                    if(goodslist[j].count == '1'){
                                        s += `<a class="big" href="#"><img src="${goodslist[j].imgurl}" alt=""></a>`;
                                    }
                                    if(goodslist[j].count == '2'){
                                        s += `<a class="small" href="#">
                                            <img src="${goodslist[j].imgurl[0]}" alt="">
                                            <img src="${goodslist[j].imgurl[1]}" alt="">
                                        </a>`
                                    }
                                }
                            
                        }
                        s = s + `</li>`;
                        // 
                        if(datalist[i].type == '2'){
                            let arr2 = datalist[i].glist;
                            str3 += `<li class="bg">`;
                                for(let i=0;i<arr2.length;i++){
                                    let glName = ((i+1)%2==0)? ('gr t'+(i+1)) : ('gl t'+(i+1))
                                    str3 += `<div class="${glName}">
                                        <div class="gll t${i+1}">
                                            <h1>
                                                <div class="title">
                                                    <span>${arr2[i].title1}</span>
                                                    <label>${arr2[i].title2[0]}<br>${arr2[i].title2[0]}</label>
                                                </div>
                                            </h1>
                                            <img src="${arr2[i].img1}" alt="">
                                        </div>
                                        <div class="glr t${i+1}">
                                            <ul class="glr-nav">`
                                            let arr3 = arr2[i].nav;
                                            for(let j=0;j<arr3.length;j++){
                                                str3 += `<li><a href="#">${arr3[j]}</a></li>`
                                            }
                                            str3 += `</ul><ul class="img">`
                                            let arr4 = arr2[i].imgArr;
                                            for(let k=0;k<arr4.length;k++){
                                                str3 += `<li><a href="#"><img src="${arr4[i]}" alt=""></a></li>`
                                            }
                                            str3 += `</ul></div></div>`
                                
                            }
                            
                        }
                        str1 = str3+`</li>` 
                    }  
                    str =s + str1;
                    $('ul#goodslist').html(str);               
                }
            })
            // 鼠标经过偏移
            $('ul#goodslist').on('mouseenter','img',function(){
                $(this).css({"position" : "relative","left":"-3px"})
            })
            $('ul#goodslist').on('mouseleave','img',function(){
                $(this).css({"position" : "relative","left":"0"})
            })
            // 加载推荐产品
            $.ajax({
                type:'get',
                url : '../../../json/product.json',
                success:function(data){
                    forlist = data.prolist;
                    let str = '';
                    for(let i=0;i<forlist.length;i++){
                        str += `
                        <li>
                            <a href="../../html/sub/goods-detail.html?${forlist[i].id}">
                                <img src="${forlist[i].url}" alt="">
                            </a>
                            <p><a href="../../html/sub/goods-detail.html?${forlist[i].id}">${forlist[i].info}</a></p>
                            <span class="price">￥${forlist[i].price}</span>
                            <span class="buybtn">抢购</span>
                        </li>
                        `;
                    }
                    $('ul.pro').html(str);
                    $('ul.pro').on('click','li',function(){
                        forlist = JSON.stringify(forlist);
                        Cookie.set("productlist",forlist)
                        let index = $(this).index();
                        window.location.href = "../../../html/sub/goods-detail.html?"+forlist[index].id;
                    })
                }
            })
        }
    }
})