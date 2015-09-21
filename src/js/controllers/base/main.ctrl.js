


Baymax.controller('MainCtrl', function($scope,$q,$rootScope,$mdToast,UserSev,Util,SERVER) {
        console.log("main ctrl..");

    var ws;
    $rootScope.user = $rootScope.getUser();

    //通知列表
    $rootScope.notifyList  = [];

    //已建立链接列表
    $rootScope.connectUserList = [];

    //拒绝通知
    $rootScope.rejectNotify = function(notify){
        $rootScope.notifyList.removeObj(notify,"id");
    }

    //接受通知
    $rootScope.resolveNotify = function(notify){
        $scope.$broadcast("resolveNotify",notify);
    }

    var  initWebSocket = function(){
        ws = new ReconnectingWebSocket(SERVER.url.im);
        ws.onopen = function(){
            console.log("ws 链接已经建立..");
            var str = JSON.stringify($rootScope.user);
            ws.send(str);
            $rootScope.alertSuccess("服务器已经连接...");
            notify("open_socket",{});
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

    $rootScope.noop = function(){
        return false;
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
            //var newList = $scope.notifyList.concat(res.data).unique('userId');
            var newList = _.uniq($rootScope.notifyList.concat(res.data),false,function(a,b){
                return a.userId;
            });
            console.log("去重.....");
            console.log(newList);
            $rootScope.notifyList = newList;
            //去重
            $rootScope.$apply();
        }
        //其他登录
        else if(notifyType == "isLogin"){
            $rootScope.dialog("","提示","您的账号已经在别的设备登陆!","",function(){
                $rootScope.loginFrame();
            });

        }
        //登录完成
        else if(notifyType == "loginSuccess"){
            init();
        }

        else{
            //非通知类
            $scope.$broadcast(notifyType,res);
        }
    }


    $rootScope.settingLayer = false;

    //切换设置
    $rootScope.toggleSetting = function(){
        $rootScope.settingLayer = !$rootScope.settingLayer
    }


    //获取通知
    var getAccpetUser = function () {
        UserSev.accpetUser().then(function (res) {
            console.log(res);
            //填充通知列表
            $rootScope.notifyList = res.data;
            //将第一条消息显示在前面
        }, function (error) {
            $rootScope.alertError(error);
        });
    }

    //获取已建立链接的列表
    var getNotoverUser = function (csId) {
        return   UserSev.getNotoverUser(csId);
    }


    //获取用户的历史会话
    var getUserHistory = function(index,userList){
        var historys = [];
        var hsFun = [];
        for(var i=0;i<userList.length;i++){
            var u = userList[i];
                hsFun.push(UserSev.getUserHistory(index,u));
        }
        return $q.all(hsFun)
    }


    //初始化操作
    var init = function(){
        //初始化
        getAccpetUser();
        getNotoverUser($rootScope.user.csUserId)
            .then(function (res) {
                console.log(res);
                $rootScope.connectUserList = res.data;
                return getUserHistory(0,res.data);
            })
            .then(function(res){
                if(res.length>0){
                    for(var j=0;j<$rootScope.connectUserList.length;j++){
                        $rootScope.connectUserList[j].message =res[j] ;
                    }
                }
                console.log($rootScope.connectUserList);
            },function (error) {
                $rootScope.alertError(error);
            })
        }


})



.controller("SettingCtrl",function($rootScope,$state,$scope,UserSev){
        //设置界面
        $scope.settings = [
            { name: '开发者工具', extraScreen: '开发者工具', key:"dev", icon: 'developer', enabled: false },
            { name: '桌面通知', extraScreen: '桌面通知', key : "notify",icon: 'notify-on', enabled: true },
            { name: '最大会话数', extraScreen: '最大会话数',  type:"input", value : 0, key : "cons",icon: 'notify-on', enabled: false },
        ];

        $scope.settingChange = function(setting){
                switch(setting.key){
                    case  "dev":
                       // Native.showDev(setting.enabled);
                        break;
                    case  "notify":

                    case  "cons":
                        //设置最大连接数
                        if(!setting.enabled){
                            console.log("max save...");
                            UserSev.setMaxConversation($rootScope.user.csUserId,setting.value).then(function(res){
                                if(res){
                                    $rootScope.alertSuccess("设置成功!");
                                }
                                else{
                                    $rootScope.alertError("设置最大会话 服务器错误!");
                                }
                            });
                        }
                        break;
                    default :
                        break;
                }
        }

        $rootScope.loginFrame = function(){
            var url = "index.html#app/auth/login";
            //Native.openWindow(url,{
            //    "toolbar": false,
            //    "frame": false,
            //    "width": 380,
            //    "height" : 390,
            //    "resizable": false,
            //    "transparent": true,
            //    "focus" : true
            //});
            //window.close();
            $state.go("app.auth.login");
        }

        var searchUserSetting = function(){
            UserSev.getMaxConversation($rootScope.user.csUserId).then(function(res){
                if(res){
                    $scope.settings[2].value = res;
                }
            });
        }

        //查询客服配置
        searchUserSetting();

    });