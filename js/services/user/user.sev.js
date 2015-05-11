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
                client_id : "thinkjoy",
                client_secret : "thinkjoy",
                grant_type : "password",
                username : username,
                password  : password,
                app : account
            })
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