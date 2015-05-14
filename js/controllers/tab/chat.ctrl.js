/**
 * Baymax 好友
 * sherlock221b
 */

Baymax.controller('ChatCtrl', function($scope,$q,$rootScope,$mdDialog,UserSev,SERVER) {

    $rootScope.navActive = 'chat';

    //通知列表首要消息

    //已建立链接列表
    $scope.connectUserList = []

    //当前选中用户
    $scope.currentUser;

    //是否获得焦点
    $scope.isFocus = "";


    $scope.message = "";
    $scope.messageType = "txt";

    //接收消息
    $scope.$on("newMessage",function(event,data){
        console.log("您有新消息 注意查收!!");
    });

    $scope.$on("resolveNotify",function(event,user){
        console.log("订阅到",user);
        //发起请求
        user.csUserId = $rootScope.user.csUserId;
        UserSev.connectionUser(user).then(function(result){
            if(result){
                //获得一次用户最近历史记录
                user.index = 0;
                UserSev.getUserHistory(user.index ,user).then(function(message){
                    console.log("获得消息来自 历史记录:");
                    console.log(message);

                    //删除现有通知
                    $rootScope.rejectNotify(user);

                    //将消息填充到用户内
                    user.message = message;
                    //填充用户
                    $scope.connectUserList.push(user);

                    //选中当前用户
                    $scope.currentUser  = user;

                },function(err){
                    $rootScope.alertError("获得用户历史记录失败！");
                });
            }
            else{
                $rootScope.alertError("和用户建立连接失败!");
            }

        });

    });



    //接受通知
    $scope.connect  = function(userObj){

        var user = {
            userId : userObj.userId,
            csUserId : $rootScope.user.csUserId,
            type  : userObj.type
        };

        $scope.currentUser = user;

        //接受用户
        UserSev.connectionUser(user).then(function(res){
            console.log(res);

            if(res){
                ////获得一次用户最近历史记录
                //UserSev.getUserHistory(index,user).then(function(res){
                //    console.log("获得消息来自 历史记录:");
                //    console.log(res);
                //    index++;
                //
                //},function(err){
                //    $rootScope.alertError("失败");
                //});

                //加入已建立链接
                $scope.connectUserList.push(user);

            }
            else{
                $rootScope.alertError("此用户已经被抢走");

            }

        },function(error){
            $rootScope.alertError(error);
        });
    }


    //选择用户
    $scope.selectUser = function(user){
        $scope.currentUser = user;
        $scope.isFocus = true;
    }

    //显示对话框
    $scope.showChat = function(user){
        $scope.currentUser = user;
        console.log($scope.currentUser);
    }

    //获取通知
    var  getAccpetUser = function(){
        UserSev.accpetUser().then(function(res){
            console.log(res);

            //填充通知列表
            $rootScope.notifyList = res.data;
            //将第一条消息显示在前面

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
                    //删除链接
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






    //初始化
    getAccpetUser();
    getNotoverUser($rootScope.user.csUserId);


});