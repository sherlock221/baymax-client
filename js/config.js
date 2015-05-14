/**
 * Baymax 配置
 */



//定义主题
Baymax.config(function($mdThemingProvider,$mdIconProvider) {

    //设置主要颜色
    $mdThemingProvider.definePalette('baymaxTheme', {
        '50': 'ffebee',
        '100': 'ffcdd2',
        '200': 'ef9a9a',
        '300': 'e57373',
        '400': 'ef5350',
        '500': 'f44336',
        '600': 'e53935',
        '700': 'd32f2f',
        '800': 'c62828',
        '900': 'b71c1c',
        'A100': 'ff8a80',
        'A200': 'ff5252',
        'A400': 'ff1744',
        'A700': 'd50000',
        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
            '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });


    //设置主题
    $mdThemingProvider.theme('default')
         //基础颜色
        .primaryPalette('light-blue')
        //强调色
        .accentPalette('pink');


    //设置iocn图片
    $mdIconProvider
        .icon('arrow-left', 'imgs/icon/icon_arrow.svg')
        .icon('face', 'imgs/icon/icon_face.svg')
        .icon('picture', 'imgs/icon/icon_img.svg')
        .icon('break', 'imgs/icon/icon_break.svg')
});


//常量配置
Baymax.constant("VERSION",{
    vs : "100"
});


Baymax.constant("SERVER", {
    url : {
        uc  : "",
        message : "",
        push : "",
        sop  : "",
        im   : ""
    },

    //测试
    test : {
          uc  : "http://10.10.68.11:10000/uc",
          message : "http://10.10.68.11:10000/message",
          ucm  : "http://10.10.68.16:8081/ucm",
          push : "http://10.10.68.13:8080/notify",
          im   : "ws://10.10.68.16:8084/notify/CS",
          notify : "http://10.10.68.16:8084/notify"
    },

    //开发环境
    dev : {
        uc : "",
        message : ""
    },
    //预发布
    formal : {
        ucm  : "http://121.41.78.49:8080/ucm",
        uc  : "http://imzhiliao.com:10000/uc",
        message : "http://imzhiliao.com:10000/message",
        push : "http://121.41.61.218:8080/notify",
        im   : "ws://121.41.61.218:8080/notify/customerIM",
        sop  : "http://121.41.61.218:9003",
        mBridge : "http://10.10.68.16:8082/mBridge",
        credit : "http://imzhiliao.com:10000/credit",
        file : "http://imzhiliao.com:10000/file"
    }
});

//配置http 拦截器
Baymax.config(function($httpProvider){
    $httpProvider.interceptors.push("AjaxInterceptors");
});


//进度条加载
Baymax.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
}])



//启动项
Baymax.run(function($rootScope,VERSION){
    $rootScope.VERSION = VERSION;
});
