/**
 * Baymax 好友
 * sherlock221b
 */




Baymax.controller('ChatCtrl', function ($scope, $q, $rootScope, DB,ChatServiceComponent,ChatUserComponent,ChatMenuComponent, $mdDialog, $sce, UserSev,CacheCons,FileSev,SERVER) {

    $rootScope.navActive = 'chat';

    //通知列表首要消息
    $scope.options = {
        'linkTarget': '_blank',
        'basicVideo': false,
        'code': {
            'highlight': true,
            'lineNumbers': true
        },
        'video': {
            'embed': true,
            'width': 800,
            'ytTheme': 'light',
            'details': true,
            'ytAuthKey': 'AIzaSyAQONTdSSaKwqB1X8i6dHgn9r_PtusDhq0'
        },
        'image': {
            'embed': true
        }
    };

    //聊天用户部分
    new ChatUserComponent($scope);
    //聊天菜单部分
    new ChatMenuComponent($scope);


    //音频下载
    var audioMessage = function(path){
        var dir = CacheCons.voiceDir;
        var defer = $q.defer();
        //检测文件是否存在
        FileSev.iseExist(path,dir)
                .then(function(res){
                    if(!res){
                        FileSev.download({
                            fileUrl : path,
                            downloadDir : dir
                        },function(data){
                        },function(res){
                            defer.resolve(res);
                        });
                    }
                });
            return defer.promise;
        }

    //接收消息
    $scope.$on("newMessage", function (event, res) {
        console.log("您有新消息 注意查收!!");
        var index = ChatServiceComponent.findUserByUserId(res.data.sendUserId,$scope);
        if (index !== "") {
            var user = $scope.connectUserList[index];
            user.message = user.message || [];
            user.message.push(res.data);

            //显示小红点
            ChatServiceComponent.showRedot(user,$scope);

            //更新
            $scope.$apply();

            //通知
            var icon = user.attribute.userInfo.userIcon || "imgs/user-default.png";
            var ct = res.data.msgContent || "有新消息了!";
            $scope.notify(user.attribute.userInfo.userName, ct, icon);


            //缓存入库
            DB.insertMessage(res.data);

        }
    });

    $scope.$on("resolveNotify", function (event, user) {
        console.log("订阅到", user);
        //发起请求
        user.csUserId = $rootScope.user.csUserId;
        UserSev.connectionUser(user).then(function (result) {
            if (result) {
                //获得一次用户最近历史记录
                user.index = 0;

                UserSev.getUserHistory(user.index, user).then(function (message) {
                    console.log("获得消息来自 历史记录:");
                    console.log(message);

                    //将消息填充到用户内
                    user.message = message;
                    //选中当前用户
                    $scope.currentUser = user;

                }, function (err) {
                    $rootScope.alertError("获得用户历史记录失败！");
                });


                //填充用户
                $scope.connectUserList.push(user);
                //删除现有通知
                $rootScope.rejectNotify(user);

            }
            else {
                $rootScope.alertError("和用户建立连接失败!");
            }

        });

    });


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
        UserSev.getNotoverUser(csId).then(function (res) {
            console.log(res);
            $scope.connectUserList = res.data;
        }, function (error) {
            $rootScope.alertError(error);
        });
    }


    //初始化
    getAccpetUser();
    getNotoverUser($rootScope.user.csUserId);


});


