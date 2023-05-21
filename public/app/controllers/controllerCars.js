app.controller("controllerCar", function($scope, $firebaseArray) {
    const vehiculeRef = firebase.database().ref().child("Vehicules");

    let Vehicule = $firebaseArray(vehiculeRef);

    //  Setting the views
    $scope.showCarsReadView = false;
    $scope.showCarsCreateView = true;

    $scope.showCarsRead = function() {
        $scope.showCarsReadView = true;
        $scope.showCarsCreateView = false;
    }

    $scope.showCarsCreate = function() {
        $scope.showCarsReadView = false;
        $scope.showCarsCreateView = true;
    }

    /* Read */
    Vehicule.$ref().once('value', function(snap) {
        angular.forEach(snap.val(), function(index) {
            $scope.vehicules = index;
        });
    });

    /* Create */
    

});