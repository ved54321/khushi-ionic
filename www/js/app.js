// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        if (window.cordova && window.cordova.plugins.Keyboard) {
            window.cordova.plugins.Keyboard.disableScroll(true);
            window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('project', {
            url: '/project',
            templateUrl: 'templates/project.html',
            controller: 'ProjectCtrl'
        })
        .state('forgot', {
            url: '/forgot',
            templateUrl: 'templates/forgot.html',
            controller: 'ForgotCtrl'
        })
        .state('confirm', {
            url: '/confirm',
            templateUrl: 'templates/confirm.html',
            controller: 'ConfirmCtrl'
        })


    .state('app.dashboard', {
        url: '/dashboard',
        views: {
            'menuContent': {
                templateUrl: 'templates/dashboard.html',
                controller: 'DashboardCtrl'
            },
            'fabContent': {

            }
        }
    })

    .state('app.feedback', {
        url: '/feedback',
        views: {
            'menuContent': {
                templateUrl: 'templates/feedback.html',
                controller: 'FeedbackCtrl'
            },
            'fabContent': {

            }
        }
    })

    .state('app.completed', {
            url: '/completed',
            views: {
                'menuContent': {
                    templateUrl: 'templates/completed.html',
                    controller: 'FeedbackCompletedCtrl'
                }
            }
        })
        .state('app.feedback_completed', {
            url: '/feedback_completed',
            views: {
                'menuContent': {
                    templateUrl: 'templates/feedback_completed.html',
                    controller: 'CompletedCtrl'
                }
            }
        })



    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'

    })

    .state('otp', {
            url: '/otp',
            templateUrl: 'templates/otp.html',
            controller: 'OtpCtrl'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'templates/signup.html',
            controller: 'signupCtrl'
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
});
