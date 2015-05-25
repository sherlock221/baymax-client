/**
 * Baymax 历史消息
 * sherlock221b
 */




Baymax.controller('HistoryCtrl', function($scope, $q, $rootScope,$mdDialog,UserSev,CurrentUser){
    console.log("history...");


    //历史记录
    $scope.historys = [];

    //当前用户
    $scope.cUser = CurrentUser;


    var index = 0;
    var isEnd = false;
    var getHistory  = function(index,op){
        var temp = angular.copy($scope.cUser);
        delete temp.message;
        UserSev.getUserHistory(index,temp).then(function (message) {
            console.log(message);

            if(message.length <= 0) {
                //归0
                index = 0;
                isEnd = true;
            }
            else if($scope.historys.length <= 0){
                $scope.historys = message;
            }
            else if(op == "+"){
                $scope.historys.unshiftArray(message);
                console.log("history",$scope.historys);
            }
    },function (err) {
            $rootScope.alertError("获得用户历史记录失败！");
        });
    }


    //下一页
    $scope.pull = function(){
        if(isEnd) {
            $rootScope.alertInfo("没有了");
            return;
        }
        index++;
        getHistory(index,'+');
    }


    $scope.close = function(answer) {
        $mdDialog.hide(answer);
    };

    //获得历史记录
    getHistory(index);

});


