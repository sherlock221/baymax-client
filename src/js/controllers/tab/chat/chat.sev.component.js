/**
 * chat 底部菜单部分
 */

Baymax.service("ChatServiceComponent",function(){


    //查找用户
    var findUserByUserId = function (sendUserId,$scope) {

        for (var i = 0; i < $scope.connectUserList.length; i++) {
            var user = $scope.connectUserList[i];
            if (user.userId == sendUserId) {
                return i;
            }
        }
        return "";
    }

    //显示小红点
    var showRedot = function (user,$scope) {
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


    //创建消息
    var createMessage = function (msgContent,messageType,sendUserId,userInfo,conversationId,obj) {
        var img, voice;

        if (messageType == "img") {
            img = obj;
        }
        else if (messageType == "voice") {
            voice = obj;
        }

        var temp = angular.copy(userInfo);
        temp= {"userIcon" : temp.userIcon,"userId" : temp.userId, "userName" : temp.userName}

        return {
            "msgId": "",
            "csMsgSendType": "send",
            "msgSendTime": new Date().getTime(),
            "msgContent": msgContent,
            "sendUserId": sendUserId,
            "messageType" : messageType,
            "senderInfo" : JSON.stringify(temp) || "",
            "img" : img || "",
            "voice" : voice ||"",
            "conversationId" : conversationId
        }
    }



    return {
        findUserByUserId : findUserByUserId,
        showRedot : showRedot,
        hideRedot : hideRedot,
        createMessage : createMessage
    }

});
