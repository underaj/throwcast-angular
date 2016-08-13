angular.module('throwcast.popular')

.controller('PopularController', function ($scope, $http) {
  $scope.h1 = 'Top Podcast';
  $scope.podcasts;
  $scope.message;
  $scope.podcastLink;
  $scope.stationLink;
  //TODO: delete all reference to stations after mvp
  $scope.stations;

  $scope.getPodcast = function () {
    $http.get('http://localhost:8888/api/podcasts/').then( function (res) {
      $scope.podcasts = res.data;
    });
  };
  $scope.getPodcast();

  $scope.getStations = function () {
    $http.get('http://localhost:8888/api/stations/').then(function (stations) {
      return stations.data;
    }).then(function (stations) {
      $scope.stations = stations;
      console.log('stations: ', $scope.stations[0]);
    });
  };
  $scope.getStations();

  $scope.playPodcast = function (index) {
    $scope.podcastLink = $scope.podcasts[index].link;
  };

  $scope.getPopularPodcast = function () {
    $http.get('http://localhost:8888/api/podcasts/popular').then( function (res) {
      $scope.popularPodcasts = res.data;
    });
  };

  $scope.getPopularStations = function () {
    $http.get('http://localhost:8888/api/stations/popular').then( function (res) {
      $scope.popularStations = res.data;
    });
  };

  $scope.addToQueue = function (userId, podcastId) {
    $http.post('http://localhost:8888/api/user/' + userId + '/queue/', {podcastId: podcastId}).then(function (res) {
      $scope.message = $scope.podcasts.name + ' has been added to your queue.';
      $scope.getPodcast();
    });
  };

  $scope.addPodToPlaylist = function (playlistId, podcastId) {
    $http.post('http://localhost:8888/api/playlist/' + playlistId + '/podcast/', {podcastId: podcastId}).then(function (res) {
      $scope.message = $scope.podcasts.name + ' has been added to ' + res.data.name + '.';
      $scope.getPodcast();
    });
  };

});
