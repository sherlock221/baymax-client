

Baymax.controller('BaymaxCtrl', function($scope,$rootScope,Util,SERVER) {
        console.log("欢迎来到baymax");



        //测试url
        SERVER.url = SERVER.test;



        $rootScope.setUser = function(key,user){
            Util.setLg(key,user);
            $rootScope.user = user;
        }


        $scope.alertError = function(content,title){
            alert(content);
        }

        $scope.alertSuccess = function(content,title){
             alert(content);
        }

        $scope.alertInfo = function(content,title){
             alert(content);
        }

});