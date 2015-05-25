/**
 * chat 用户列表部分
 */


Baymax.factory("ChatUserComponent",function($rootScope,ChatServiceComponent){

    return function($scope){

        //当前选中用户
        $scope.currentUser;




        //选择用户
        $scope.selectUser = function (user) {
            user.message = user.message || [];
            $scope.currentUser = user;
            ChatServiceComponent.hideRedot($scope.currentUser);
            //focus('awesome');

        }


        //显示对话框
        $scope.showChat = function (user) {
            $scope.currentUser = user;
            console.log($scope.currentUser);
        }

    }

});
