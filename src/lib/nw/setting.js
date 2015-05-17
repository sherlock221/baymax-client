

var gui = require('nw.gui');
var win = gui.Window.get();



var  initNativeMenuBar = function(){
    var nativeMenuBar = new gui.Menu({ type: "menubar" });
    try {
        nativeMenuBar.createMacBuiltin("My App", {

        });
        win.menu = nativeMenuBar;
    } catch (ex) {
        console.log(ex.message);
    }
}



var initTray = function(){
    var tray = new gui.Tray({ icon:"icons/BM16.png"});
    tray.tooltip = '点此打开';
}


//添加快捷键操作
initNativeMenuBar();
//添加托盘
initTray();



//阻止文件拖拽进窗口
//$(window).on('dragover', function (e) {
//    e.preventDefault();
//    e.originalEvent.dataTransfer.dropEffect = 'none';
//});
//
//
//$(window).on('drop', function (e) {
//    e.preventDefault();
//});
