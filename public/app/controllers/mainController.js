app.controller("mainController", function ($scope) {
    // Setting the default
    $scope.showDashboardView = false;
    $scope.showLocationView = true;
    $scope.showClientView = false;
    $scope.showCarView = false;
    $scope.showGarageView = false;
    $scope.active = 2;

    $scope.showDashboard = function (n) {
        $scope.showDashboardView = true;
        $scope.showLocationView = false;
        $scope.showClientView = false;
        $scope.showCarView = false;
        $scope.showGarageView = false;
        $scope.active = n;
    };

    $scope.showLocation = function (n) {
        $scope.showDashboardView = false;
        $scope.showLocationView = true;
        $scope.showClientView = false;
        $scope.showCarView = false;
        $scope.showGarageView = false;
        $scope.active = n;
    };

    $scope.showClient = function (n) {
        $scope.showDashboardView = false;
        $scope.showLocationView = false;
        $scope.showClientView = true;
        $scope.showCarView = false;
        $scope.showGarageView = false;
        $scope.active = n;
    };

    $scope.showCar = function (n) {
        $scope.showDashboardView = false;
        $scope.showLocationView = false;
        $scope.showClientView = false;
        $scope.showCarView = true;
        $scope.showGarageView = false;
        $scope.active = n;
    };

    $scope.showGarage = function (n) {
        $scope.showDashboardView = false;
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
