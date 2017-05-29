/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout, AuthService, $state) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    if (navIcons.length > 0) {
        for (var i = 0; i < navIcons.length; i++) {
            navIcons.addEventListener('click', function() {
                this.classList.toggle('active');
            });
        }
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////app

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };

    $scope.email_id = AuthService.get_email();
    if ($scope.email_id !== null)

    {
        $scope.email = $scope.email_id.replace('@arrkgroup.com', '')
        var n = $scope.email.indexOf('.');
        $scope.email = $scope.email.substring(0, n != -1 ? n : $scope.email.length);
        $scope.email = $scope.email.toLowerCase();
        $scope.email = $scope.email.substring(0, 1).toUpperCase() + $scope.email.substring(1);
    }


    $scope.logout = function() {
        AuthService.logout();
        $state.go('login');
    };
})

.controller('LoginCtrl', function($scope, $timeout, ionicMaterialInk, $ionicPopup, AuthService, $state, $ionicLoading) {
    $scope.user = {
        email_id: '',
        password: ''
    };
    $scope.inputType = 'password';

    $scope.hideShowPassword = function() {
        if ($scope.inputType == 'password')
            $scope.inputType = 'text';
        else
            $scope.inputType = 'password';
    };
    $scope.login = function() {
        console.log($scope.user.email_id);
        console.log($scope.user.password != '')
        if ($scope.user.email_id != '' && $scope.user.email_id != undefined && $scope.user.password != '' && $scope.user.password != undefined) {
            AuthService.set_email($scope.user.email_id);
            AuthService.login($scope.user).then(function(msg) {
                if (msg == '701') {
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: 'User with email does not exist',
                        template: msg
                    });
                } else {
                    if (msg == '702') {
                        $ionicLoading.hide();
                        $state.go('app.feedback');
                    } else {
                        if (msg == '703') {
                            $ionicLoading.hide();
                            $state.go('otp');
                        } else
                        if (msg == '705') {
                            $ionicLoading.hide();
                            $state.go('project');
                        } else
                        if (msg == '717') {
                            $ionicLoading.hide();
                            $state.go('confirm');
                        } else {
                            $ionicLoading.hide();
                            var alertPopup = $ionicPopup.alert({
                                title: 'Error',
                                template: 'Something Wrong. Please contact admin'
                            });
                        }

                    }
                }

            }, function(errMsg) {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Login failed!',
                    template: errMsg
                });
            });
        } else {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
                title: 'Invalid',
                template: "Please enter mandatory details"
            });
        }
    };

})


.controller('OtpCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, $ionicPopup, AuthService, $state, $ionicLoading, $http) {
    // Set Motion

    // Set Ink
    $scope.user = {
        otp: ''
    };
    $http.defaults.headers.post['My-Header'] = 'value';
    $http.defaults.headers.post["Content-Type"] = "application/json";
    $http.defaults.headers.common.static_token = "5b99f705b0486db23d82c5fa3779db8bcc9f9db93ee0a87f64698eb16c6c7e73";

    console.log($scope.email_id)

    $scope.sendotp = function() {

        $scope.email_id = AuthService.get_email();
        console.log($scope.email_id);
        var data = {
            email_id: $scope.email_id,
            otp: $scope.user.otp
        }
        console.log("dataa" + data)
        AuthService.send_otp(data).then(function(msg) {
            console.log(msg);
            if (msg == '200') {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'User is not activated',
                    template: msg
                });
            } else {
                if (msg == '705') {
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: 'OTP invalid',
                        template: msg
                    });
                } else {
                    if (msg = '707') {
                        $ionicLoading.hide();
                        $state.go('project');
                    }
                }
            }

        }, function(errMsg) {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: errMsg
            });
        });
    };
})


