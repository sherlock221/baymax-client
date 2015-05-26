'use strict';


/**
 * 配置路由
 * @sherlock221b
 */
Baymax.config(
      function ($stateProvider,   $urlRouterProvider,VERSION) {


          //
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
                  templateUrl: 'tpl/common/main.html?v='+VERSION.vs,
                  controller : "MainCtrl"
              })

              .state("app.main.tab",{
                  url: '/tab',
                  abstract : true
              })

               //chat
              .state("app.main.tab.chat",{
                  url: '/chat',
                      views: {
                          "@app.main": {
                              templateUrl: 'tpl/tab/chat.html?v='+VERSION.vs,
                              controller : "ChatCtrl"
                          }
                      }
              })

              //contact
              .state("app.main.tab.contact",{
                  url: '/contact',
                  views: {
                      "@app.main": {
                          templateUrl: 'tpl/tab/contact.html?v='+VERSION.vs,
                          controller: "ContactCtrl"
                      }
                  }
              })



          //登录
          $urlRouterProvider.otherwise('/app/auth/login');

      }
  );


