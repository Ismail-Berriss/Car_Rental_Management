app.controller("mainController", function ($scope) {
    // Setting the default
    $scope.showDashboardView = true;
    $scope.showLocationView = false;
    $scope.showClientView = false;
    $scope.showVoitureView = false;
    $scope.active = 1;

    $scope.showDashboard = function (n) {
        $scope.showDashboardView = true;
        $scope.showLocationView = false;
        $scope.showClientView = false;
        $scope.showVoitureView = false;
        $scope.active = n;
    };

    $scope.showLocation = function (n) {
        $scope.showDashboardView = false;
        $scope.showLocationView = true;
        $scope.showClientView = false;
        $scope.showVoitureView = false;
        $scope.active = n;
    };

    $scope.showClient = function (n) {
        $scope.showDashboardView = false;
        $scope.showLocationView = false;
        $scope.showClientView = true;
        $scope.showVoitureView = false;
        $scope.active = n;
    };

    $scope.showVoiture = function (n) {
        $scope.showDashboardView = false;
        $scope.showLocationView = false;
        $scope.showClientView = false;
        $scope.showVoitureView = true;
        $scope.active = n;
    };

    $scope.isActive = function (num) {
        return $scope.active === num;
    };
});
