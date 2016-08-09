angular.module('throwcast.auth', [])

.factory('authInterceptor', function ($q, $window, $location) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    response: function (rejection) {
      if (response.status === 401) {
        $location.path('/signin');
      }
      return $q.when(rejection);
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
