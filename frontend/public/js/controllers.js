var mp4Controllers = angular.module('mp4Controllers', []);
mp4Controllers.controller('homePageController', ['$scope','$http', function($scope, $http) {
	  $scope.curUser = null;
	  $scope.showLogout = function(){
        return ($scope.curUser==null) ? false: true;
    }
    $scope.$watch('curUser', function(){
        $scope.showLogout();
    })
    $scope.getCurUser = function(){
        $http({
            method: 'GET',
            url: '/user',
        }).success(function (data, status, headers, config) {
            $scope.curUser=data.data;
         }).error(function (data, status, headers, config) {
            console.log("get user error")
            console.log("data: "+data);
            console.log("status: "+status);
            console.log("headers: "+headers);
         });           
    }
    $scope.getCurUser();
}]);


mp4Controllers.controller('renderPageController', ['$scope','$http','$location', function($scope, $http,$location) {
	
		//for grid layout
    $scope.filesinfo = [];
    $scope.getFilesinfo = function(){
        $http({
            method: 'GET',
            url: '/filesinfo',
        }).success(function (data, status, headers, config) {
            $scope.filesinfo = data.data;
						data.data.forEach(function(file){
							$scope.showDel[file] = false;
						});
         }).error(function (data, status, headers, config) {
            console.log("get filesinfo error")
            console.log("data: "+data);
            console.log("status: "+status);
            console.log("headers: "+headers);
         });           
    };
    $scope.getFilesinfo();
	
		//for rendering
		$scope.audio = {};
		$scope.spinning = {};
		$scope.polyhedron = {};
		$scope.rendering = false;
	
		//render
		$scope.render = function(filename){
			$http({
				method: 'GET',
				url: '../js/script.js',
			}).success(function (data, status, headers, config) {
				$scope.rendering = true;	
				if($scope.polyhedron[filename] === true){
					data = data.replace(/\.\.\/vesta_files\/[a-z0-9]*/ig,'../vesta_files/'+filename);
				}
				else{
					data = data.replace(/\.\.\/vesta_files\/[a-z0-9]*/ig,'../vesta_files/'+filename);
					data = data.replace("createPolyhedron(max_dist,polyhedron,atom_a);",'');
				}
				
				if($scope.spinning[filename] === true){
					data = data.replace("setAutoControls();","setOrientationControl();");
					data = data.replace('camera.lookAt( scene.position );','');
					data = data.replace('camera.lookAt( scene.position );','');
					
					data = data.replace('camera.position.x = Math.floor(Math.cos( timer ) * 200 - 250);','');
					data = data.replace('camera.position.y = Math.floor(Math.cos( timer ) * 200 - 250);','');
					data = data.replace('camera.position.z = Math.floor(Math.sin( timer ) * 200 - 250);','');

				}
				if($scope.audio[filename] === true){
					var audiotag = angular.element(document.querySelector('#molecule_audio'));
					audiotag.attr('src','./audios/' + filename+ '.mp3');
					audiotag.load()
					audiotag.addEventListener("load", function() { 
						audiotag.play(); 
					}, true);
				}
				
				eval(data); 
				
			}).error(function (data, status, headers, config) {
				console.log("get filesinfo error")
				console.log("data: "+data);
				console.log("status: "+status);
				console.log("headers: "+headers);
			});
		};
	
		//when render, get rid of grid	  
		$scope.isRendering = function(){
        return $scope.rendering;
    }
    
    $scope.$watch('rendering', function(){
        $scope.isRendering();
    })
		
		$scope.reload = function(){
			location.reload();
		}
		
		$scope.deleteFiles = function(filename){
				$scope.showDel[filename] = !$scope.showDel[filename];
        $http({
            method: 'POST',
            url: '/delfiles',
						data:{"filename":filename}
        }).success(function (data, status, headers, config) {

						location.reload();
         }).error(function (data, status, headers, config) {
            console.log("get filesinfo error")
            console.log("data: "+data);
            console.log("status: "+status);
            console.log("headers: "+headers);
         });    			
			
			
		}
		
	  $scope.curUser = null;
	  $scope.showLogout = function(){
        return ($scope.curUser==null) ? false: true;
    }
    $scope.$watch('curUser', function(){
        $scope.showLogout();
    })
    $scope.getCurUser = function(){
        $http({
            method: 'GET',
            url: '/user',
        }).success(function (data, status, headers, config) {
            $scope.curUser=data.data;
         }).error(function (data, status, headers, config) {
            console.log("get user error")
            console.log("data: "+data);
            console.log("status: "+status);
            console.log("headers: "+headers);
         });           
    }
    $scope.getCurUser();		
		
		$scope.showDel = {};
		$scope.revertDel = function(file){
			$scope.showDel[file] = !$scope.showDel[file];
		}
		
    
}]);

