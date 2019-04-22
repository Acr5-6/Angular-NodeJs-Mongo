var TaskApp = angular.module('TodoApp', ['ngCookies']);

TaskApp.controller('MainController', function($scope, $http, $cookies) {

    console.log($cookies.username);

    if ($cookies.username == null) {
        window.location.assign('connexion.html');
    };

    $scope.logout = function() {
        delete $cookies['username'];
        document.location.href = 'connexion.html';
    };

    /********************* Task ************************/
    //Create Task
    $scope.createTodo = function() {
        var req = {
            name: $scope.taskname,
            listname: nameGroupList,
            username: $cookies.username
        };

        $scope.taskname = "";

        $http.post('/addTask', req)
            .success(function(data) {

                $http.post('/getTasks', req).then(function(resp) {
                    $scope.TaskList = resp.data;
                });
                $scope.req = {};
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });


    };

    //Delete Task
    $scope.deleteTodo = function(id) {
        var req = {
            identifiant: id,
            listname: nameGroupList,
            username: $cookies.username
        };
        $http.post('/deleteTask', req)
            .success(function(data) {
                $scope.TaskList = data;
                $http.post('/getTasks', req).then(function(resp) {
                    $scope.TaskList = resp.data;
                });
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    //Update Task
    $scope.updateData = {};
    $scope.updateToDo = function(id) {
        $scope.updateData.identifiant = id;
        $scope.updateData.listname = nameGroupList;
        $scope.updateData.username = $cookies.username;

        $http.post('/updateTask', $scope.updateData).success(function(data) {

                $scope.updateData = {};
                $scope.TaskList = data;
                //console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };


    /********************* GroupTask ************************/
    //Nom de la liste des tâches
    var nameGroupList;
    $scope.getListName = function(listname) {
        nameGroupList = listname;
    };

    //Get GroupTasks
    var userGroupTask = {
        username: $cookies.username
    };

    console.log(userGroupTask);
    $http.post('/getGroupTaskSet', userGroupTask).then(function(resp) {
        console.log(resp.data);
        $scope.GroupTaskList = resp.data;
    });


    //Get tasks in GroupTask
    $scope.getTasks = function(listname) {
        var req = {
            listname: listname,
            username: $cookies.username
        };

        $http.post('/getTasks', req).then(function(resp) {
            console.log(resp.data);
            $scope.TaskList = resp.data;
        });
    };

    //Create GroupTask
    $scope.createTodoGroup = function() {
        var req = {
            listname: $scope.listtaskname,
            username: $cookies.username
        };
        var user = {
            username: $cookies.username
        };

        $scope.listtaskname = "";

        $http.post('/addGroupTask', req)
            .success(function(data) {
                $http.post('/getGroupTaskSet', user).then(function(resp) {
                    $scope.GroupTaskList = resp.data;
                });
                $scope.req = {};
                $scope.user = {};
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    //Delete GroupTask
    $scope.deleteTodoGroup = function(id, listname) {
        var req = {
            identifiant: id
        };
        $http.post('/deleteGroupTask', req)
            .success(function(data) {
                $scope.GroupTaskList = data;
                $http.get('/getGroupTaskSet').then(function(resp) {
                    $scope.GroupTaskList = resp.data;
                });
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

        //Delete all Tasks binded to this GroupTask
        var req2 = {
            listname: listname
        };
        $http.post('/deleteTasks', req2)
            .success(function() {
                window.location.reload();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    //Update GroupTask
    $scope.updateGroupData = {};
    $scope.updateToDoGroup = function(id) {
        $scope.updateGroupData.identifiant = id;
        $scope.updateGroupData.username = $cookies.username;

        $http.post('/updateGroupTask', $scope.updateGroupData).success(function(data) {
                //$scope.updateGroupData = {};
                $scope.GroupTaskList = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    //Update TaskS binded with GroupTask
    $scope.updateTasks = function() {
        $scope.updateGroupData.username = $cookies.username;
        var exLname = {
            listname: nameGroupList,
        };
        console.log('ex listname : ' + exLname);
        $http.post('/updateTaskS', $scope.updateGroupData, exLname).success(function() {
                //$scope.updateGroupData = {};
                //$scope.TaskList = data;
                //console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

});


var ConnectionApp = angular.module('ConnectionApp', ['ngCookies']);

ConnectionApp.controller('ConnectionController', function($scope, $http, $cookies, $window) {

    $scope.SignUpUser = function() {
        if ($scope.username != null && $scope.password != null) {
            var req = {
                username: $scope.username,
                password: $scope.password
            }
            $http.post('/createUser', req).success(function(resp) {
                    console.log("resp.success:" + resp.success);
                    if (resp.success) {
                        $cookies.username = req.username;
                        $scope.signInUser()

                    } else {
                        $scope.username = null;
                        $scope.password = null;
                        $window.alert(resp.message);

                    }

                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        } else {
            $scope.username = null;
            $scope.password = null;
            $window.alert("un des champs est vide !");
        };
    };


    $scope.signInUser = function() {
        if ($scope.username != null && $scope.password != null) {
            var user = {
                username: $scope.username,
                password: $scope.password
            };

            $scope.username = null;
            $scope.password = null;

            console.log(user.username + " " + user.password);
            $http.post('/connection', user).success(function(resp) {
                    console.log("resp.success:" + resp.success);
                    if (resp.success) {
                        $cookies.username = user.username;
                        window.location.assign('index.html');
                    } else {
                        $window.alert(resp.message);
                    }
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        } else {
            $scope.username = null;
            $scope.password = null;
            $window.alert("un des champs est vide !");
        }
    };

});