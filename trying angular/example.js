angular.module('plunker', ['ui.bootstrap']);

 var i=100;

var ProgressDemoCtrl = function ($scope) 
{

  $scope.max = 200;

  $scope.random = function() 
  {
   
    var value = Math.floor((Math.random() * 100) + 1);
    var type;

    if (value < 25) {
      type = 'success';
    } else if (value < 50) {
      type = 'info';
    } else if (value < 75) {
      type = 'warning';
    } else {
      type = 'danger';
    }

    $scope.showWarning = (type === 'danger' || type === 'warning');

    $scope.dynamic = value;
    $scope.type = type;
    
  
  };
  $scope.random();
  setTimeout(function(){$scope.random();},1000);

  


 
};