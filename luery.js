/* luery.js - ©LJM12914.https://github.com/ljm12914
 * 一个轻量级的Javascript拓展库。
 * Herobrine保佑 永不出bug
 */
"use strict";
console.log("luery.js ©LJM12914\r\nhttps://github.com/ljm12914");
///////////////////////////////////////////////////////////////////////////////////////////////////////
(()=>{
    eval("window.luery = window." + (window.lueryShortCut || "$") + " = luery;");
    function luery(s){return new luery.prototype.processInput(s);}
    luery.prototype = {
        constructor:luery,
        processInput:function(s){
            if(!s) luery.E();
            else if(typeof s == "string") return document.querySelectorAll(s);
        }
    }
    luery.prototype.processInput.prototype = luery.prototype;
    luery.addFunc = luery.prototype.addFunc = function(o){for(let k in o) this[k]=o[k];}
    luery.addFunc({
        //批量绑定事件
        Events:(o,e,f)=>{
            if(!((o + "").indexOf("NodeList") + 1)) o.addEventListener(e,f);
            else if(!((o + "").indexOf("Element") + 1)) for(let i = 0; i < o.length; i++) o[i].addEventListener(e,f);
        },
        E:_=>{throw new TypeError("Invalid argument");},
        //判断JSON文本
        isJSONText:s=>{
            if(typeof s == "string"){
                try{
                    let o = JSON.parse(s);
                    if(typeof o == "object" && o) return true;
                    else return false;
                }catch(e){return false;}
            }
            return false;
        },
        //判断JSON对象
        isJSONObject:s=>{
            if(typeof s == "object"){
                try{
                    let o = JSON.stringify(s);
                    if(typeof o == "string" && o) return true;
                    else return false;
                }catch(e){return false;}
            }
            return false;
        },
        //获取cookie
        getCookie:k=>{
            let c = document.cookie.split(";");
            let e = k + "=";
            for(let i = 0; i < c.length; i++){
                let s = c[i].trim();
                if(!s.indexOf(k)) return s.substring(e.length,s.length);
            }
            return "";
        },
        //设置cookie
        setCookie:(k,v,e)=>{
            let d = new Date;
            d.setTime(d.getTime() + e * 24 * 60 * 60 * 1000);
            document.cookie = k + "=" + v + "; expires=" + d.toUTCString();
            return getCookie(k);
        },
        //删除cookie
        removeCookie:k=>{setCookie(k,"",-1);},
        //获取滚动条宽度
        scrollBarWidth:o=>{
            let n,s,d;
            if(o === undefined) d = document.createElement("div");
            else d = o.cloneNode(true);
            d.css({"position":"absolute","top":"-9999px","width":"999px","height":"999px","overflow":"hidden"});
            n = document.body.appendChild(d).clientWidth;
            d.css("overflow","scroll");
            s = d.clientWidth;
            document.body.removeChild(d);
            return n - s;
        },
        //获取元素各种坐标信息的封装函数
        //client<height/width>：内容+padding
        //offset<height/width>：内容+padding+border+滚动条（如果有）
        //outer<height/width>：内容+padding+border+滚动条（如果有）+margin
        //F(ixed)T(op)：相对于当前页面上端的坐标，T(op)：相对于网页上端的坐标，B、L、R一样
        //P(ure)H(eight)：元素本身的高度（盒模型最里面那个纯高度，不包括padding margin border scroll）
        //A(ll)H(eight)：元素所有的高度（outer<height/width>）
        tt:(o,t)=>{
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
                default: luery.E();
            }
        }
    });
})();
///////////////////////////////////////////////////////////////////////////////////////////////////////
NodeList.prototype.css=function(a,b){
    for(let i = 0; i < this.length; i++) this[i].css(a,b);
    return this;
}
//.prototype.hasClass=function(c){} 不可能同时给一大堆元素判断是否有class吧
NodeList.prototype.addClass=function(c){
    for(let i = 0; i < this.length; i++) this[i].addClass(c);
    return this;
}
NodeList.prototype.removeClass=function(c){
    for(let i = 0; i < this.length; i++) this[i].removeClass(c);
    return this;
}
NodeList.prototype.hide=function(){
    this.css("display","none");
    return this;
}
NodeList.prototype.show=function(){
    this.css("display","");
    return this;
}
NodeList.prototype.setAttribute=function(k,v){
    for(let i = 0; i < this.length; i++) this[i].setAttribute(k,v);
    return this;
}
NodeList.prototype.removeAttribute=function(k){
    for(let i = 0; i < this.length; i++) this[i].removeAttribute(k);
    return this;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
if(HTMLElement){
    HTMLElement.prototype.css=function(a,b){
        if(b !== undefined){this.style.setProperty(a,b); return this;}
        else if(luery.isJSONObject(a)){
            for(let k = 0; k < a.length; k++) this.style.setProperty(k,a[k]);
            return this;
        }
        else{//本来需要转驼峰才能正常，不知为何不转也可以
            if(getComputedStyle) return document.defaultView.getComputedStyle(this,false)[a];
            else return Element.currentStyle[a];
        }
    }
    HTMLElement.prototype.hasClass=function(c){return !!this.className.match(new RegExp("(\\s|^)" + c + "(\\s|$)"));}
    HTMLElement.prototype.addClass=function(c){
        if(!c) luery.E();
        if(this.className == "") this.className += c;
        else this.className += " " + c;
        return this;
    }
    HTMLElement.prototype.removeClass=function(c){
        if(!!c.match(" ")) luery.E();
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
        if(!c) luery.E();
        let o = this;
        while(true){
            if(o.hasClass(c)) return true;
            if(o.tagName == "HTML") return false;
            o = o.parent();
        }
    }
    HTMLElement.prototype.isInId=function(c){
        if(!c) luery.E();
        let o = this;
        while(true){
            if(o.id === c) return true;
            if(o.tagName == "HTML") return false;
            o = o.parent();
        }
    }
    HTMLElement.prototype.getParentByClass=function(c){
        if(!c) luery.E();
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