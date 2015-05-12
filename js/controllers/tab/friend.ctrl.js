/**
 * Baymax 好友
 * sherlock221b
 */

Baymax.controller('FriendCtrl', function($scope,$q,$rootScope,UserSev,Util) {




    //新用户列表
    $scope.newUserList = [];
    $scope.contentList = [];
    $scope.connectUserList = []
    $scope.currentUser;
    $scope.message = "";
    $scope.messageType = "txt";
    var index = 0;

    //当前客服 从登录中取得
    var  custom = {
        csId : 1
    }

    var ws = new WebSocket("ws://172.16.130.83:8081/notify/CS");
    ws.onopen = function(){
        console.log("open..");
        var str = JSON.stringify(custom);
        ws.send(str);
    };

    ws.onmessage = function(message){
        var  res = JSON.parse(message.data);
        console.log("来自 : ",res);
        switch (res.notifyType){
            case "newMessage" :
                $scope.contentList.push(res.data);
                $scope.$apply();
                break;
            default :
                break;
        }
    };

    ws.onclose = function(){
        console.log("close..");
    };

    ws.onerror = function(){
        console.log("error..");
    };



    //建立连接
    $scope.connect  = function(userObj){

        //csUserId =
        userObj.csUserId = custom.csId;

        var user = {
            userId : userObj.userId,
            csUserId : userObj.csUserId,
            type  : userObj.type
        };

        $scope.currentUser = user;

        //用户建立链接
        UserSev.connectionUser(user).then(function(res){
            console.log(res);

            if(res){
                //获得一次用户最近历史记录
                UserSev.getUserHistory(index,user).then(function(res){
                    console.log("获得消息来自 历史记录:");
                    console.log(res);
                    index++;

                },function(err){
                    $rootScope.alertError("失败");
                });


            }
            else{
                $rootScope.alertError("此用户已经被抢走");

            }

        },function(error){
            $rootScope.alertError(error);
        });

    }



    //显示对话框
    $scope.showChat = function(user){
        $scope.currentUser = user;
        console.log($scope.currentUser);
    }

    //只在app 启动第一次的时候 获取 获取通知
    var  getAccpetUser = function(){
        UserSev.accpetUser().then(function(res){
            console.log(res);
            $scope.newUserList = res.data;
        },function(error){
            $rootScope.alertError(error);
        });
    }


    //获取已建立链接的列表
    var  getNotoverUser = function(csId){
        UserSev.getNotoverUser(csId).then(function(res){
            console.log(res);
            $scope.connectUserList = res.data;
        },function(error){
            $rootScope.alertError(error);
        });
    }


    //发送消息
    $scope.sendMessage = function(){
        var user = $scope.currentUser;
        var message =$scope.message;
        var messageType = $scope.messageType;
        UserSev.sendMessage(user,message,messageType).then(function(res){
            console.log(res);
            //$scope.$contentList.push(res);
        },function(error){
            $rootScope.alertError(error);
        });
    }


    //结束链接
    $scope.shutdown = function(user){
        var conf = confirm("确定要结束这个?");
        if(conf){
            UserSev.shutdown(user).then(function(res){
                console.log(res);
                if(res){
                    $rootScope.alertSuccess("断开成功");
                    $scope.connectUserList.remove(user);
                }
                else{
                    $rootScope.alertSuccess("断开失败");
                }
            },function(error){
                $rootScope.alertError(error);
            });;
        }
    }


    getAccpetUser();
    getNotoverUser(custom.csId);



});