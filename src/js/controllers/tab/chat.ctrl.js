/**
 * Baymax 好友
 * sherlock221b
 */




Baymax.controller('ChatCtrl', function ($scope, $q, $rootScope, $mdDialog, $sce, UserSev, EmojiConstants, focus, UploadSev,CacheCons,FileSev,SERVER) {


    $rootScope.navActive = 'chat';

    $scope.EmojiConstants = EmojiConstants;


    $scope.emojiToggle = false;





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

    //已建立链接列表
    $scope.connectUserList = []

    //当前选中用户
    $scope.currentUser;


    $scope.messageTemp = {
        message: "",
        messageType: "txt"
    }

    $scope.sendStatus = "";


    var findUserByUserId = function (sendUserId) {
        for (var i = 0; i < $scope.connectUserList.length; i++) {
            var user = $scope.connectUserList[i];
            if (user.userId == sendUserId) {
                return i;
            }
        }
        return "";
    }


    //显示小红点
    var showRedot = function (user) {
        //判断是否是当前用户 不是则显示
        if (!$scope.currentUser || $scope.currentUser.id != user.id) {
            //小红点推送的数字 会在用户上面进行累加
            user.redDot = user.redDot || 0;
            user.redDot++;
        }
    }


    //关闭小红点
    var hideRedot = function (user) {
        delete user.redDot;
    }


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
        var index = findUserByUserId(res.data.sendUserId);
        if (index !== "") {

            var user = $scope.connectUserList[index];
            user.message = user.message || [];
            user.message.push(res.data);

            //语音消息需要下载
            if(res.data.msgType == "voice"){
                audioMessage(res.data.voice.voiceUrl)
                                .then(function(data){
                                    res.data.voice.voiceUrl = data;
                                    //$scope.$apply();
                                 });

                res.data.voice.voiceUrl = "";
            }


            //显示小红点
            showRedot(user);

            //更新
            $scope.$apply();

            //通知一发
            var icon = user.attribute.userInfo.userIcon || "imgs/user-default.png";
            //$scope.notify(user.attribute.userInfo.userName,res.data.msgContent,icon);
            var ct = res.data.msgContent || "有新消息了!";
            $scope.notify(user.attribute.userInfo.userName, ct, icon);

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

                    //删除现有通知
                    $rootScope.rejectNotify(user);

                    //将消息填充到用户内
                    user.message = message;
                    //填充用户
                    $scope.connectUserList.push(user);
                    //选中当前用户
                    $scope.currentUser = user;

                }, function (err) {
                    $rootScope.alertError("获得用户历史记录失败！");
                });
            }
            else {
                $rootScope.alertError("和用户建立连接失败!");
            }

        });

    });

    //选择用户
    $scope.selectUser = function (user) {
        user.message = user.message || [];
        $scope.currentUser = user;
        hideRedot($scope.currentUser);
        //focus('awesome');

    }

    //显示对话框
    $scope.showChat = function (user) {
        $scope.currentUser = user;
        console.log($scope.currentUser);
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
        UserSev.getNotoverUser(csId).then(function (res) {
            console.log(res);
            $scope.connectUserList = res.data;
        }, function (error) {
            $rootScope.alertError(error);
        });
    }

    //创建消息
    var createMessage = function (msgContent, msgType, userId, obj) {
        var sendTime = moment().format('YYYY-MM-DD hh:mm:ss');
        var img, voice;

        if (msgType == "img") {
            img = obj;
        }
        else if (msgType == "voice") {
            voice = obj;
        }
        return {
            "csMsgSendType": "send",
            "msgContent": msgContent,
            "msgSendTime": sendTime,
            "msgType": msgType,
            "img": img || "",
            "voice": voice || "",
            "userId": userId
        }
    }


    //发送消息文字 基本消息
    $scope.sendMessage = function () {
        var user = $scope.currentUser;
        var message = $scope.messageTemp.message;
        var messageType = $scope.messageTemp.messageType;
        var ctMsg;
        if (!message) {
            return;
        }
        //发送消息
        var uIndex = findUserByUserId(user.userId);
        if (uIndex !== "") {
            ctMsg = createMessage(message, messageType, user.userId);
            var mg = $scope.connectUserList[uIndex].message;
            ctMsg.sendStatus = "running";
            mg.push(ctMsg);
        }
        $scope.messageTemp.message = "";

        UserSev.sendMessage(user, message, messageType).then(function (res) {
            if (!res) {
                $rootScope.alertError("消息发送失败！");
                ctMsg.sendStatus = "error";
            }
            else {
                delete ctMsg.sendStatus;
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
        var uIndex = findUserByUserId(user.userId);
        if (uIndex !== "") {
            ctMsg = createMessage("", messageType, user.userId, obj);
            mg = $scope.connectUserList[uIndex].message;
            ctMsg.sendStatus = "running";
            index = mg.push(ctMsg) - 1;
        }

        $scope.messageTemp.message = "";

         //发送图文消息
         UploadSev .upload(file[0])
                   .progress(function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                    })
                   .success(function (res, status, headers, config) {
                        if (res.code != 200) {
                            return $q.reject("文件服务器错误");
                        }

                        if (ctMsg.messageType = "img") {
                            mg[index].img.picUrl = res.data.url;
                            mg[index].img.picWidth = res.data.width;
                            mg[index].img.picHeight = res.data.height;

                            return UserSev.sendMessage(user, "", messageType, mg[index].img);
                        }
                        else if (ctMsg.messageType = "voice") {
                            mg[index].voice = res.data;
                            return UserSev.sendMessage(user, "", messageType, mg[index].voice);
                        }
                        console.log(res);
                        console.log("上传成功..");
                    })
                   .error(function(error){
                          return $q.reject("error 上传失败！");
                    })
                   .then(function (res) {
                        if (!res) {
                            $rootScope.alertError("消息发送失败！");
                            ctMsg.sendStatus = "error";
                        }
                        else {
                            delete ctMsg.sendStatus;
                        }
                    },function (error) {
                        $rootScope.alertError(error);
                        delete ctMsg;
                    });

    }


    //回车发送消息
    $scope.enter = function (ev) {
        if (ev.keyCode !== 13) return;
        $scope.sendMessage();
    }


    //结束链接
    $scope.stopConnect = function (env) {

        //获得当前用户
        var user = $scope.currentUser;

        //提示
        $rootScope.confirm(env, "断开与当前用户的连接", "您确定要断开与前用户的连接").then(function () {

            UserSev.shutdown(user).then(function (res) {
                console.log(res);
                if (res) {
                    $rootScope.alertSuccess("断开成功");
                    //删除链接
                    $scope.connectUserList.removeObj(user, "id");
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


    //上传图片
    $scope.uploadPic = function (files, $event, type) {

        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var temp = files[i];
                //发送图文消息
                UploadSev.upload(temp).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    //if(data.code == "200"){
                    //    if(type == "small"){
                    //        $scope.fm.smallImage = data.data.url;
                    //    }
                    //    else if(type== "medium"){
                    //        $scope.fm.mediumImage = data.data.url;
                    //    }
                    //    else if(type== "big"){
                    //        $scope.fm.bigImage = data.data.url;
                    //    }
                    //    else if(type == "info"){
                    //        $scope.fm.comment.productImage.push(data.data.url);
                    //    }
                    //}
                    //else{
                    //    alert(data.code);
                    //}
                    console.log(data);
                });
            }
        }
    }

    //初始化
    getAccpetUser();
    getNotoverUser($rootScope.user.csUserId);


});