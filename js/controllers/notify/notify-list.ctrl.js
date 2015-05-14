
Baymax.controller('NotifyListCtrl', function($scope,$rootScope,$mdDialog,Util,SERVER) {

    console.log("NotifyListCtrl...");


    $scope.close = function(answer) {
        $mdDialog.hide(answer);
    };
});