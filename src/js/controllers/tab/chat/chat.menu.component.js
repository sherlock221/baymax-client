/**
 * chat 底部菜单部分
 */

Baymax.factory("ChatMenuComponent",function($rootScope,$mdDialog,ChatServiceComponent,DB,UploadSev,focus,UserSev,EmojiConstants){

    return function($scope){

        $scope.EmojiConstants = EmojiConstants;
        $scope.emojiToggle = false;

        $scope.messageTemp = {
            message: "",
            messageType: "txt"
        }

        $scope.sendStatus = "";


        //选择emoji
        $scope.emojiSelect = function (emoji) {
            $scope.messageTemp.message += emoji.key;
            $scope.emojiToggle = false;
            focus('awesome');
        }

        //关闭emoji
        $scope.openEmoji = function () {
            $scope.emojiToggle = true;
        }

        $scope.closeEmoji = function () {
            $scope.emojiToggle = false
        }


        //发送消息文字 基本消息
        $scope.sendMessage = function () {
            var user = $scope.currentUser;
            var message = $scope.messageTemp.message;
            var messageType = $scope.messageTemp.messageType;
            var conversationId = user.id;
            var ctMsg;
            if (!message) {
                return;
            }

            //发送消息
            var uIndex = ChatServiceComponent.findUserByUserId(user.userId,$rootScope);
            if (uIndex !== "") {
                ctMsg = ChatServiceComponent.createMessage(message,messageType,user.userId,user,conversationId,"");
                console.log("发送消息....",ctMsg);
                var mg = $rootScope.connectUserList[uIndex].message;
                ctMsg.sendStatus = "running";
                mg.push(ctMsg);
            }
            $scope.messageTemp.message = "";

            UserSev.sendMessage(ctMsg).then(function (res) {
                if (!res.result) {
                    $rootScope.alertError("消息发送失败！");
                    ctMsg.sendStatus = "error";
                }
                else {
                    delete ctMsg.sendStatus;

                    //加入缓存
                    ctMsg.msgId =res.msgId;
                    DB.insertMessage(ctMsg);
                }
            }, function (error) {
                $rootScope.alertError(error);
                ctMsg.sendStatus = "error";
            });
        }

        //发送图文和语音(文件消息)
        $scope.sendFileMessage = function (file, event, messageType) {
            if (file.length <= 0) {
                return;
            }
            var user = $scope.currentUser;
            var conversationId = user.id;

            var obj;
            if (messageType == "img") {
                obj = {
                    picUrl: "imgs/logo.png",
                    picWidth: "",
                    picHeight: ""
                };
            }
            else if (messageType == "voice") {
                obj = {
                    voiceUrl: "",
                    voiceSecond: ""
                };
            }

            var ctMsg;
            var index;
            var mg;
            //发送消息
            var uIndex = ChatServiceComponent.findUserByUserId(user.userId,$rootScope);
            if (uIndex !== "") {
                ctMsg = ChatServiceComponent.createMessage("",messageType,user.userId,user,conversationId,obj);
                mg = $rootScope.connectUserList[uIndex].message;
                ctMsg.sendStatus = "running";
                index = mg.push(ctMsg) - 1;
            }

            $scope.messageTemp.message = "";

            //发送图文消息
            UploadSev .upload(file[0])

                //进度
                .progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                })
                .success(function (res, status, headers, config) {
                })
                //成功
                .then(function (res) {
                    res = res.data;
                    if (res.code != 200) {
                        return $q.reject("文件服务器错误");
                    }

                    if (ctMsg.messageType = "img") {
                        ctMsg.img.picUrl = res.data.url;
                        ctMsg.img.picWidth = res.data.width;
                        ctMsg.img.picHeight = res.data.height;
                    }
                    else if (ctMsg.messageType = "voice") {
                        ctMsg.voice = res.data;
                    }
                    console.log(res);
                    console.log("上传成功..");
                    return UserSev.sendMessage(ctMsg);
                })

                //发送消息
                .then(function(res){
                    if (!res.result) {
                        $rootScope.alertError("消息发送失败！");
                        ctMsg.sendStatus = "error";
                    }
                    else {
                        delete ctMsg.sendStatus;

                        //加入缓存
                        ctMsg.msgId =res.msgId;
                        DB.insertMessage(ctMsg);
                    }
                },function(error){
                        console.log("error...");
                        $rootScope.alertError(error);
                        delete ctMsg;
                });

        }


        //回车发送消息
        $scope.enter = function (ev) {
            if (ev.keyCode !== 13) return;
            $scope.sendMessage();
        }

        //打开历史记录
        $scope.openHistory = function($event){

            $mdDialog.show({
                controller: "HistoryCtrl",
                templateUrl: 'tpl/tab/history.html',
                targetEvent: $event,
                locals : {
                    CurrentUser : $scope.currentUser
                }
            });

        }

        //结束链接
        $scope.stopConnect = function (env) {

            //获得当前用户
            var user = $scope.currentUser;

            //提示
            $rootScope.confirm(env, "断开与当前用户的连接", "您确定要断开与前用户的连接").then(function () {

                var temp  = angular.copy(user);
                delete temp.message;
                UserSev.shutdown(temp).then(function (res) {
                    console.log(res);
                    if (res) {
                        $rootScope.alertSuccess("断开成功");
                        //删除链接
                        $rootScope.connectUserList.removeObj(user, "id");
                        $scope.currentUser = "";
                    }
                    else {
                        $rootScope.alertSuccess("断开失败");
                    }
                }, function (error) {
                    $rootScope.alertError(error);
                });

            }, function () {

            });


        }



    }

});
