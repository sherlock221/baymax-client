/**
 * angularJS http拦截器
 */

Baymax
    .factory("AjaxInterceptors",function(cfpLoadingBar,$q,$rootScope){
        return {
            //成功请求
            'request' : function(config ){
                cfpLoadingBar.start();
                if(config.method == "POST"){
                    if(config.headers['is-mutile-data']){
                        delete config.headers['is-mutile-data'];
                    }
                    else if(!config.headers['is-json-data'] ){
                        config.headers['Content-Type'] = "application/x-www-form-urlencoded;charset=utf-8";
                        config.transformRequest = function(obj) {
                            var str = [];
                            for(var p in obj)
                                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                            return str.join("&");
                        }
                    }
                    else {
                        delete config.headers['is-json-data'];
                        config.headers['Content-Type'] = "application/json; charset=utf-8";
                    }
                }

                //token代理
                //if ($window.sessionStorage.token) {
                //    if(config.method == "POST" ||  config.method == "PUT"){
                //        config.data.token = $window.sessionStorage.token;
                //    }
                //    else if(config.method = "GET"){
                //        if( config.headers['Content-Type'] == "application/json"){
                //            config.params =   config.params || {};
                //            config.params.token = $window.sessionStorage.token;
                //        }
                //    }
                //}


                return config ;
            },

            //成功返回
            response : function(response){
                cfpLoadingBar.complete()
                return response;
            },

            //捕获返回异常
            responseError : function(response){

                var temp = {};

                switch (response.status) {
                    case (500):
                        temp.content  = "服务器错误(500)";
                        break;
                    case (401):
                        temp.content  = "您未登录";
                        break;
                    case (403):
                        temp.content  = "您没有权限";
                        break;
                    case (400):
                        temp.content  = "参数有误";
                        break;
                    case (404):
                        temp.content  = "没找到该资源(404)";
                        break;
                    case (408):
                        temp.content  = "服务器超时";
                        break;
                    default:
                        temp.content  = "网络错误";
                }
                console.log("来自拦截器");
                $rootScope.alertError(temp.content);
                return $q.reject(response);
            }
        }

    });