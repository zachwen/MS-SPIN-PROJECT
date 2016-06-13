var mp4Services = angular.module('mp4Services', []);

mp4Services.factory('CommonData', function($http, $window){
    //shared data among controllers

    var baseUrl = $window.sessionStorage.baseurl;
    return{
        get_users: function(){
            return $http.get(baseUrl+'/api/users');
        },
        get_tasks: function(tid){
            return $http.get(baseUrl+'/api/tasks'+tid);    
        }
    };
    
});

mp4Services.factory('Users', function($http, $window) {
    
    var baseUrl = $window.sessionStorage.baseurl;
    return {
        post_user : function(user_data){
            return $http.post(baseUrl+'/api/users',user_data);
        },
        post_task: function(task_data){
            return $http.post(baseUrl+'/api/tasks/',task_data);
        },
        get_user : function(uid) {
            return $http.get(baseUrl+'/api/users/'+uid);
        },
        get_task: function(tid){
            return $http.get(baseUrl+'/api/tasks/'+tid);
        },
        update_task: function(tid, data){
            return $http.put(baseUrl+'/api/tasks/'+tid,data);
        },
        delete_user: function(uid){
            return $http.delete(baseUrl+'/api/users/'+uid);  
        },
        delete_task: function(tid){
            return $http.delete(baseUrl+'/api/tasks/'+tid);
        },
        update_user: function(uid, data){
            return $http.put(baseUrl+'/api/users/'+uid,data);
        }
        
    }
});
