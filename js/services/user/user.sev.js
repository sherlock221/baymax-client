/**
 * Baymax User
 * sherlock221b
 */

Baymax.service('UserSev', function($http,$q,SERVER) {

    return {

        /**
         * 获取未受理客户列表信息
         * @return
         */
        accpetUser : function(){
            var defer =  $q.defer();
            $http.get(SERVER.url.notify+"/notaccpet",{
            })
                .success(function(result){
                    defer.resolve(result);
                })
                .error(function(err){

                    defer.reject(err);
                });
            return  defer.promise;
        },

        /**
         * 和用户建立连接
         * @return
         */
         connectionUser : function(userObj){
            var defer =  $q.defer();
            $http.post(SERVER.url.notify+"/accpet/user",userObj,{headers:{"is-json-data":1}}
            )
                .success(function(result){
                    defer.resolve(result);
                })
                .error(function(err){

                    defer.reject(err);
                });
            return  defer.promise;
        }



    }

});