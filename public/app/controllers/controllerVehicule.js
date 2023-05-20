app.controller("controllerVehicule", function($scope, $firebaseArray) {
    const vehiculeRef = firebase.database().ref().child("Vehicules");

    let Vehicule = $firebaseArray(vehiculeRef);

    $scope.showVehicules = function() {
        Vehicule.$ref().once('value', function(snap) {
            angular.forEach(snap.val(), function(index) {
                $scope.vehicules = index;
            })
        });
    }

});