var musicApp = angular.module('musicApp', ["ngRoute"]);

musicApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/Items', {
			 templateUrl: 'templates/viewList.html',
			 controller: 'listController'
			}).
			when('/Items/add', {
				templateUrl: 'templates/viewDetail.html',
				controller: 'addController'
			}).
			when('/Items/:index', {
				templateUrl: 'templates/viewDetail.html',
				controller: 'editController'
			}).
			otherwise({
			  redirectTo: '/Items'
			});
}]); 

musicApp.factory("musicService",["$rootScope", function($rootScope) {
	var svc= {};
	
	var data = [{
		name: "GroupLove",
		genre: "Alternative",
		rating: "4"
	}, {
		name: "The Beatles",
		genre: "Rock",
		rating: "5"
	}, {
		name: "The Cure",
		genre: "Rock",
		rating: "4"
	}];
	
	svc.getArtists = function(){
		return data;
	};
	svc.addArtist = function(artist){
		data.push(artist);
	};
	svc.editArtist = function(index, artist){
		data[index]=artist;
	};
	return svc;
}]);

musicApp.controller('listController',["$scope","$location","$routeParams", "musicService", function($scope, $location, $routeParams, musicService){
		console.log("I am in the list controller.");
		$scope.data = musicService.getArtists();
		
		$scope.addArtist = function(){
			$location.path("/Items/add");
		};
		
		$scope.editItem = function(index){
			$location.path("/Items/" + index);
		};
		
}]);

musicApp.controller('addController',["$scope","$location","$routeParams", "musicService", function($scope, $location, $routeParams, musicService){
	console.log("I am in the add controller.");
	//Save new item
	$scope.save = function(){
		musicService.addArtist({name:$scope.Item.name, genre:$scope.Item.genre, rating:$scope.Item.rating});
		$location.path("/Items");
	};
	$scope.cancel=function(){
		$location.path("/Items");
		
	};
	
}]);

musicApp.controller('editController',["$scope","$location","$routeParams", "musicService",function($scope, $location, $routeParams, musicService){
	console.log("I am in the edit controller.");
	$scope.Item = musicService.getArtists()[parseInt($routeParams.index)];
	
	//Save existing item
	$scope.save = function(){
		musicService.editArtist(parseInt($routeParams.index), {name:$scope.Item.name, genre:$scope.Item.genre, rating:$scope.Item.rating});
		$location.path("/Items");
	};
	$scope.cancel=function(){
		$location.path("/Items");
		
	};
}]);
	