.controller('ProjectCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, $ionicPopup, $state, ionicMaterialInk, $http, AuthService, $ionicLoading) {
    $http.defaults.headers.post['My-Header'] = 'value';
    $http.defaults.headers.post["Content-Type"] = "application/json";
    $http.defaults.headers.common.static_token = "5b99f705b0486db23d82c5fa3779db8bcc9f9db93ee0a87f64698eb16c6c7e73";
    $scope.selectedTestAccount = null;
    $scope.testAccounts = [];
    $scope.testRoles = [];


    $http({
        url: 'http://localhost:9250/project',
        method: 'GET'
    }).success(function(result) {
        $scope.testAccounts = result;
    }, function(error) {});



    $http({
        url: 'http://localhost:9250/registeration_role',
        method: 'GET'
    }).success(function(result) {
        $scope.testRoles = result;
    }, function(error) {});

    $scope.user = {
        project: '',
        role: ''
    };
    console.log("asdsada" + $scope.user.role.name);
    $scope.send_dashboard = function() {
        $scope.email_id = AuthService.get_email();
        var data = {
            project: $scope.user.project.project_name,
            role: $scope.user.role.name,
            email_id: $scope.email_id
        }
        console.log("dataa" + data)
        AuthService.submit_project(data).then(function(msg) {
            console.log(msg);
            if (msg == '703') {
                $ionicLoading.hide();
                $state.go('app.feedback');
            } else {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Something wrong',
                    template: msg
                });
            }

        }, function(errMsg) {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: errMsg
            });
        });
    };


})

.controller('signupCtrl', function($scope, $stateParams, $timeout, $state, ionicMaterialMotion, $ionicPopup, ionicMaterialInk, $http, AuthService, $ionicLoading) {
    $http.defaults.headers.post['My-Header'] = 'value';
    $http.defaults.headers.post["Content-Type"] = "application/json";
    $http.defaults.headers.common.static_token = "5b99f705b0486db23d82c5fa3779db8bcc9f9db93ee0a87f64698eb16c6c7e73";
    $scope.required = true;
    $scope.user = {
        email_id: '',
        password: ''
    };
    $scope.inputType = 'password';

    $scope.hideShowPassword = function() {
        if ($scope.inputType == 'password')
            $scope.inputType = 'text';
        else
            $scope.inputType = 'password';
    };
    $scope.sign_up = function() {
        console.log($scope.user);
        var data = {
            name: $scope.user.name,
            emailid: $scope.user.email_id,
            password: $scope.user.password

        }
        console.log("dataa" + data);
        console.log($scope.user.name);
        console.log($scope.user.name == undefined);
        if (($scope.user.name != '' && $scope.user.name != undefined) && ($scope.user.email_id != '' && $scope.user.email_id != undefined) && ($scope.user.password != '' && $scope.user.password != undefined)) {
            AuthService.sign_up(data).then(function(msg) {
                console.log(msg);
                if (msg == 'Invalid email pattern') {
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: 'Invalid',
                        template: 'Please enter mandatory details'
                    });
                } else {
                    if (msg == '701-Email already exist. Please contact your administrator') {
                        $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({
                            title: 'Invalid',
                            template: 'Email already exist'
                        });
                    } else {
                        if (msg = '703') {
                            $ionicLoading.hide();
                            $state.go('login');
                        }
                    }
                }

            }, function(errMsg) {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Login failed!',
                    template: errMsg
                });
            });
        } else {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
                title: 'Invalid',
                template: 'Please enter mandatory details'
            });
        }
    };


})

