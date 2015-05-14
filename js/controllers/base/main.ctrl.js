

Baymax.controller('MainCtrl', function($scope,$rootScope,$mdToast,Util,SERVER) {
        console.log("main ctrl..");



    var ws;
    $rootScope.user = $rootScope.getUser();

    //通知列表
    $rootScope.notifyList  = [];



    //拒绝通知
    $rootScope.rejectNotify = function(notify){
        $rootScope.notifyList.removeObj(notify,"id");
    }

    //接受通知
    $rootScope.resolveNotify = function(notify){
        $scope.$broadcast("resolveNotify",notify);
    }


    var  initWebSocket = function(){
        ws = new WebSocket(SERVER.url.im);

        ws.onopen = function(){
            console.log("ws 链接已经建立..");
            var str = JSON.stringify($rootScope.user);
            ws.send(str);
        };
        ws.onmessage = function(message){
            console.log("ws 推送消息..");
            var  res = JSON.parse(message.data);
            notify(res.notifyType,res);
        };

        ws.onclose = function(){
            $rootScope.alertInfo("链接已经被关闭!");
        };

        ws.onerror = function(error){
            $rootScope.alertError("链接出错!");
            console.log(error);
        };
    }

    //创建websocket 链接
    if($rootScope.user){
        initWebSocket();
    }
    else{
        $rootScope.alertError("当前用户不存在!");
    }

    var notify = function(notifyType,res){
        console.log("消息类型: ",notifyType);
        console.log("消息",res);


        //通知
        if(notifyType == "notAccept"){
            $rootScope.notifyList.push(res.data);
        }
        else{
            //非通知类
            $scope.$broadcast(notifyType,res);
        }

    }





});