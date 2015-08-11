'use strict';

/**
 * @ngdoc function
 * @name zequenzeApp.service:template
 * @description
 * # getTemplate
 * template's service of the zequenzeApp
 */
angular.module('zequenzeApp.service-templates',[])

    .service('template', function($q, $timeout, $http) {
        return {
            getTemplate: function() {
                var defer = $q.defer();
                defer.promise;
                $http.get('scripts/json/template.json').success(function(data) {
                    defer.resolve(data);
                }).error(function(){
                    defer.resolve();
                });
                return defer.promise;
            }

        }
    })

    .service('ip', function($q, $timeout, $http) {
        return {
            getIP: function() {
                var defer = $q.defer();
                defer.promise;
                $http.get('scripts/services/getip.php').success(function(data) {
                    defer.resolve(data);
                }).error(function(){
                    defer.resolve();
                });
                return defer.promise;
            }

        }
    })

    .service('mac', function($q, $timeout, $http) {
        return {
            getMAC: function() {
                var defer = $q.defer();
                defer.promise;
                $http.get('scripts/services/getmac.php').success(function(data) {
                    defer.resolve(data);
                }).error(function(){
                    defer.resolve();
                });
                return defer.promise;
            }

        }
    })

.service('login', function($q, $timeout, $http) {

    return {
        login: function(usr,pwd,ip,mac) {
            var defer = $q.defer();
            var req = {
                method: 'GET',
                url: 'scripts/services/authenticate.php?username='+usr+'&password='+pwd+'&ip='+ip+'&mac='+mac,
                headers: {
                    'Authorization': 'Basic YXBpdGVzdDpEYXM0d1NEOFRSS0pGUQ=='
                }
            }
            defer.promise;
            $http(req).success(function(data) {
                defer.resolve(data);
            }).error(function(){
                defer.resolve();
            });

            return defer.promise;
        }
    }
})

    .service('change_password', function($q, $timeout, $http) {

        return {
            change: function(usr,oldpwd,newpwd) {
                var defer = $q.defer();

                var req = {
                    method: 'GET',
                    url: 'scripts/services/change_password.php?username='+usr+'&oldpassword='+oldpwd+'&newpassword='+newpwd,
                    headers: {
                        'Authorization': 'Basic YXBpdGVzdDpEYXM0d1NEOFRSS0pGUQ=='
                    }
                }
                defer.promise;
                $http(req).success(function(data) {
                    defer.resolve(data);
                }).error(function(){
                    defer.resolve();
                });

                return defer.promise;
            }
        }
    })

    .service('token_get_info', function($q, $timeout, $http) {
        return {
            validate: function(usr) {
                var defer = $q.defer();
                var req = {
                    method: 'GET',
                    url: 'scripts/services/token_get_info.php?username='+usr
                }
                defer.promise;
                $http(req).success(function(data) {
                    defer.resolve(data);
                }).error(function(){
                    defer.resolve();
                });
                return defer.promise;
            }
        }
    })

.service('token_configure', function($q, $timeout, $http) {

    return {
        create: function(username,device,netaddress,password,name,email,phone,description,profile,disabled,expirationdate,
                         forcechange,newuser) {

            var defer = $q.defer();
            var req = {
                method: 'GET',
                url: 'scripts/services/token_configure_create.php?username='+username+'&password='+password+'&device='+device
                +'&netaddress='+netaddress+'&name='+name+'&email='+email+'&phone='+phone+'&description='+description
                +'&profile='+profile+'&disabled='+disabled+'&expirationdate='+expirationdate+'&forcechange='+forcechange
                +'&newuser='+newuser,
                headers: {
                    'Authorization': 'Basic YXBpdGVzdDpEYXM0d1NEOFRSS0pGUQ=='
                }
            }
            defer.promise;
            $http(req).success(function(data) {
                defer.resolve(data);
            }).error(function(){
                defer.resolve();
            });

            return defer.promise;
        }
    }
});
