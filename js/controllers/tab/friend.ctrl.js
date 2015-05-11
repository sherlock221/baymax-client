/**
 * Baymax 好友
 * sherlock221b
 */

Baymax.controller('FriendCtrl', function($scope,$q,$rootScope,UserSev,Util) {

    //新用户列表
    $scope.newUserList = [];


    //拉取一次用户
    UserSev.accpetUser().then(function(res){
        console.log(res);
        $scope.newUserList = res;

    },function(error){


    });

});