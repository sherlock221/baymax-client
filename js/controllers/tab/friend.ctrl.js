/**
 * Baymax 好友
 * sherlock221b
 */

Baymax.controller('FriendCtrl', function($scope,$q,$rootScope,UserSev,Util) {

    //新用户列表
    $scope.newUserList = [];


    //建立连接
    $scope.connect  = function(userObj){

        //csUserId =
        userObj.csUserId = 1;


        var user = {
            userId : userObj.userId,
            csUserId : userObj.csUserId,
            type  : userObj.type
        };

        UserSev.connectionUser(user).then(function(res){
            console.log(res);

        },function(error){
            $rootScope.alertError(error);
        });

    }


    //拉取一次用户
    var  getAccpetUser = function(){
        UserSev.accpetUser().then(function(res){
            console.log(res);
            $scope.newUserList = res.data;
        },function(error){
            $rootScope.alertError(error);
        });
    }



    getAccpetUser();



});