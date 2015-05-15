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

    $scope.messageTemp  = {
        message  : "",
        messageType : "txt"
    }


    var  findUserByUserId = function(sendUserId){
        for (var i=0;i<$scope.connectUserList.length;i++){
            var user =  $scope.connectUserList[i];
            if(user.userId == sendUserId){
                return  i;
            }
        }
        return "";
    }

    //接收消息
    $scope.$on("newMessage",function(event,res){
        console.log("您有新消息 注意查收!!");
        var index =  findUserByUserId(res.data.sendUserId);
        if(index !== ""){
            var user = $scope.connectUserList[index];
            user.message =  user.message || [];
            user.message.push(res.data);
            //更新
            $scope.$apply();

            //通知一发
            var icon = user.attribute.userInfo.userIcon || "imgs/user-default.png";
            $scope.notify(user.attribute.userInfo.userName,res.data.msgContent,icon);

        }
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



    //选择用户
    $scope.selectUser = function(user){
        user.message = user.message  || [];
        $scope.currentUser = user;
        $scope.isFocus = true;
        //初始化message

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

    //创建消息
    var createMessage = function(msgContent,msgType,userId){

        var sendTime = moment().format('YYYY-MM-DD hh:mm:ss');
        return {
            "csMsgSendType" : "send",
            "msgContent" : msgContent,
            "msgSendTime" : sendTime,
            "msgType" : msgType,
            "userId"  : userId
        }
    }


    //发送消息
    $scope.sendMessage = function(){
        var user = $scope.currentUser;
        var message =$scope.messageTemp.message;
        var messageType = $scope.messageTemp.messageType;


        UserSev.sendMessage(user,message,messageType).then(function(res){
            if(!res){
                $rootScope.alertError("消息发送失败！");
            }
            else{
                //成功
                $scope.messageTemp.message = "";

                 var uIndex = findUserByUserId(user.userId);
                 if(uIndex !== ""){
                     var ctMsg = createMessage(message,messageType,user.userId);
                     var mg = $scope.connectUserList[uIndex].message;
                     mg.push(ctMsg);
                 }

            }
        },function(error){
            $rootScope.alertError(error);
        });
    }

    //回车发送消息
    $scope.enter = function(ev){
        if (ev.keyCode !== 13) return;
        $scope.sendMessage();
    }




    //结束链接
    $scope.stopConnect = function(env){

        //获得当前用户
        var user = $scope.currentUser;

        //提示
        $rootScope.confirm(env,"断开与当前用户的连接","您确定要断开与前用户的连接").then(function(){

            UserSev.shutdown(user).then(function(res){
                console.log(res);
                if(res){
                    $rootScope.alertSuccess("断开成功");
                    //删除链接
                    $scope.connectUserList.removeObj(user,"id");
                    $scope.currentUser = "";
                }
                else{
                    $rootScope.alertSuccess("断开失败");
                }
            },function(error){
                $rootScope.alertError(error);
            });

        },function(){

        });





    }


    //初始化
    getAccpetUser();
    getNotoverUser($rootScope.user.csUserId);


});