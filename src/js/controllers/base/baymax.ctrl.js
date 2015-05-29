

Baymax.controller('BaymaxCtrl', function($scope,$rootScope,$state,$mdToast,$mdDialog,$timeout,AudioNotify,Native,DB,Util,UserSev,SERVER) {
        //console.log("欢迎来到baymax");

         //测试url
        SERVER.url = SERVER.test;


    $rootScope.dialog = function(ev,title,content,btnText,callBack) {
        var btnText = btnText || "确定";
        var ev = ev || "";

        var at = $mdDialog.alert({
            title: content,
            content: content,
            ok: btnText
        });
        $mdDialog.show(at).finally(function() {
            at = undefined;
            callBack();
        });
    };

    //去state
    $rootScope.goState = function(name){
        if($rootScope.settingLayer){
            $rootScope.settingLayer = false;
        }
        $state.go(name);
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
            delay  = delay || 2000;
            $mdToast.show(
                $mdToast.simple()
                    .content(content)
                    .position(getToastPosition())
                    .hideDelay(delay)
            );
        };

    $rootScope.setUser = function(key,user){
        Util.setLgObj(key,user);
        $rootScope.user = user;
    }

    $rootScope.getUser = function(){
        return Util.getLgObj("user");
    }

    $rootScope.alertError = function(content,title){
        $rootScope.toast(content);
    }

    $rootScope.alertSuccess = function(content,title){
        $rootScope.toast(content);
    }

    $rootScope.alertInfo = function(content,title){
        $rootScope.toast(content);
    }

    //显示confirm
    $rootScope.confirm = function(ev,title,content,ok,cancel) {

        ok = ok || "确定";
        cancel = cancel || "取消";

        var confirm = $mdDialog.confirm()
            .title(title)
            .content(content)
            .ok(ok)
            .cancel(cancel)
            .targetEvent(ev);
        return $mdDialog.show(confirm);
    };


    //通知部分使用html5
    $rootScope.notify = function(title,body,icon){
        var notification = new AudioNotify(title,{
            body: body,
            icon: icon,
            soundFile : "audio/ditie.wav"
        });

        notification.onclick = function(event){
            console.log("click事件被触发:",event);
            //激活
            Native.myFocus();
            notification.close();
        };

        ////3秒关闭
        $timeout(function(){
            notification.close();
        },3000);
    }



    //初始化数据库





    //对Array进行扩展
    Array.prototype.removeObj=function(obj,key)
    {
        for(var i=0;i <this.length;i++){
            var a = this[i];
            if(a[key] == obj[key]){
                this.remove(i);
            }
        }
    }
    Array.prototype.remove=function(dx)
    {

        if(isNaN(dx)||dx>this.length){return false;}
        for(var i=0,n=0;i<this.length;i++)
        {
            if(this[i]!=this[dx])
            {
                this[n++]=this[i]
            }
        }
        this.length-=1
    }


    Array.prototype.unique = function (key) {
        var temp = new Array();
        this.sort();
        for(i = 0; i < this.length; i++) {
            var fb = this[i]
            var sb = this[i+1]

            if(this[i+1]){
                if( fb[key] == sb[key]) {
                    continue;
                }
            }
            //console.log("f",fb.id);
            //console.log("s",sb.id);
            temp[temp.length]=this[i];
        }
        return temp;
    }


    Array.prototype.unshiftArray = function (arrays) {
        for(var i =0; i <arrays.length; i++){
            var ab  = arrays[i];
            this.unshift(ab);
        }
    }




});
