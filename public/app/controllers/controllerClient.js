app.controller("controllerClient", function($scope, $firebaseArray) {
    const clientRef = firebase.database().ref().child("Client");

    let Client = $firebaseArray(clientRef);

    // Setting the views
    $scope.showClientsReadView = true;
    $scope.showClientsCreateView = false;
    $scope.showClientsUpdateView = false;

    $scope.showClientsRead = function() {
        $scope.showClientsReadView = true;
        $scope.showClientsCreateView = false;
        $scope.showClientsUpdateView = false;
        $scope.clients = Client;
    };

    $scope.showClientsCreate = function() {
        $scope.showClientsReadView = false;
        $scope.showClientsCreateView = true;
        $scope.showClientsUpdateView = false;
    };

    $scope.showClientsUpdate = function(client) {
        $scope.showClientsReadView = false;
        $scope.showClientsCreateView = false;
        $scope.showClientsUpdateView = true;
        $scope.client = client;
    };

    /* Search */
    $scope.filterNom = function(car) {
        if(!$scope.searchNom) {
            return true;
        }

        let searchNom = $scope.searchNom.toLowerCase();
        return car.nom.toLowerCase().indexOf(searchNom) !== -1;
    };

    $scope.filterPrenom = function(car) {
        if(!$scope.searchPrenom) {
            return true;
        }

        let searchPrenom = $scope.searchPrenom.toLowerCase();
        return car.prenom.toLowerCase().indexOf(searchPrenom) !== -1;
    };

    $scope.filterAdresse = function(car) {
        if(!$scope.searchAdresse) {
            return true;
        }

        let searchAdresse = $scope.searchAdresse.toLowerCase();
        return car.adresse.toLowerCase().indexOf(searchAdresse) !== -1;
    };

    /* Create */
    $scope.createClient = function () {

        $scope.newClient.id = 1;

        // Client ID, lastest client's ID + 1
        Client.$ref().once('value', function(snap) {
            angular.forEach(snap.val(), function(index) {
                $scope.clients = index;
                $scope.newClient.id = index.id + 1;
            });
        });

        // Adding the new client
        Client.$add({
            id: $scope.newClient.id,
            nom: $scope.newClient.nom,
            prenom: $scope.newClient.prenom,
            adresse: $scope.newClient.adresse
        });
        
        $scope.success = true;

        // Clearing the input fields
        $scope.newClient = {};
        
    };

    /* Read */
    $scope.clients = Client;

    /* Update */
    $scope.updateClient = function(client) {
        Client.$save(client);
        $scope.showClientsRead();
    };

    /* Delete */
    $scope.deleteClient = function (client) {
        Client.$remove(client);
    };
});