"use strict";
function DM(){
    var dLeft,dTop,o,cb,c,cDown,isMoving = false, $ = luery;
    this.register = (_o,_cb,_c,_cDown)=>{
        o = _o;
        cb = _cb;
        c = _c;
        cDown = _cDown;
        if(!c) c = "grab";
        o.css("cursor",c);
        $.Events(o,"mousedown",e=>{
            css(true);
            down(e,false);
        });
        $.Events(o,"touchstart",e=>{
            css(true);
            down(e,true);
        });
        $.Events(o,"mousemove",e=>{move(e,false)});
        $.Events(o,"touchmove",e=>{move(e,true)});
        $.Events(o,"mouseup",e=>{
            css(false);
            up(e,false);
        });
        $.Events(o,"touchend",e=>{
            css(false);
            up(e,true);
        });
        $.Events($("*"),"mousemove",e=>{move(e,false)});
        $.Events($("*"),"touchmove",e=>{move(e,true)});
        $.Events($("*"),"mouseup",e=>{
            css(false);
            up(e,false);
        });
        $.Events($("*"),"touchend",e=>{
            css(false);
            up(e,true);
        });
    }
    function down(e,isTouch){
        isMoving = true;
        if(isTouch){
            dTop = e.touches[0].clientY - $.rect(o,"ft");
            dLeft = e.touches[0].clientX - $.rect(o,"fl");
        }
        else{
            dTop = e.clientY - $.rect(o,"ft");
            dLeft = e.clientX - $.rect(o,"fl");
        }
        cb(e,0,isTouch,dTop,dLeft);
    }
    function move(e,isTouch){
        if(isMoving){
            let t, l;
            if(isTouch){
                t = e.touches[0].clientY - dTop;
                l = e.touches[0].clientX - dLeft;
            }
            else{
                t = e.clientY - dTop;
                l = e.clientX - dLeft;
            }
            if(cb(e,1,isTouch,t,l) !== true){
                o.css("top",t + "px");
                o.css("left",l + "px");
                checkWinPos(o);
            }
        }
    }
    function up(e,isTouch){
        if(isMoving){
            isMoving = false;
            cb(e,2,isTouch);
        }
    }
    var checkWinPos = this.checkWinPos = o=>{
        if($.rect(o,"fr") > document.body.clientWidth) o.css("left",document.body.clientWidth - $.rect(o,"w") + "px");
        if($.rect(o,"fb") > innerHeight) o.css("top",innerHeight - $.rect(o,"h") + "px");
        if($.rect(o,"fl") < 0) o.css("left",0);
        if($.rect(o,"ft") < 0) o.css("top",0);
        if($.rect(o,"t") < 0) o.css("top",0);
    }
    function css(isDown){
        if(isDown === true){
            $("*").css({"cursor":"grabbing","user-select":"none","-webkit-user-drag":"none"});
            if(cDown){
                o.css("cursor",cDown);
                $("*").css("cursor",cDown);
                return;
            }
        }
        else if(isDown === false) delStyle($("html")[0]);
        o.css("cursor",c);
    }
    function delStyle(d){
        if(d.getAttribute("style") == "cursor: " + cDown + "; user-select: none; -webkit-user-drag: none;") d.removeAttribute("style");
        else d.css({"cursor":"","user-select":"","-webkit-user-drag":""});
        for(let i = 0;i < d.children.length; i++) delStyle(d.children[i]);
    }
}