.controller('ConfirmCtrl', function($scope, $stateParams, $timeout, $state, ionicMaterialMotion, $ionicPopup, ionicMaterialInk, $http, AuthService, $ionicLoading) {
    $http.defaults.headers.post['My-Header'] = 'value';
    $http.defaults.headers.post["Content-Type"] = "application/json";
    $http.defaults.headers.common.static_token = "5b99f705b0486db23d82c5fa3779db8bcc9f9db93ee0a87f64698eb16c6c7e73";
    $scope.user = {
        password: '',
        confirm_password: ''
    };
    console.log($scope.email_id)

    $scope.confirm_password = function() {
        if ($scope.user.password == '' || $scope.user.password == undefined) {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
                template: "Please enter mandatory details"
            });
        } else if ($scope.user.password !== $scope.user.confirm_password) {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
                template: "Passwords do not match"
            });
        } else {
            $scope.email_id = AuthService.get_email();
            console.log($scope.email_id);
            console.log($scope.user.confirm_password);
            var data = {
                email_id: $scope.email_id,
                new_password: $scope.user.confirm_password
            }
            console.log("dataa" + data)
            AuthService.confirm_password(data).then(function(msg) {
                    console.log(msg);
                    if (msg.indexOf("An error has occurred") == 0) {
                        $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({
                            template: "Something went wrong. Please contact your administrator"
                        });
                    } else if (msg == '702') {
                        $ionicLoading.hide();
                        $state.go('app.feedback');
                    } else if (msg == '703') {
                        $ionicLoading.hide();
                        $state.go('otp');
                    } else if (msg == '705') {
                        $ionicLoading.hide();
                        $state.go('project');
                    } else if (msg == "900 Invalid token") {
                        $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({
                            template: "Invalid token."
                        });
                    } else {
                        $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({
                            title: 'Error',
                            template: "Something went wrong.Please contact your administrator."
                        });
                    }

                },
                function(errMsg) {
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: 'Login failed!',
                        template: errMsg
                    });
                });
        }
    };

})



.controller('DashboardCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {

        $scope.$parent.showHeader();
        $scope.isExpanded = true;
        $scope.$parent.setHeaderFab('right');

        // Activate ink for controller
    })
    .controller('FeedbackCompletedCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {

        $scope.$parent.showHeader();
        $scope.isExpanded = true;
        $scope.$parent.setHeaderFab('right');

        // Activate ink for controller
    })
    .controller('CompletedCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {

        $scope.$parent.showHeader();
        $scope.isExpanded = true;
        $scope.$parent.setHeaderFab('right');

        // Activate ink for controller
    })
    .controller('ForgotCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, $ionicPopup, ionicMaterialInk, $http, AuthService, $ionicLoading, $state) {
        $http.defaults.headers.post['My-Header'] = 'value';
        $http.defaults.headers.post["Content-Type"] = "application/json";
        $http.defaults.headers.common.static_token = "5b99f705b0486db23d82c5fa3779db8bcc9f9db93ee0a87f64698eb16c6c7e73";
        $scope.required = true;
        $scope.user = {
            email_id: ''
        };
        $scope.forgot = function() {
            console.log($scope.user);
            var data = {
                email_id: $scope.user.email_id
            }
            if ($scope.user.email_id == undefined || $scope.user.email_id == '') {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    template: 'Please enter mandatory details'
                });
            } else {
                AuthService.forgot(data).then(function(msg) {
                    console.log(msg);
                    if (msg == 'Invalid email pattern') {
                        $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({
                            title: 'Invalid',
                            template: 'Please enter mandatory details'
                        });
                    } else {
                        if (msg == '701') {
                            $ionicLoading.hide();
                            var alertPopup = $ionicPopup.alert({
                                title: 'Invalid',
                                template: 'Email does not exist'
                            });
                        } else {
                            if (msg = '712') {
                                $ionicLoading.hide();
                                $state.go('login');
                            }
                        }
                    }

                }, function(errMsg) {
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: 'Login failed!',
                        template: errMsg
                    });
                });
            }

        };


    })


