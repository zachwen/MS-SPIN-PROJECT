var mp4Controllers = angular.module('mp4Controllers', []);

mp4Controllers.controller('UserListController', ['$scope','CommonData','Users', function($scope, CommonData,Users) {

    $scope.users = {};
    CommonData.get_users().success(function(data){
        $scope.users = data.data;
    });
    $scope.delete_user = function(index){ 

        //get the tasks
        var tasks_id =  $scope.users[index].pendingTasks;
        for(var i = 0; i < tasks_id.length;i++){
            Users.get_task(tasks_id[i]).success(function(data){
                //update related tasks
                data.data.assignedUser = "";
                data.data.assignedUserName =  "unassigned";
                Users.update_task(data.data._id,data.data).error(function(err){
                    if(err)
                        console.log("fail to update user's tasks"+ err);
                })

            }).error(function(err){
                if(err)
                    console.log("fail to get user's tasks" + err);
            }); 
        }            
                   
        Users.delete_user($scope.users[index]._id).success(function(){
            //take out the user we just deleted
            $scope.users.splice(index,1);
        }); 
        

    }
    
}]);

mp4Controllers.controller('TaskListController', ['$scope', 'CommonData' ,'Users', function($scope, CommonData, Users) {
    $scope.tasks = {};
    $scope.showOp = "where={'completed':false}";
    $scope.AorD = "1";
    $scope.sortBy = "deadline";
    
    CommonData.get_tasks("?sort={" + $scope.sortBy + ":" + $scope.AorD + "}" + "&" + $scope.showOp +"&skip=" +$scope.skip+"&limit=10").success(function(data){
        $scope.tasks = data.data;
    });  

    $scope.delete_task = function(index){
        if($scope.tasks[index].assignedUser){
             Users.get_user($scope.tasks[index].assignedUser).success(function(data){
                var a_user = data.data;
                for(var i = 0; i < a_user.pendingTasks.length;i++){
                    if($scope.tasks[index]._id === a_user.pendingTasks[i] )
                        a_user.pendingTasks.splice(i,1);
                }
                Users.update_user(a_user._id, a_user).error(function(err){
                    if(err)
                        console.log("fail to update corresponding user");
                });
             
             }).error(function(err){
                 if(err)
                     console.log("fail to get corresponding user " + err);
             });
        }
        Users.delete_task($scope.tasks[index]._id).success(function(){
            //take out
            $scope.tasks.splice(index,1);
        });
    };
    //pagination
    $scope.skip = 0;
    $scope.prev = function(){
        $scope.skip -=10;
        if($scope.skip < 0)
            $scope.skip = 0;
    };
    $scope.next = function(){
        if($scope.tasks.length == 10)
            $scope.skip +=10;
        
    };
    
  $scope.$watchGroup(['sortBy','showOp','AorD','skip'], function (newVal, oldVal) { 
      
          var tid = "?sort={" + $scope.sortBy + ":" + $scope.AorD + "}" + "&" + $scope.showOp +"&skip=" +$scope.skip+"&limit=10";
            CommonData.get_tasks(tid).success(function(data){
                $scope.tasks = data.data;
            });       
      console.log(tid);
 
  }, true);    
    
}]);

mp4Controllers.controller('UserDetailController', ['$scope','$routeParams','Users', function($scope, $routeParams, Users) {
    $scope.a_user = {};
    $scope.user_tasks_p = [];//pending
    $scope.user_tasks_c = [];//completed
    $scope.get_complete = true;
    //get specific user and its related tasks
    Users.get_user($routeParams.id).success(function(data){
        $scope.a_user = data.data;
        
        var tasks_id =  $scope.a_user.pendingTasks;
        for(var i = 0; i < tasks_id.length;i++){
            Users.get_task(tasks_id[i]).success(function(data){
                if(data.data.completed)
                    $scope.user_tasks_c.push(data.data);
                else
                    $scope.user_tasks_p.push(data.data);
            }); 
        }     
       
    });
    $scope.mark_complete = function(index){
        $scope.user_tasks_p[index].completed = true;
        Users.update_task( $scope.user_tasks_p[index]._id,$scope.user_tasks_p[index]).success(function(data){
            console.log("sucess update");
            //take out
            $scope.user_tasks_p.splice(index,1);
            //and add
            $scope.user_tasks_c.push(data.data);
        });
    };
    $scope.getCompleted = function(){
        $scope.get_complete = !$scope.get_complete;
    }

}]);


mp4Controllers.controller('TaskDetailController', ['$scope', '$routeParams' ,'Users', function($scope, $routeParams, Users) {
    $scope.a_task = {};
    
    Users.get_task($routeParams.tid).success(function(data){
        $scope.a_task = data.data;
        
    }).error(function(err){
        if(err)
            console.log(err);
    });
    
}]);

mp4Controllers.controller('AddUserController', ['$scope',"Users", function($scope,Users) {
    $scope.data = {};

    $scope.AddUser = function(){
        $scope.data.dateCreated = new Date().getTime();
        $scope.data.pendingTasks = [];

        Users.post_user($scope.data).success(function(data){
            $scope.data = {};
        }).error(function(err){
            if(err)
                console.log(err);
        });
    };

}]);

mp4Controllers.controller('AddTaskController', ['$scope', 'Users' ,'CommonData', function($scope, Users,CommonData) {
    
    $scope.data = {};
    $scope.assignedUser = "";
    $scope.users = {};
    CommonData.get_users().success(function(data){
        $scope.users = data.data;
    });
    
    $scope.addTask = function(){        
        $scope.data.deadline = Date.parse($scope.data.deadline);
        $scope.data.assignedUser = $scope.users[$scope.assignedUser]._id;
        $scope.data.assignedUserName = $scope.users[$scope.assignedUser].name;
        
        Users.post_task($scope.data).success(function(data){
            $scope.data = {};  
            $scope.users[$scope.assignedUser].pendingTasks.push(data.data._id);

            Users.update_user($scope.users[$scope.assignedUser]._id,$scope.users[$scope.assignedUser])
                .success(function(data){
                    console.log("task added sucesssfully");
                }).error(function(err){
                if(err)
                    console.log("fail to update user " + err);
            });
                                          
        }).error(function(err){
            console.log("fail to add task"+err);
        });
    };
    
}]);


mp4Controllers.controller('EditTaskController', ['$scope', '$routeParams' ,'Users', function($scope, $routeParams, Users) {
    $scope.a_task = {};
    
    Users.get_task($routeParams.tid).success(function(data){
        $scope.a_task = data.data;    
    }).error(function(err){
        if(err)
            console.log(err);
    });
    
    $scope.updateTask = function(){
        console.log($scope.a_task.completed);
        Users.update_task($routeParams.tid, $scope.a_task).success(function(data){
            console.log("success");
            console.log(data);
        }).error(function(err){
            if(err)
                console.log(err);
        });
    };
    
}]);

mp4Controllers.controller('SettingsController', ['$scope' , '$window' , function($scope, $window) {

    $scope.url = $window.sessionStorage.baseurl;

    $scope.setUrl = function(){
        $window.sessionStorage.baseurl = $scope.url;
        $scope.displayText = "URL set";
    };

}]);
