/* luery.js - ©LJM12914.https://github.com/ljm12914/luery
 * 一个轻量级的Javascript拓展库。
 * Herobrine保佑 永不出bug
 */
"use strict";
console.log("luery.js ©LJM12914\r\nhttps://github.com/ljm12914/luery\r\nYou are using unminified file, which is not suitable for production use.");
///////////////////////////////////////////////////////////////////////////////////////////////////////
(_=>{
    window.luery = luery;
    eval("window." + (window.lueryShortCut || "$") + " = luery;");
    function luery(s){return new luery.prototype.I(s);}
    luery.prototype = {
        constructor:luery,
        I:function(s){
            if(!s) luery.E();
            else if(typeof s == "string"){
                let a = document.querySelectorAll(s);
                if(a.length == 0) return [];
                if(a.length == 1 && s.match(/^.*#[^\s]*$/)) return a[0];
                else return a;
            }
        }
    }
    luery.addFunc = luery.prototype.addFunc = function(o){for(let k in o) this[k]=o[k];}
    luery.addFunc({
        //抛错误
        E:e=>{throw new TypeError(`Invalid argument${e?" ":""}${e===undefined?"":e}`);},
        //批量绑定事件
        Events:(o,e,f)=>{
            if(o.length == 0) luery.E();
            if(!((o + "").indexOf("NodeList") + 1)) o.addEventListener(e,f);
            else if(!((o + "").indexOf("Element") + 1)) for(let i = 0; i < o.length; i++) o[i].addEventListener(e,f);
        },
        dEvents:(o,e,f)=>{
            if(o.length == 0) luery.E();
            if(!((o + "").indexOf("NodeList") + 1)) o.removeEventListener(e,f);
            else if(!((o + "").indexOf("Element") + 1)) for(let i = 0; i < o.length; i++) o[i].removeEventListener(e,f);
        },
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
            return luery.getCookie(k);
        },
        //删除cookie
        removeCookie:k=>{luery.setCookie(k,"",-1);},
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
        //client<height/width> 和 ：内容+padding
        //getBoundingClientRect().<width/height>：内容+padding+border
        //offset<height/width>：内容+padding+border+滚动条（如果有）
        //outer<height/width>：内容+padding+border+滚动条（如果有）+margin
        //F(ixed)T(op)：相对于当前页面上端的坐标，T(op)：相对于网页上端的坐标，B、L、R一样
        //P(ure)H(eight)：元素本身的高度（盒模型最里面那个纯高度，不包括padding margin border scroll）
        //A(ll)H(eight)：元素所有的高度（outer<height/width>）
        /*tt:(o,t)=>{
            var h = luery.tt;
            switch(t){
                case "t": return d("top");
                case "ft": return f().t;
                case "b": return h(o,"t") + h(o,"h");
                case "fb": return f().t + h(o,"h");
                case "l": return d("left");
                case "fl": return f().l;
                case "r": return h(o,"l") + h(o,"w");
                case "fr": return f().l + h(o,"w");
                case "ah": return o.outerHeight;
                case "aw": return o.outerWidth;
                case "h": return o.offsetHeight;
                case "w": return o.offsetWidth;
                case "dh": return o.clientHeight;
                case "dw": return o.clientWidth;
                case "ph": return h(o,"dh") - d("padding-top") - d("padding-bottom");
                case "pw": return h(o,"dw") - d("padding-left") - d("padding-right");
                default: luery.E();
            }
            function f(){
                var t = o.offsetTop, l = o.offsetLeft, c = o.offsetParent;
                while(c !== null){
                    //console.log(c.offsetParent);
                    t += c.offsetTop;
                    l += c.offsetLeft;
                    c = c.offsetParent;
                }
                return {t:t,l:l};
            }
            function d(a){return parseFloat(o.css(a).replace("px",""));}
        },*/
        dom:(o,phr)=>{
            var result = 0;
            if(phr.indexOf("-") != -1){//横轴
                if(phr.indexOf("--") != -1){//需要本体宽度
                    getWH("width");
                    phr.replace("--","-");
                }
                mbp(phr.substring(0,phr.indexOf("-")),"left");
                mbp(phr.substring(phr.indexOf("-") + 1,phr.length),"right");
            }
            else if(!phr.indexOf("|") != -1){//纵轴
                if(phr.indexOf("||") != -1){//需要本体宽度
                    getWH("height");
                    phr.replace("||","|");
                }
                mbp(phr.substring(0,phr.indexOf("|")),"top");
                mbp(phr.substring(phr.indexOf("|") + 1,phr.length),"bottom");
            }
            return result;
            function mbp(data,p){
                if(data.indexOf("m") != -1) result += c("margin-" + p);
                if(data.indexOf("b") != -1) result += c("border-" + p + "-width");
                if(data.indexOf("p") != -1) result += c("padding-" + p);
            }
            function getWH(p){
                if(o.css(p) == "auto"){
                    var o2 = o.cloneNode(true);
                    o2.css({"display":"block","position":"absolute","top":"-9999rem"});
                    document.body.append(o2);
                    result += c(p,o2);
                    document.body.removeChild(o2);
                }
                else result += c(p);
            }
            function c(a,d){
                if(d == undefined) d = o;
                return parseFloat(d.css(a).replace("px",""));
            }
        },
        rect:(o,phr)=>{
            var $ = luery;
            var r = $.rect;
            switch(phr){
                case "t": return c("top");
                case "b": return r(o,"t") + $.dom(o,"bp||pb");
                case "l": return c("left");
                case "r": return r(o,"l") + $.dom(o,"bp--pb");
                case "ft": return fix().t;
                case "fb": return r(o,"ft") + $.dom(o,"bp||pb");
                case "fl": return fix().l;
                case "fr": return r(o,"fl") + $.dom(o,"bp--pb");
                default: $.E();
            }
            function fix(){
                var t = o.offsetTop, l = o.offsetLeft, c = o.offsetParent;
                while(c !== null){
                    //console.log(c.offsetParent);
                    t += c.offsetTop;
                    l += c.offsetLeft;
                    c = c.offsetParent;
                }
                return {t:t,l:l};
            }
            function c(a,d){
                if(d == undefined) d = o;
                return parseFloat(d.css(a).replace("px",""));
            }
        }
    });
})();
///////////////////////////////////////////////////////////////////////////////////////////////////////
(_=>{
    var $ = luery;
    if(NodeList){
        let g = NodeList.prototype;
        g.css=function(a,b){//只允许set，因为get多个可能出现冲突
            if(b === undefined && !$.isJSONObject(a)) $.E();
            for(let i = 0; i < this.length; i++){
                if(b !== undefined) this[i].style.setProperty(a,b);
                else for(let k in a) this[i].style.setProperty(k,a[k]);//必然是JSON了
            }
            return this;
        }
        //.prototype.hasClass=function(c){} 不可能同时给一大堆元素判断是否有class吧
        g.addClass=function(c){
            for(let i = 0; i < this.length; i++) this[i].addClass(c);
            return this;
        }
        g.removeClass=function(c){
            for(let i = 0; i < this.length; i++) this[i].removeClass(c);
            return this;
        }
        g.hide=function(){
            this.css("display","none");
            return this;
        }
        g.show=function(){
            this.css("display","");
            return this;
        }
        g.attr=function(k,v){
            for(let i = 0; i < this.length; i++) this[i].attr(k,v);
            return this;
        }
    }
    else lueryFail();

    if(HTMLElement && SVGElement){
        let v = SVGElement.prototype,
        h = HTMLElement.prototype;
        v.css=h.css=function(a,b){
            if(b !== undefined){this.style.setProperty(a,b); return this;}
            else if($.isJSONObject(a)){
                for(let k in a) this.style.setProperty(k,a[k]);
                return this;
            }
            else{//本来需要转驼峰才能正常，不知为何不转也可以
                if(getComputedStyle) return document.defaultView.getComputedStyle(this,false)[a];
                else return Element.currentStyle[a];
            }
        }
        v.hasClass=h.hasClass=function(c){return !!this.className.match(new RegExp("(\\s|^)" + c + "(\\s|$)"));}
        v.addClass=h.addClass=function(c){
            if(!c) $.E();
            if(!this.hasClass(c)){
                if(this.className == "") this.className += c;
                else this.className += " " + c;
            }
            return this;
        }
        v.removeClass=h.removeClass=function(c){
            if(!!c.match(" ")) $.E();
            if(this.hasClass(c)){
                this.className = this.className.replace(c,"");
                this.className = this.className.replace(/^\s+|\s+$/g,"");
                this.className = this.className.replace("  "," ");
            }
            return this;
        }
        v.parent=h.parent=function(){return this.parentNode || this.parentElement;}
        v.hide=h.hide=function(){this.css("display","none");return this;}
        v.show=h.show=function(){this.css("display","unset");return this;}
        v.isInClass=h.isInClass=function(c){
            if(!c) $.E();
            let o = this;
            while(o.tagName != "HTML"){
                if(o.hasClass(c)) return true;
                o = o.parent();
            }
            return false;
        }
        v.isInId=h.isInId=function(c){
            if(!c) $.E();
            let o = this;
            while(o.tagName != "HTML"){
                if(o.id === c) return true; 
                o = o.parent();
            }
            return false;
        }   
        v.isInElement=h.isInElement=function(c){
            if(!c) $.E();
            let o = this;
            while(o.tagName != "HTML"){
                if(o === c) return true; 
                o = o.parent();
            }
            return false;
        }
        v.isChildOf=h.isChildOf=function(o){
            if(!o) $.E();
            var c = o.childNodes;
            for(let i = 0; i < c.length; i++) if(c[i] === this) return true;
            return false;
        }
        v.getParentByClass=h.getParentByClass=function(c){
            if(!c) $.E();
            let o = this;
            while(o.tagName != "HTML"){
                if(o.hasClass(c)) return o;
                o = o.parent();
            }
            return null;
        }
        v.attr=h.attr=function(k,v){
            if(v === undefined) return this.getAttribute(k);
            else{
                if(v === null) this.removeAttribute(k);
                else this.setAttribute(k,v);
                return this;
            }
        }
    }
    else lueryFail();
})();