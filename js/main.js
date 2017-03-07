'use strict';
//设为首页
function SetHome(obj, url) {
    try {
        obj.style.behavior = 'url(#default#homepage)';
        obj.setHomePage(url);
    } catch (e) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } catch (e) {
                alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
            }
        } else {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【" + url + "】设置为首页。");
        }
    }
}
//收藏本站
function AddFavorite(title, url) {
    try {
        window.external.addFavorite(url, title);
    } catch (e) {
        try {
            window.sidebar.addPanel(title, url, "");
        } catch (e) {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
};
var ws;
//webSoket
function Socket($opt){
        if ("WebSocket" in window){
            console.log("您的浏览器支持 WebSocket!");
            // 打开一个 web socket
            ws = new WebSocket($opt);

            ws.onopen = function()
            {
              // Web Socket 已连接上，使用 send() 方法发送数据
            };
            ws.onmessage = function (evt) 
            { 
                console.log(evt.data);
              alert("您的号码已接受,稍后我们将给您回电！");
              ws.close();
            };
            ws.onclose = function()
            { 
              // 关闭 websocket
              console.log("连接已关闭..."); 
            };
        }else{
            // 浏览器不支持 WebSocket
            console.log("您的浏览器不支持 WebSocket!");
        }
};
$(document).ready(function(){
    $.ajax({
        url:"http://127.0.0.1:3000/get",
        type:"GET",
        success:function(data){
            console.log(data);
             Socket(JSON.parse(data).ip);
                 $("#sentNum").on("click",function(){
                var num=$("#inputNum").val();
                if(ws.readyState==3){
                    alert("您已经提交过了号码")
                }else{
                        if(num!=""){
                        ws.send(num);
                    }else{
                        alert("请填写正确号码");
                    } 
                }
       
    })

        }
    })
   
});





