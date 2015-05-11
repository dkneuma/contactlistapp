/**
 * Created by daniel.neumann on 4/27/15.
 */
var myApp = angular.module('myApp', []);

myApp.filter('offset', function() {
    return function(input, start) {
        start = parseInt(start, 10);
        return input.slice(start);
    };
});

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");
$scope.listLength = 0;
var refresh = function () {
        $http.get('/contactlist').success(function (response) {
            console.log("I got the data I requested");
            $scope.contactlist = response;
            $scope.listLength = $scope.contactlist.length;
            $scope.contact="";
        });
    };
refresh();
$scope.deselect = function() {
  $scope.contact = "";
};
$scope.addContact = function() {
    console.log($scope.contact);
    $http.post('/contactlist', $scope.contact).success(function (response) {
        console.log(response);
        refresh();
    });
};

$scope.remove = function(id) {
    console.log(id);
    $http.delete('/contactlist/' + id).success(function(response) {
        refresh();
    });
};

$scope.edit = function(id) {
    console.log(id);
    $http.get('/contactlist/' + id).success(function(response) {
       $scope.contact = response;
    });
};

$scope.update = function() {
    console.log('Update function: ' + $scope.contact._id);
    $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
       refresh();
    });

};

$scope.itemsPerPage = 5;
$scope.currentPage = 0;

$scope.range = function() {
    var rangeSize = 5;
    var ret = [];
    var start;

    start = $scope.currentPage;
    if ( start > $scope.pageCount()-rangeSize ) {
        start = $scope.pageCount()-rangeSize+1;
    }

    for (var i=start; i<start+rangeSize; i++) {
        ret.push(i);
    }
    return ret;
};

$scope.prevPage = function() {
    if ($scope.currentPage > 0) {
        $scope.currentPage--;
    }
};

$scope.prevPageDisabled = function() {
    return $scope.currentPage === 0 ? "disabled" : "";
};

$scope.pageCount = function() {
   // console.log("Called pageCount with length of: " + $scope.contactlist.length);
    var retVal =  Math.ceil($scope.listLength/$scope.itemsPerPage)-1;
   // console.log("Return value = " + retVal);
    return retVal;
};

$scope.nextPage = function() {
    if ($scope.currentPage < $scope.pageCount()) {
        $scope.currentPage++;
    }
};

$scope.nextPageDisabled = function() {
    return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
};



}]);