.controller('FeedbackCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, $ionicPopup, ionicMaterialInk, $http, AuthService, $ionicLoading, $state) {

    $scope.$parent.showHeader();
    $scope.isExpanded = true;
    $http.defaults.headers.post["Content-Type"] = "application/json";
    $http.defaults.headers.common.dynamic_token = AuthService.get_token();
    $scope.selectedTestAccount = null;
    $scope.questions = [];
    $scope.email_id = AuthService.get_email();
    console.log("Email" + $scope.email_id)
    $scope.questionToShow = 0;
    $scope.showComment = 'blank';
    $scope.quotient_images = [{
        quotient: "happy",
        imageUrl: "./img/happy_inactive.png",
        active_image: "./img/happy_active.png",
        inactive_image: "./img/happy_inactive.png"
    }, {
        quotient: "blank",
        imageUrl: "./img/meh_inactive.png",
        active_image: "./img/meh_active.png",
        inactive_image: "./img/meh_inactive.png"
    }, {
        quotient: "sad",
        imageUrl: "./img/sad_inactive.png",
        active_image: "./img/sad_active.png",
        inactive_image: "./img/sad_inactive.png"
    }];

    $scope.show_text_div = false;
    $http({
        url: 'http://localhost:9250/questions?email=' + $scope.email_id,
        method: 'GET'
    }).success(function(result) {
        $scope.questions = result;

        if ($scope.questions.length == 0) {
            console.log("No questions Or All Question answered.")
            $state.go('app.completed')
        }
    }, function(error) {

    });

    $scope.answer = {
        quotient: '',
        comments: '',
        question_id: '',
        email_id: $scope.email_id
    };

    $scope.quotientClick = function(media) {
        $scope.show_text_div = true;
        $scope.quotient_images.forEach(function(data) {
            data.imageUrl = data.inactive_image;
        });

        if (media.imageUrl == media.inactive_image) {
            $scope.showComment = media.quotient;
            media.imageUrl = media.active_image;
        } else {
            media.imageUrl = media.inactive_image;
            $scope.showComment = $scope.showComment;
        }
        $scope.answer.quotient = media.quotient;
    };

    $scope.submit_user_answer = function() {

        var data = {
            ques_id: $scope.questions[$scope.questionToShow].id,
            email: $scope.email_id,
            quotient: $scope.answer.quotient,
            comments: $scope.answer.comments,
            cdate: new Date()
        };

       
      
            AuthService.submit_user_answer(data).then(function(msg) {
                console.log(msg)
                $ionicLoading.hide();
                if (msg == '703') {
                    $ionicLoading.hide();
                } else {
                    if (msg == "Please enter mandatory details") {
                        $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({
                            template: msg
                        });

                    } else if (msg.indexOf("Quesion not exist") == 0) {
                        $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({
                            template: msg
                        });

                    } else if (msg.indexOf("An error has occurred") == 0)

                    {
                        $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({
                            template: msg
                        });
                    } else if (msg == '500 ERROR') {
                        $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({
                            template: "Something went wrong. Please contact administrator."
                        });
                    } else {
                        //If success
                        $scope.questionToShow = ($scope.questionToShow + 1) % $scope.questions.length;
                        $ionicLoading.hide();
                        $scope.quotient_images = [{
                            quotient: "happy",
                            imageUrl: "./img/happy_inactive.png",
                            active_image: "./img/happy_active.png",
                            inactive_image: "./img/happy_inactive.png"
                        }, {
                            quotient: "blank",
                            imageUrl: "./img/meh_inactive.png",
                            active_image: "./img/meh_active.png",
                            inactive_image: "./img/meh_inactive.png"
                        }, {
                            quotient: "sad",
                            imageUrl: "./img/sad_inactive.png",
                            active_image: "./img/sad_active.png",
                            inactive_image: "./img/sad_inactive.png"
                        }];
                        $scope.answer = {
                            quotient: '',
                            comments: '',
                            question_id: '',
                            email_id: $scope.email_id
                        };

                        if ($scope.questionToShow == 0) {
                            $state.go('app.feedback_completed');
                        }
                    }
                }

            }, function(errMsg) {
                $ionicLoading.hide();
            });
    

    }

});
