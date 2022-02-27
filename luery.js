/* luery.js - ©LJM12914.https://github.com/ljm12914
 * 一个轻量级的Javascript拓展库。
 * Herobrine保佑 永不出bug
 */
"use strict";
console.log("luery.js ©LJM12914\r\nhttps://github.com/ljm12914");
///////////////////////////////////////////////////////////////////////////////////////////////////////
(_=>{
    window.luery = luery;
    eval("window." + (window.lueryShortCut || "$") + " = luery;");
    function luery(s){return new luery.prototype.processInput(s);}
    luery.p = luery.prototype = {
        constructor:luery,
        processInput:function(s){
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
        E:_=>{throw new TypeError("Invalid argument");},
        //批量绑定事件
        Events:(o,e,f)=>{
            if(o.length == 0) luery.E();
            if(!((o + "").indexOf("NodeList") + 1)) o.addEventListener(e,f);
            else if(!((o + "").indexOf("Element") + 1)) for(let i = 0; i < o.length; i++) o[i].addEventListener(e,f);
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
        tt:(o,t)=>{
            var h = luery.tt;
            switch(t){
                case "t": return d("top");
                case "ft": return b("top");
                case "b": return h(o,"t") + h(o,"h");
                case "fb": return b("bottom");
                case "l": return d("left");
                case "fl": return b("left");
                case "r": return h(o,"l") + h(o,"w");
                case "fr": return b("right");
                case "ah": return o.outerHeight;
                case "aw": return o.outerWidth;
                case "h": return o.offsetHeight;
                case "w": return o.offsetWidth;
                case "dh": return o.clientHeight;
                case "dw": return o.clientWidth;
                case "bh": return b("height");
                case "bw": return b("width");
                case "ph": return b("height") - d("padding-top") - d("padding-bottom") - d("border-top-width") - d("border-bottom-width");
                case "pw": return b("width") - d("padding-left") - d("padding-right") - d("border-left-width") - d("border-right-width");
                default: luery.E();
            }
            function d(a){return parseFloat(o.css(a).replace("px",""));}
            function b(a){return eval("o.getBoundingClientRect()." + a);}
        }
    });
})();
///////////////////////////////////////////////////////////////////////////////////////////////////////
(_=>{
    var $ = luery;
    if(NodeList){
        let np = NodeList.prototype;
        np.css=function(a,b){//只允许set，因为get多个可能出现冲突
            if(b === undefined && !$.isJSONObject(a)) $.E();
            for(let i = 0; i < this.length; i++){
                if(b !== undefined) this[i].style.setProperty(a,b);
                else for(let k in a) this[i].style.setProperty(k,a[k]);//必然是JSON了
            }
            return this;
        }
        //.prototype.hasClass=function(c){} 不可能同时给一大堆元素判断是否有class吧
        np.addClass=function(c){
            for(let i = 0; i < this.length; i++) this[i].addClass(c);
            return this;
        }
        np.removeClass=function(c){
            for(let i = 0; i < this.length; i++) this[i].removeClass(c);
            return this;
        }
        np.hide=function(){
            this.css("display","none");
            return this;
        }
        np.show=function(){
            this.css("display","");
            return this;
        }
        np.setAttribute=function(k,v){
            for(let i = 0; i < this.length; i++) this[i].setAttribute(k,v);
            return this;
        }
        np.removeAttribute=function(k){
            for(let i = 0; i < this.length; i++) this[i].removeAttribute(k);
            return this;
        }
    }
    else lueryFail();

    if(HTMLElement && SVGElement){
        let sp = SVGElement.prototype,
        hp = HTMLElement.prototype;
        sp.css=hp.css=function(a,b){
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
        sp.hasClass=hp.hasClass=function(c){return !!this.className.match(new RegExp("(\\s|^)" + c + "(\\s|$)"));}
        sp.addClass=hp.addClass=function(c){
            if(!c) $.E();
            if(this.className == "") this.className += c;
            else this.className += " " + c;
            return this;
        }
        sp.removeClass=hp.removeClass=function(c){
            if(!!c.match(" ")) $.E();
            if(this.hasClass(c)){
                this.className = this.className.replace(c,"");
                this.className = this.className.replace(/^\s+|\s+$/g,"");
                this.className = this.className.replace("  "," ");
            }
            return this;
        }
        sp.parent=hp.parent=function(){return this.parentNode || this.parentElement;}
        sp.hide=hp.hide=function(){this.css("display","none");return this;}
        sp.show=hp.show=function(){this.css("display","unset");return this;}
        sp.isInClass=hp.isInClass=function(c){
            if(!c) $.E();
            let o = this;
            while(true){
                if(o.hasClass(c)) return true;
                if(o.tagName == "HTML") return false;
                o = o.parent();
            }
        }
        sp.isInId=hp.isInId=function(c){
            if(!c) $.E();
            let o = this;
            while(true){
                if(o.id === c) return true;
                if(o.tagName == "HTML") return false;
                o = o.parent();
            }
        }
        sp.getParentByClass=hp.getParentByClass=function(c){
            if(!c) $.E();
            let o = this;
            while(true){
                if(o.hasClass(c)) return o;
                if(o.tagName == "HTML") return null;
                o = o.parent();
            }
        }
    }
    else lueryFail();
})();