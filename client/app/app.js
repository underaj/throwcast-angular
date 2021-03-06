'use strict';

angular.module('throwcast', [
  'throwcast.playlist',
  'throwcast.stations',
  'throwcast.popular',
  'throwcast.auth',
  'throwcast.queue',
  'ngRoute'
])

.config(function ($routeProvider) {
  $routeProvider
  .otherwise({
    redirectTo: '/signin'
  });
})

.run(function ($rootScope, $location, authService) {
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !authService.isAuth()) {
      evt.preventDefault();
      $location.path('/signin');
    }
  });
});
