Baymax
    .factory("Util", function ($window) {
        var Util = {
            uuid : function() {
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = "-";

            var uuid = s.join("");
            return uuid;
        },


            isEmptyObject : function(model){
                if (typeof model.rows === "object" && !(model.rows instanceof Array)){
                    var hasProp = false;
                    for (var prop in model.rows){
                        hasProp = true;
                        break;
                    }
                    if (hasProp){
                        model.rows = [model.rows];
                    }else{
                        throw "model.rows is empty object";
                        return false;
                    }
                }
            },
            caclTotal : function($scope){
                var size   = parseInt($scope.pageSize);
                var total  = parseInt($scope.pageTotal);
                var  currentPage;
                if( total %  size   == 0){
                    currentPage = total / size;
                }
                else{
                    currentPage  = parseInt(total / size) + 1;
                }
                $scope.pageTotal = currentPage;
            },

            calcPage : function($scope,opear){
                var index   = parseInt($scope.pageIndex);
                var total  = parseInt($scope.pageTotal);

                if(opear == "next"){
                    index++;
                    if(index >  total){
                        index = total;
                    }
                }
                else if( opear == "prev"){
                    index--;
                    if(index < 1){
                        index = 1;
                    }
                }
                $scope.pageIndex = index;
            },

            getSgObj: function (key) {
                var obj = $window.sessionStorage.getItem(key);
                return  JSON.parse(obj);
            },
            setSgObj: function (key, value) {
                return $window.sessionStorage.setItem(key, JSON.stringify(value));
            },

            getSg: function (key) {
               return  $window.sessionStorage.getItem(key);
            },

            setSg: function (key, value) {
                $window.sessionStorage.setItem(key, value);
            },
            remove : function(key){
                $window.sessionStorage.removeItem(key);
            },

            getLgObj: function (key) {

                var obj = $window.localStorage.getItem(key);
                if(obj){
                    return  JSON.parse(obj);
                }
                else{
                    return "";
                }
            },
            setLgObj: function (key, value) {
                return $window.localStorage.setItem(key, JSON.stringify(value));
            },
            getLg: function (key) {
                return $window.localStorage.getItem(key);
            },

            setLg: function (key, value) {
                $window.localStorage.setItem(key, value);
            },
            removeLg : function(key){
                $window.localStorage.removeItem(key);
            }
        };
        return Util;

    });