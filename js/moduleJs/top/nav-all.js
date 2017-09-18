define(['jquery'],function($){
    return {
        init: function(){
            console.log('导航all');
            //导航 列表
            let arr1 = [];
            let arr2 = [];
            let arr3 = [];
            let delstr = '';
            $.ajax({
                type: "get",
                url: "../../json/top-list.json",
                success : function(data){
                    arr1  = data.list;
                    let str = ''; 
                    for(var i=0;i<arr1.length;i++){
                        str += `<li><span class='s${i+1}'></span>`;
                        // 导航
                        let astr = '';
                        arr2 = arr1[i].listnav;
                        for(let j=0;j<arr2.length;j++){
                            astr += `<a href="javascript:;">${arr2[j]}</a>`;
                        }
                        str += astr+`</li>`;
                    }
                    $('ul#listNav').html(str)
                    // 
                }
            })
            // tab
            $('#listNav').on("mouseenter","li",function(){
                let index = $(this).index();
                $(this).addClass('active').siblings().removeClass('active')
                // 子列表
                arr3 = arr1[index].listdetail;
                let detStr = '';
                for(let i = 0;i<arr3.length;i++){
                    detStr += `<li><span>${arr3[i].name}</span><div class='shit'>`;
                    let s = '',arr4 = arr3[i].arr;
                    for(let b=0;b<arr4.length;b++){
                        s += `<a href="javascript:;">${arr4[b]}</a>`;
                    }
                    detStr += s+`</div></li>`;
                }
                $('#detail-list').html(detStr)
                // 图片列表1
                let imgStr1 = ''
                let ilist1 = arr1[index].imglist1;
                for(let j = 0;j<ilist1.length;j++){
                    imgStr1 += `
                        <li>
                            <a href="javascript:;">
                                <img src="${ilist1[j]}" alt="">
                            </a>
                        </li>
                    `
                }
                $('ul.imglist').html(imgStr1);
                // 图片列表2
                let imgStr2 = ''
                let ilist2 = arr1[index].imglist2;
                for(let j = 0;j<ilist2.length;j++){
                    imgStr2 += `
                        <li>
                            <a href="javascript:;">
                                <img src="${ilist2[j]}" alt="">
                            </a>
                        </li>
                    `
                }
                $('ul.imgl').html(imgStr2);
                // box显示
                $('.listbox').show();
            })
            // 鼠标滑出
            $('.listbox').on("mouseleave",function(){
                $('.listbox').hide();
                $('#listNav').find('.active').removeClass('active')
            })
            // 鼠标滑出
            $('.alllist').on("mouseleave",function(){
                $('.listbox').hide();
                $('#listNav').find('.active').removeClass('active')
            })
        }
    }
})