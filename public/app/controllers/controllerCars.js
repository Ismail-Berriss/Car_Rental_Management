app.controller("controllerCar", function($scope, $firebaseArray) {
    const carRef = firebase.database().ref().child("Vehicules");
    const garageRef = firebase.database().ref().child("Garage");
    
    let Car = $firebaseArray(carRef);
    let Garage = $firebaseArray(garageRef);
    
    //  Setting the views
    $scope.showCarsReadView = true;
    $scope.showCarsCreateView = false;
    $scope.showCarsUpdateView = false;
    
    $scope.showCarsRead = function() {
        $scope.showCarsReadView = true;
        $scope.showCarsCreateView = false;
        $scope.showCarsUpdateView = false;
        $scope.cars = Car;
        $scope.garages = Garage;
    };
    
    $scope.showCarsCreate = function() {
        $scope.showCarsReadView = false;
        $scope.showCarsCreateView = true;
        $scope.showCarsUpdateView = false;
        $scope.garages = Garage;
    };

    $scope.showCarsUpdate = function(car) {
        $scope.showCarsReadView = false;
        $scope.showCarsCreateView = false;
        $scope.showCarsUpdateView = true;
        $scope.car = car;
        $scope.garages = Garage;
    };

    /* Search */
    $scope.filterMarque = function(car) {
        if(!$scope.searchMarque) {
            return true;
        }

        let searchMarque = $scope.searchMarque.toLowerCase();
        return car.marque.toLowerCase().indexOf(searchMarque) !== -1;
    };

    $scope.filterModele = function(car) {
        if(!$scope.searchModele) {
            return true;
        }

        let searchModele = $scope.searchModele.toLowerCase();
        return car.modele.toLowerCase().indexOf(searchModele) !== -1;
    };

    $scope.filterPrix = function(car) {
        if(!$scope.searchPrix) {
            return true;
        }

        let searchPrix = $scope.searchPrix.toLowerCase();
        return car.prix.toLowerCase().indexOf(searchPrix) !== -1;
    };

    $scope.filterGarage = function(car) {
        if(!$scope.searchGarage) {
            return true;
        }

        let searchGarage = $scope.searchGarage.toLowerCase();
        return car.garage.toLowerCase().indexOf(searchGarage) !== -1;
    };

    /* Create */
    $scope.createCar = function () {

        $scope.newCar.id = 1;

        // Car ID, lastest car's ID + 1
        Car.$ref().once('value', function(snap) {
            angular.forEach(snap.val(), function(index) {
                $scope.cars = index;
                $scope.newCar.id = index.id + 1;
            });
        });

        // Adding the new car
        Car.$add({
            id: $scope.newCar.id,
            type: $scope.newCar.type,
            marque: $scope.newCar.marque,
            modele: $scope.newCar.modele,
            puissance: $scope.newCar.puissance,
            prix: $scope.newCar.prix,
            garage: $scope.newCar.garage
        });
        
        $scope.success = true;

        // Clearing the input fields
        $scope.newCar = {};
        
    };

    /* Read */
    $scope.cars = Car;
    /* Car.$ref().once('value', function(snap) {
        angular.forEach(snap.val(), function(index) {
            console.log(index.$key);
        });
    }); */

    /* Update */
    $scope.updateCar = function(car) {
        Car.$save(car);
        $scope.showCarsRead();
    };

    /* Delete */
    $scope.deleteCar = function (car) {
        Car.$remove(car);
    };

    /* Clear */
    $scope.clearCar = function() {
        $scope.newCar = {};
        $scope.car = {};
    };

});