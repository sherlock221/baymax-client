/**
 * Baymax 登录
 * sherlock221b
 */

Baymax.controller('LoginCtrl', function($scope,$q,$rootScope,$state,Util,SignSev) {

    $scope.fm = {
        userName : "",
        passWord : "",
        //typeName : "ldap",
        typeName : "cs"
    }


    $scope.login = function(){
        var access_token;

        SignSev.login($scope.fm.userName,$scope.fm.passWord,$scope.fm.typeName)
            //login
            .then(function(res){
                access_token  =res.access_token;
                return SignSev.launch(res, $scope.fm);
            },function(err){
                return $q.reject(err.error_description);
            })
            //launch
            .then(function(res) {
                //存储本次用户
                res.access_token = access_token;
                $rootScope.setUser("user",res);
                $state.go("app.main.tab.chat");

            },function(err) {
                $rootScope.alertError(err);
            });
    }
});