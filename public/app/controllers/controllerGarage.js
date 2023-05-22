app.controller("controllerGarage", function($scope, $firebaseArray) {
    const garageRef = firebase.database().ref().child("Garage");

    let Garage = $firebaseArray(garageRef);

    //  Setting the views
    $scope.showGaragesReadView = true;
    $scope.showGaragesCreateView = false;
    $scope.showGaragesUpdateView = false;

    $scope.showGaragesRead = function() {
        $scope.showGaragesReadView = true;
        $scope.showGaragesCreateView = false;
        $scope.showGaragesUpdateView = false;
        $scope.garages = Garage;
    };

    $scope.showGaragesCreate = function() {
        $scope.showGaragesReadView = false;
        $scope.showGaragesCreateView = true;
        $scope.showGaragesUpdateView = false;
    };

    $scope.showGaragesUpdate = function(garage) {
        $scope.showGaragesReadView = false;
        $scope.showGaragesCreateView = false;
        $scope.showGaragesUpdateView = true;
        $scope.garage = garage;
    };

    /* Search */
    $scope.filterNom = function(garage) {
        if(!$scope.searchNom) {
            return true;
        }

        let searchNom = $scope.searchNom.toLowerCase();
        return garage.nom.toLowerCase().indexOf(searchNom) !== -1;
    };

    $scope.filterAdresse = function(garage) {
        if(!$scope.searchAdresse) {
            return true;
        }

        let searchAdresse = $scope.searchAdresse.toLowerCase();
        return garage.adresse.toLowerCase().indexOf(searchAdresse) !== -1;
    };

    /* Create */
    $scope.createGarage = function () {

        // Adding the new garage
        Garage.$add({
            nom: $scope.newGarage.nom,
            adresse: $scope.newGarage.adresse
        });
        
        $scope.success = true;

        // Clearing the input fields
        $scope.newGarage = {};
        
    };

    /* Read */
    $scope.garages = Garage;

    /* Update */
    $scope.updateGarage = function(garage) {
        Garage.$save(garage);
        $scope.showGaragesRead();
    };

    /* Delete */
    $scope.deleteGarage = function (garage) {
        Garage.$remove(garage);
    };

});