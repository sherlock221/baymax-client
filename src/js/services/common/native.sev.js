Baymax
    .factory("Native", function () {
        //gui
        var gui = require('nw.gui');
        //获得当前窗口
        var win = gui.Window.get();

        var Native = {
            showDev : function(isShow){
                if(isShow){
                    win.showDevTools('', true);
                }
                else{
                    win.closeDevTools();
                }
            },

            openWindow : function(url,obj){
                return gui.Window.open(url,obj);
            },

            minWindow : function(window){
                win.minimize();
            },
            setWindowSize : function(w,h){
                win.width  = w;
                win.height = h;
            },

            //获得剪贴板
            getCliboard : function(){
                var clipboard = gui.Clipboard.get();
                var text = clipboard.get('text');
                console.log(text);
                return text;
            },

            //设置剪切板
            setCliboard : function(content,type){
                var clipboard = gui.Clipboard.get();
                type = type || "text";
                clipboard.set(content, type);
            },

            //清除剪切板
            clearCliboard: function(){
                var clipboard = gui.Clipboard.get();
                clipboard.clear();
            }
        }
        return Native;

    });