'use strict';


/**
 * 配置路由
 * @sherlock221b
 */
Baymax.config(
      function ($stateProvider,   $urlRouterProvider,VERSION) {

          $stateProvider
              .state('app', {
                  url: '/app',
                  abstract : true,
                  templateUrl: 'tpl/app.html?v='+VERSION.vs
              })


              .state('app.auth', {
                  url: '/auth',
                  abstract : true
               })

              //登录
              .state('app.auth.login', {
                  url: '/login',
                  views: {
                      "@app": {
                          templateUrl: 'tpl/auth/login.html?v='+VERSION.vs,
                          controller : "LoginCtrl"
                      }
                  }
              })

              //主界面
              .state("app.main",{
                  url: '/main',
                  templateUrl: 'tpl/common/main.html?v='+VERSION.vs
              })


              .state("app.main.tab",{
                  url: '/tab',
                  abstract : true
              })

               //我的好友
              .state("app.main.tab.friend",{
                  url: '/friend',
                      views: {
                          "@app.main": {
                              templateUrl: 'tpl/tab/friend.html?v='+VERSION.vs,
                              controller : "FriendCtrl"
                          }
                      }
              })

          //login
          $urlRouterProvider.otherwise('/app/auth/login');

      }
  );


