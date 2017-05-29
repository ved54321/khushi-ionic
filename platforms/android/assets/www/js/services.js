angular.module('starter')

.service('AuthService', function($q, $http, $ionicLoading) {
        $http.defaults.headers.post["Content-Type"] = "application/json";
        var authToken;
        var LOCAL_TOKEN_KEY = 'yourTokenKey';
        var EMAIL_VALUE = 'email_value';
        var email_value = null;

        function set_email(email_id) {
            console.log("set email value" + email_id)
            window.localStorage.setItem(EMAIL_VALUE, email_id);
            email_value = email_id;
        }

        function set_token(token) {
            console.log("token" + token);
            storeUserCredentials(token);
            dynamic_token = token;
        }

        function get_token() {
            var dynamic_token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
            console.log("Token is returned", dynamic_token)
            return dynamic_token;
        }

        function get_email() {
            var email_value = window.localStorage.getItem(EMAIL_VALUE);
            console.log("Email id returned" + email_value)

            return email_value;
        }

        function loadUserCredentials() {
            var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
            if (token) {
                useCredentials(token);
            }
        }

        function storeUserCredentials(token) {
            window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
            useCredentials(token);
        }

        function useCredentials(token) {
            isAuthenticated = true;
            authToken = token;

            // Set the token as header for your requests!
            // $http.defaults.headers.common.auth_token = authToken;
        }

        function destroyUserCredentials() {
            set_email('');

            authToken = undefined;
            isAuthenticated = false;
            // $http.defaults.headers.common.Authorization = undefined;
            window.localStorage.removeItem(LOCAL_TOKEN_KEY);
            window.localStorage.removeItem(EMAIL_VALUE);
        }



        var login = function(user) {
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            $http.defaults.headers.common.static_token = "5b99f705b0486db23d82c5fa3779db8bcc9f9db93ee0a87f64698eb16c6c7e73";
            return $q(function(resolve, reject) {
                $http.post('http://localhost:9250/login', user).then(function(result) {

                    console.log("logsgsgsg")
                    console.log(result);

                    resolve(result.data.data);
                    // {"token":"835157f536ea7cb797c35341b7e76b42675f946a52948962e9737cc8ebac0a5d","data":"702"}

                    if (result.data.result = 'Success') {
                        if (result.data.data == '702') {
                            set_token(result.data.token);
                        }
                        console.log(result.data.data);
                        // storeUserCredentials(result.data.response.auth_token);
                        resolve(result.data.data);
                    } else {
                        reject(result.data);
                    }
                });
            });

        };

          var forgot = function(user) {
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            $http.defaults.headers.common.static_token = "5b99f705b0486db23d82c5fa3779db8bcc9f9db93ee0a87f64698eb16c6c7e73";
            return $q(function(resolve, reject) {
                $http.post('http://localhost:9250/forget_password', user).then(function(result) {

                    console.log("logsgsgsg")
                    console.log(result);

                    resolve(result.data.data);
                    // {"token":"835157f536ea7cb797c35341b7e76b42675f946a52948962e9737cc8ebac0a5d","data":"702"}

                    if (result.data.result = 'Success') {
                     if (result.data.data == '702') {
                            set_token(result.data.token);
                        }
                        // storeUserCredentials(result.data.response.auth_token);
                        resolve(result.data.data);
                    } else {
                        reject(result.data);
                    }
                });
            });

        };


         var confirm_password = function(user) {
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            $http.defaults.headers.common.static_token = "5b99f705b0486db23d82c5fa3779db8bcc9f9db93ee0a87f64698eb16c6c7e73";
            return $q(function(resolve, reject) {
                $http.post('http://localhost:9250/confirm_password', user).then(function(result) {

                    console.log("logsgsgsg")
                    console.log(result);

                    resolve(result.data.data);
                    // {"token":"835157f536ea7cb797c35341b7e76b42675f946a52948962e9737cc8ebac0a5d","data":"702"}

                    if (result.data.result = 'Success') {
                     if (result.data.data == '702') {
                            set_token(result.data.token);
                        }
                        // storeUserCredentials(result.data.response.auth_token);
                        resolve(result.data.data);
                    } else {
                        reject(result.data);
                    }
                });
            });

        };


        var sign_up = function(user, project) {
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            $http.defaults.headers.common.static_token = "5b99f705b0486db23d82c5fa3779db8bcc9f9db93ee0a87f64698eb16c6c7e73";
            return $q(function(resolve, reject) {
                $http.post('http://localhost:9250/addUsers', user).then(function(result) {
                    console.log(result);
                    if (result.data.result = 'Success') {
                        resolve(result.data);
                    } else {
                        reject(result.data);
                    }
                });
            });

        };

        var submit_project = function(user) {
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            $http.defaults.headers.common.static_token = "5b99f705b0486db23d82c5fa3779db8bcc9f9db93ee0a87f64698eb16c6c7e73";
            return $q(function(resolve, reject) {
                $http.post('http://localhost:9250/registeration_update_project', user).then(function(result) {
                    console.log(result);
                    if (result.data.result = 'Success') {

                        resolve(result.data);

                    } else {
                        reject(result.data);
                    }
                });
            });

        };

        var submit_user_answer = function(answer) {
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            alert(answer.ques_id)
            alert(answer.email)
            $http.defaults.headers.common.dynamic_token = get_token();
            return $q(function(resolve, reject) {
                $http.post('http://localhost:9250/ans?email='+ answer.email, answer).then(function(result) {
                    console.log(result);
                    if (result.data.result = 'Success') {
                        console.log(result.data)
                        resolve(result.data);
                    } else {
                        reject(result.data);
                    }
                });
            });

        };



        var send_otp = function(user) {
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            $http.defaults.headers.common.static_token = "5b99f705b0486db23d82c5fa3779db8bcc9f9db93ee0a87f64698eb16c6c7e73";
            return $q(function(resolve, reject) {
                $http.post('http://localhost:9250/otp', user).then(function(result) {
                    console.log(result);
                    if (result.data.result = 'Success') {
                        set_token(result.data.token);
                        resolve(result.data);
                    } else {
                        reject(result.data);
                    }
                });
            });

        };



        var logout = function() {
            destroyUserCredentials();
        };

        // loadUserCredentials();

        return {
            login: login,
            logout: logout,
            sign_up: sign_up,
            send_otp: send_otp,
            set_email: set_email,
            get_email: get_email,
            get_token: get_token,
            set_token: get_token,
            submit_project: submit_project,
            submit_user_answer: submit_user_answer,
            forgot: forgot,
            confirm_password: confirm_password,
            isAuthenticated: function() {
                return isAuthenticated;
            },
        };
    })
    .factory('EMAIL_PROVIDER', function($rootScope, $q, AUTH_EVENTS) {

    })
