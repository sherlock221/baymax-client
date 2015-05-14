

Baymax.controller('BaymaxCtrl', function($scope,$rootScope,$mdToast,$mdDialog,Util,SERVER) {
        console.log("欢迎来到baymax");

        //测试url
        SERVER.url = SERVER.test;

        $rootScope.setUser = function(key,user){
            Util.setLg(key,user);
            $rootScope.user = user;
        }

        $rootScope.alertError = function(content,title){
               // alert(content);
            }

        $rootScope.alertSuccess = function(content,title){
                 alert(content);
            }

        $rootScope.alertInfo = function(content,title){
                 alert(content);
            }




    //显示notify列表
    $rootScope.showNotifyList = function(ev) {
        $mdDialog.show({
            controller: "NotifyListCtrl",
            templateUrl: 'tpl/notify/notify-list.html',
            targetEvent: ev
        })
            .then(function(answer) {
                $scope.alert = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.alert = 'You cancelled the dialog.';
            });
    };




        //提示信息
        var  toastPosition = {
            bottom: false,
            top: true,
            left: false,
            right: true
        };

        var  getToastPosition = function() {
            return Object.keys(toastPosition)
                .filter(function(pos) { return toastPosition[pos]; })
                .join(' ');
        };

        //提示信息
        $rootScope.toast = function(content,delay) {
            delay  = delay || 3000;

            $mdToast.show(
                $mdToast.simple()
                    .content(content)
                    .position(getToastPosition())
                    .hideDelay(delay)
            );
        };

        //自定提示信息
        //$scope.showCustomToast = function() {
        //    $mdToast.show({
        //        controller: 'ToastCtrl',
        //        templateUrl: 'toast-template.html',
        //        hideDelay: 6000,
        //        position: $scope.getToastPosition()
        //    });
        //};

});