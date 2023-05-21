app.controller("mainController", function ($scope) {
    // Setting the default
    $scope.showDashboardView = true;
    $scope.showLocationView = false;
    $scope.showClientView = false;
    $scope.showCarView = false;
    $scope.active = 1;

    $scope.showDashboard = function (n) {
        $scope.showDashboardView = true;
        $scope.showLocationView = false;
        $scope.showClientView = false;
        $scope.showCarView = false;
        $scope.active = n;
    };

    $scope.showLocation = function (n) {
        $scope.showDashboardView = false;
        $scope.showLocationView = true;
        $scope.showClientView = false;
        $scope.showCarView = false;
        $scope.active = n;
    };

    $scope.showClient = function (n) {
        $scope.showDashboardView = false;
        $scope.showLocationView = false;
        $scope.showClientView = true;
        $scope.showCarView = false;
        $scope.active = n;
    };

    $scope.showCar = function (n) {
        $scope.showDashboardView = false;
        $scope.showLocationView = false;
        $scope.showClientView = false;
        $scope.showCarView = true;
        $scope.active = n;
    };

    $scope.isActive = function (num) {
        return $scope.active === num;
    };
});
