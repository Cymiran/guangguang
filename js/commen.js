// 1、log()
function log(){
    console.log('commenjs里的成员');
}
// 2、print(x)
function print(x){
    document.write(x)
}
// 3、敏感词过滤
function strFilter(target){
    var words = ['sb','tmd','wc','mmp','89.64'];
    for(var i in words){
        var reg = new RegExp(words[i],'gi');
        var star = '';
        for(var k = 0;k<words[k].length;k++){
            star += '*';
        }
        return target.replace(reg.star)
    }
}
// 4、随机生成一个min-max之间的数字
function randomInt(min,max){
    return Math.round(Math.random()*(max - min) + min);
}
// 5、随机验证码生成
function createCode(length){
    var str = '';
    for(var i=0;i<length;i++){
        var ascii = randomInt(48,90);
        while(ascii >= 58 && ascii <= 64){
            ascii = randomInt(48,90);
        }
        str += String.fromCharCode(ascii);
    }
    return str;
}
var DateUtil = {
    // 6、字符串转日期
    str2date :function (str,sep){
        sep = [sep] || ['-','.','/'];
        for(var i in sep){
            str = str.replace(new RegExp(sep[i],'g'),'-');
        }
        return str;
    },
    // 7、日期转字符串
    date2str :function (d){
        return d.getFullYear() + '/' + d.getMonth()+1 +'/' +d.getDate();
    },
    // 8、判断某年份是否是闰年
    isLeapYear:function (year){
        if(year % 400 ==0 || (year%100!=0 && year%4 == 0)){
            return true;
        }
        return false;
    },
    // 9、获得某个月的天数
    getDays: function (m,y){
        switch(m){
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:return 31;
            case 4:
            case 6:
            case 9:
            case 11:return 30;
            case 2:{
                if(isLeapYear(y)){
                    return 29;
                }else{
                    return 28;
                }
            }
            
        }
    },

    // 10、判断两个日期相差的天数
    countBetweenDate :function (d1,d2){
        if(typeof d1 === 'string'){
            d1 = str2date(d1);
        }
        if(typeof d2 === 'string'){
            d2 = str2date(d2);
        }
        return Math.abs(d1.getTime() - d2.getTime())/(1000*3600*24);
    },
    // 11、获得n天以后的日期
    getDayAfter:function (n){
        var now = new Date();
        now.setDate(now.getDate() + n);
        return now;
    }
}

// 12、判断是否存在getElementByClassName方法
if(!document.getElementsByClassName){
    document.getElementsByClassName = function(){
        var alldom = document.getElementsByTagName('*');
        var temp =[];
        var result = false;
        for(var i =0 ;i<alldom.length;i++){
            var strList = alldom[i].className.split(' ');
            for(var j=0;j<strList.length;j++){
                if(strList[j] === className){
                    result = true;
                    break;
                }
            }
            if(result){
                temp.push(alldom[i])
            }
        }

    }
}
// 13、获取非行内样式的兼容
function getStyle(ele,attr){
    if(ele.currentStyle){
        return ele.currentStyle[attr];
    }else{
        return getComputedStyle(ele)[attr];
    }
}
// 14、获取元素页面绝对位置
function offsetPage(obj){
    var _left = obj.offsetLeft;
    var _top = obj.offsetTop;
    while(obj.offsetParent){
        _left += obj.offsetParent.offsetLeft;
        _top += obj.offsetParent.offsetTop;
        obj = obj.offsetParent;
    }
    return {'left':_left,'top':_top}
}
// 15、将伪数组转成数组
function toArray(list){
    var temp = [];
    for(var i=0;i<list.length;i++){
        temp.push(list[i]);
    }
    return temp;
}

// 16、封装获取元素的方法
function $(str){
    if(str[0] == '#'){
        return document.getElementById(str.substring(1));
    } else if(str[0] == '.'){
        return document.getElementsByClassName(str.substring(1));
    }else{
        return document.getElementsByTagName(str)
    }
}
// 17、懒加载函数
function addEvent(obj,eventname,func,isCapture){
    if(window.VBArray){
        obj.attachEvent('on'+eventname,func);
        addEvent = function(obj,eventname,func){
            obj.attachEvent('on'+eventname,func)
        }
    }else{
        obj.addEventListener(eventname,func,!!isCapture);
        addEvent = function(obj,eventname,func,isCapture){
            obj.addEventListener(eventname,func,!!isCapture);
        }
    }
}
// 18、函数的柯里化
var addEvent = (function(){
    if(window.VBArray){
        return function(obj,eventname,func){
            obj.attachEvent('on' + eventname,func);
        }
    }else{
        return function(obj,eventname,func,isCapture){
            obj.addEventListener(eventname,func,!!isCapture)
        }
    }
})();
// 19、计算一个字符的字节数
function countBytes(str,charset){
    if(str && charset){
        var count = 0;
        if(charset.toLowerCase() === 'gbk'){
            for(var i=0;i<str.length;i++){
                var asc = str.charCodeAt(i);
                if(asc<256){
                    count++;
                }else{
                    count += 2;
                }
            }

        }else if(charset.toLowerCase() === 'utf-16'){
            for(var i=0;i<str.length;i++){
                var asc = str.charCodeAt(i);
                if(asc < 0xFFFF){
                    count +=2;
                }else{
                    count+=4;
                }
            }
        }else if(charset.toLowerCase() === 'utf-8'){
            for(var i=0;i<str.length;i++){
                var asc = str.charCodeAt(i);
                if(asc <= 0x7F){
                    count++;
                }else if(asc <= 0x7ff){
                    count += 2;
                }else if(asc<=0xFFFF){
                    count += 3;
                }else{
                    count += 4;
                }
            }
        }
        return count;
    }
}
// 另外还有一种方法 可以计算js在运行时，字符串的字节数 运行时 是utf-8 标准 存储字符集可以随意设定
function countBytesRuning(str){
    return new Blob([str]).size;
}
// 20、获得随机颜色
function randomColor(){
    var a = Math.round(Math.random()*255)+1;
    var b = Math.round(Math.random()*255)+1;
    var c = Math.round(Math.random()*255)+1;
    return 'rgba('+a+','+b+','+c+',1)'
}

// cookies
var Cookie = {
    get:function(key){
        var cookiestr = document.cookie;
        var list = cookiestr.split('; ')
        for(var i=0;i<list.length;i++){
            var kes = list[i].split('=');
            if(kes[0] == key){
                return kes[1];
            }
        }
        return null;
    },
    set:function(key,value,expires,path){
        if(typeof expires == 'number' || typeof expires == 'string'){
            expires = Number(expires);
            if(isNaN(expires)){
                expires = undefined;
            }else{
                var d = new Date();
                d.setDate(d.getDate() + expires);
                expires = d
            }
        }
        if(!(expires instanceof Date) && typeof expires == 'object'){
            expires = undefined;
        }
        document.cookie = key +'='+value+'; '+ (expires?'expires='+expires+'; ':'') + (path?'path=' +path+';':'path=/');
    }
}
// 页面传参 数据存储
var data = {};