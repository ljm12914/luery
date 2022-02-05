﻿/* luery.js - ©LJM12914.https://github.com/ljm12914
 * 一个轻量级的Javascript拓展库。
 * Herobrine保佑 永不出bug
 */
console.log("luery.js ©LJM12914\r\nhttps://github.com/ljm12914");
const I = "Invalid argument";
function $(o){
    if(!o.indexOf("#")) return document.getElementById(o.replace("#",""));
    else if(!o.indexOf(".")) return document.getElementsByClassName(o.replace(".",""));
    //else if(o == "*") return document.getElementsByTagName("*");
    else return document.getElementsByTagName(o);
}

//$批量绑定事件
function $Events(o,e,f){for(let i = 0; i < o.length; i++) o[i].addEventListener(e,f);}

HTMLCollection.prototype.css=function(a,b){
    for(let i = 0; i < this.length; i++){
        if(b !== undefined){this[i].style.setProperty(a,b);}
        else if(isJSONObject(a)){
            for(k in a) this[i].style.setProperty(k,a[k]);
        }
        else{
            if(getComputedStyle) return document.defaultView.getComputedStyle(this[i],false)[a];
            else return Element.currentStyle[a];
        }
    }
    return this;
}
//.prototype.hasClass=function(c){} 不可能同时给一大堆元素判断是否有class吧
HTMLCollection.prototype.addClass=function(c){
    if(!c) throw new TypeError(I);
    for(let i = 0; i < this.length; i++){
        if(this[i].className == "") this[i].className += c;
        else this[i].className += " " + c;
    }
    return this;
}
HTMLCollection.prototype.removeClass=function(c){
    if(!!c.match(" ")) throw new TypeError(I);
    for(let i = 0; i < this.length; i++){
        if(this[i].hasClass(c)){
            this[i].className=this[i].className.replace(c,"");
            this[i].className=this[i].className.replace(/^\s+|\s+$/g,"");
            this[i].className=this[i].className.replace("  "," ");
        }
    } 
    return this;
}
HTMLCollection.prototype.hide=function(){this.css("display","none");return this;}
HTMLCollection.prototype.show=function(){this.css("display","unset");return this;}
///////////////////////////////////////////////////////////////////////////////////////////////////////
if(HTMLElement){
    HTMLElement.prototype.css=function(a,b){
        if(b !== undefined){this.style.setProperty(a,b); return this;}
        else if(isJSONObject(a)){
            for(k in a) this.style.setProperty(k,a[k]);
            return this;
        }
        else{//本来需要转驼峰才能正常，不知为何不转也可以
            if(getComputedStyle) return document.defaultView.getComputedStyle(this,false)[a];
            else return Element.currentStyle[a];
        }
    }
    HTMLElement.prototype.hasClass=function(c){return !!this.className.match(new RegExp("(\\s|^)" + c + "(\\s|$)"));}
    HTMLElement.prototype.addClass=function(c){
        if(!c) throw new TypeError(I);
        if(this.className == "") this.className += c;
        else this.className += " " + c;
        return this;
    }
    HTMLElement.prototype.removeClass=function(c){
        if(!!c.match(" ")) throw new TypeError(I);
        if(this.hasClass(c)){
            this.className = this.className.replace(c,"");
            this.className = this.className.replace(/^\s+|\s+$/g,"");
            this.className = this.className.replace("  "," ");
        }
        return this;
    }
    HTMLElement.prototype.parent=function(){return this.parentNode || this.parentElement;}
    HTMLElement.prototype.hide=function(){this.css("display","none");return this;}
    HTMLElement.prototype.show=function(){this.css("display","unset");return this;}
    HTMLElement.prototype.isInClass=function(c){
        if(!c) throw new TypeError(I);
        let o = this;
        while(true){
            if(o.hasClass(c)) return true;
            if(o.tagName == "HTML") return false;
            o = o.parent();
        }
    }
    HTMLElement.prototype.isInId=function(c){
        if(!c) throw new TypeError(I);
        let o = this;
        while(true){
            if(o.id === c) return true;
            if(o.tagName == "HTML") return false;
            o = o.parent();
        }
    }
    HTMLElement.prototype.getParentByClass=function(c){
        if(!c) throw new TypeError(I);
        let o = this;
        while(true){
            if(o.hasClass(c)) return o;
            if(o.tagName == "HTML") return null;
            o = o.parent();
        }
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
else lueryFail();//可自定义错误函数

//获取元素各种坐标信息的封装函数
//client<height/width>：内容+padding
//offset<height/width>：内容+padding+border+滚动条（如果有）
//outer<height/width>：内容+padding+border+滚动条（如果有）+margin
//F(ixed)T(op)：相对于当前页面上端的坐标，T(op)：相对于网页上端的坐标，B、L、R一样
//P(ure)H(eight)：元素本身的高度（盒模型最里面那个纯高度，不包括padding margin border scroll）
//A(ll)H(eight)：元素所有的高度（outer<height/width>）
function tt(o,t){
    switch(t){
        case "t": return parseInt(o.css("top").replace("px",""));
        case "ft": return o.getBoundingClientRect().top;
        case "b": return tt(o,"t") + tt(o,"h");
        case "fb": return o.getBoundingClientRect().bottom;
        case "l": return parseInt(o.css("left").replace("px",""));
        case "fl": return o.getBoundingClientRect().left;
        case "r": return tt(o,"l") + tt(o,"w");
        case "fr": return o.getBoundingClientRect().right;
        case "h": return o.offsetHeight;
        case "w": return o.offsetWidth;
        case "ah": return o.outerHeight;
        case "aw": return o.outerWidth;
        case "ph": return o.clientHeight - parseInt(o.css("padding-top").replace("px","")) - parseInt(o.css("padding-bottom").replace("px",""));
        case "pw": return o.clientWidth - parseInt(o.css("padding-left").replace("px","")) - parseInt(o.css("padding-right").replace("px",""));
        default: throw new ReferenceError("unknown magic letter");
    }
}

//判断JSON
function isJSONText(s){
    if(typeof s == "string"){
        try{
            let o = JSON.parse(s);
            if(typeof o == "object" && o) return true;
            else return false;
        }catch(e){return false;}
    }
    return false;
}
function isJSONObject(s){
    if(typeof s == "object"){
        try{
            let o = JSON.stringify(s);
            if(typeof o == "string" && o) return true;
            else return false;
        }catch(e){return false;}
    }
    return false;
}

//cookie
function getCookie(k){
    let c = document.cookie.split(";");
    let e = k + "=";
    for(let i = 0; i < c.length; i++){
        let s = c[i].trim();
        if(!s.indexOf(k)) return s.substring(e.length,s.length);
    }
    return "";
}
function setCookie(k,v,e){
    let d = new Date;
    d.setTime(d.getTime() + e * 24 * 60 * 60 * 1000);
    document.cookie = k + "=" + v + "; expires=" + d.toUTCString();
    return getCookie(k);
}
function removeCookie(k){setCookie(k,"",-1);}