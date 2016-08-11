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
    //for group selection 
    $scope.loopfiles = [];
    $scope.selected = {};
    
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
        $scope.rendering = true;
        polyFlag = $scope.polyhedron[filename] ? true : false ;
        autoFlag = $scope.spinning[filename] ? true : false;
        for (var key in $scope.selected){
	    $scope.loopfiles.push(key);
	}
	if($scope.loopfiles.length > 1){
            MRender.init(filename,autoFlag,polyFlag,$scope.loopfiles);    
        }else{
            MRender.init(filename,autoFlag,polyFlag,$scope.filesinfo);
        }
            
        //                          if($scope.audio[filename] === true){
        //                              var audiotag = angular.element(document.querySelector('#molecule_audio'));
        //                              audiotag.attr('src','./audios/' + filename+ '.mp3');
        //                              audiotag.load();
        //                              audiotag.addEventListener("load", function() { 
        //                                  audiotag.play(); 
        //                              }, true);
        //                          }
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

