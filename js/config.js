/**
 * Micro 配置
 */


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
          im   : "ws://10.10.68.13:8080/notify/customerIM",
          sop  : "http://121.41.61.218:9003",
          mBridge : "http://10.10.68.16:8082/mBridge",
          credit : "http://10.10.68.11:8080/credit",
          file : "http://10.10.68.11:10000/file",
          notify : "http://172.16.130.83:8081/notify"
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
