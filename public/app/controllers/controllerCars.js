app.controller("controllerCar", function($scope, $firebaseArray) {
    const carRef = firebase.database().ref().child("Vehicules");

    let Car = $firebaseArray(carRef);

    //  Setting the views
    $scope.showCarsReadView = true;
    $scope.showCarsCreateView = false;
    // $scope.success = false;

    $scope.showCarsRead = function() {
        $scope.showCarsReadView = true;
        $scope.showCarsCreateView = false;
        $scope.cars = Car;
    }

    $scope.showCarsCreate = function() {
        $scope.showCarsReadView = false;
        $scope.showCarsCreateView = true;
    }

    /* Read */
    $scope.cars = Car;
    /* Car.$ref().once('value', function(snap) {
        angular.forEach(snap.val(), function(index) {
            console.log(index.$key);
        });
    }); */
    
    


    /* Create */
    $scope.createCar = function () {

        $scope.newCar.numero = 1;

        // Car ID, lastest car's ID + 1
        Car.$ref().once('value', function(snap) {
            angular.forEach(snap.val(), function(index) {
                $scope.cars = index;
                $scope.newCar.numero = index.numero + 1;
            });
        });

        // Adding the new car
        Car.$add({
            numero: $scope.newCar.numero,
            type: $scope.newCar.type,
            marque: $scope.newCar.marque,
            modele: $scope.newCar.modele,
            puissance: $scope.newCar.puissance
        });
        
        $scope.success = true;

        // Clearing the input fields
        $scope.newCar = {};
        
    };

    /* Delete */
    $scope.deleteCar = function (car) {
        Car.$remove(car);
    };

});