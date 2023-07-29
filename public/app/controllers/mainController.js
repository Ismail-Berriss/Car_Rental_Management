app.controller("mainController", function ($scope) {
    // Setting the default
    $scope.showLocationView = true;
    $scope.showClientView = false;
    $scope.showCarView = false;
    $scope.showGarageView = false;
    $scope.active = 2;

    $scope.showLocation = function (n) {
        $scope.showLocationView = true;
        $scope.showClientView = false;
        $scope.showCarView = false;
        $scope.showGarageView = false;
        $scope.active = n;
    };

    $scope.showClient = function (n) {
        $scope.showLocationView = false;
        $scope.showClientView = true;
        $scope.showCarView = false;
        $scope.showGarageView = false;
        $scope.active = n;
    };

    $scope.showCar = function (n) {
        $scope.showLocationView = false;
        $scope.showClientView = false;
        $scope.showCarView = true;
        $scope.showGarageView = false;
        $scope.active = n;
    };

    $scope.showGarage = function (n) {
        $scope.showLocationView = false;
        $scope.showClientView = false;
        $scope.showCarView = false;
        $scope.showGarageView = true;
        $scope.active = n;
    };

    $scope.isActive = function (num) {
        return $scope.active === num;
    };
});
