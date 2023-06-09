app.controller("controllerLocation", function($scope, $firebaseArray) {
    const locationRef = firebase.database().ref().child("Location");
    const clientRef = firebase.database().ref().child("Client");
    const carRef = firebase.database().ref().child("Vehicules");
    const billRef = firebase.database().ref().child("Bill");
    
    let Location = $firebaseArray(locationRef);
    let Client = $firebaseArray(clientRef);
    let Car = $firebaseArray(carRef);
    let Bill = $firebaseArray(billRef);

    // Setting the views
    $scope.showLocationsReadView = true;
    $scope.showLocationsCreateView = false;
    $scope.showLocationsUpdateView = false;
    $scope.showLocationsBillView = false;

    $scope.showLocationsReadCarteView = true;
    $scope.showLocationsReadChequeView = false;

    $scope.showLocationsReadCarte = function() {
        $scope.showLocationsReadCarteView = true;
        $scope.showLocationsReadChequeView = false;
    };

    $scope.showLocationsReadCheque = function() {
        $scope.showLocationsReadCarteView = false;
        $scope.showLocationsReadChequeView = true;
    };

    $scope.showLocationsRead = function() {
        $scope.showLocationsReadView = true;
        $scope.showLocationsCreateView = false;
        $scope.showLocationsUpdateView = false;
        $scope.showLocationsBillView = false;
        $scope.locations = Location;
    };

    $scope.showLocationsCreate = function() {
        $scope.showLocationsReadView = false;
        $scope.showLocationsCreateView = true;
        $scope.showLocationsUpdateView = false;
        $scope.showLocationsBillView = false;
        $scope.cars = Car;
        $scope.clients = Client;
    };

    $scope.showLocationsUpdate = function(location) {
        $scope.showLocationsReadView = false;
        $scope.showLocationsCreateView = false;
        $scope.showLocationsUpdateView = true;
        $scope.showLocationsBillView = false;
        $scope.location = location;
        $scope.cars = Car;
        $scope.clients = Client;
    };

    $scope.showLocaionsBill = function(location) {
        $scope.showLocationsReadView = false;
        $scope.showLocationsCreateView = false;
        $scope.showLocationsUpdateView = false;
        $scope.showLocationsBillView = true;
        $scope.location = location;

        $scope.location.client = $scope.location.client.replace(/\s/g, '');
        $scope.location.vehicule = $scope.location.vehicule.replace(/\s/g, '');

        Bill.$ref().once('value', function(snap) {
            angular.forEach(snap.val(), function(index) {
                if(index.id === location.facture) {
                    $scope.bill= index;
                }
            });
        });
    }

    /* Search */
    $scope.filterVehicule = function(location) {
        if(!$scope.searchVehicule) {
            return true;
        }

        let searchVehicule = $scope.searchVehicule.toLowerCase();
        return location.vehicule.toLowerCase().indexOf(searchVehicule) !== -1;
    };

    $scope.filterClient = function(location) {
        if(!$scope.searchClient) {
            return true;
        }

        let searchClient = $scope.searchClient.toLowerCase();
        return location.client.toLowerCase().indexOf(searchClient) !== -1;
    };

    $scope.filterDateDebut = function(location) {
        if(!$scope.searchDateDebut) {
            return true;
        }

        let searchDateDebut = $scope.searchDateDebut.toLowerCase();
        return location.dateDebut.toLowerCase().indexOf(searchDateDebut) !== -1;
    };

    $scope.filterDateFin = function(location) {
        if(!$scope.searchDateFin) {
            return true;
        }

        let searchDateFin = $scope.searchDateFin.toLowerCase();
        return location.dateFin.toLowerCase().indexOf(searchDateFin) !== -1;
    };

    /* Create */
    $scope.createLocation = function () {

        $scope.newFacture.id = 1;

        // Car ID, lastest car's ID + 1
        Bill.$ref().once('value', function(snap) {
            angular.forEach(snap.val(), function(index) {
                $scope.newFacture.id = index.id + 1;
            });
        });

        // Adding the new Location
        Location.$add({
            client: $scope.newLocation.client,
            vehicule: $scope.newLocation.vehicule,
            dateDebut: $scope.newLocation.dateDebut.toISOString(),
            formattedDateDebut: ('0' + (new Date($scope.newLocation.dateDebut)).getDate()).slice(-2) + '/' + ('0' + ((new Date($scope.newLocation.dateDebut)).getMonth() + 1)).slice(-2) + '/' + (new Date($scope.newLocation.dateDebut)).getFullYear(),
            heureDebut: $scope.newLocation.heureDebut.toISOString(),
            formattedHeureDebut: ('0' + (new Date($scope.newLocation.heureDebut)).getHours()).slice(-2) + ':' + ('0' + (new Date($scope.newLocation.heureDebut)).getMinutes()).slice(-2),
            kmDebut: $scope.newLocation.kmDebut,
            dateFin: $scope.newLocation.dateFin.toISOString(),
            formattedDateFin: ('0' + (new Date($scope.newLocation.dateFin)).getDate()).slice(-2) + '/' + ('0' + ((new Date($scope.newLocation.dateFin)).getMonth() + 1)).slice(-2) + '/' + (new Date($scope.newLocation.dateFin)).getFullYear(),
            heureFin: $scope.newLocation.heureFin.toISOString(),
            formattedHeureFin: ('0' + (new Date($scope.newLocation.heureFin)).getHours()).slice(-2) + ':' + ('0' + (new Date($scope.newLocation.heureFin)).getMinutes()).slice(-2),
            kmFin: $scope.newLocation.kmFin,
            distance: $scope.newLocation.kmFin - $scope.newLocation.kmDebut,
            facture: $scope.newFacture.id
        });

        let voiturePrix = 0;

        Car.$ref().once('value', function(snap) {
            angular.forEach(snap.val(), function(index) {
                var vehicule = index.marque + index.modele;

                if($scope.newLocation.vehicule.replace(/\s/g, '') === vehicule) {
                    voiturePrix = index.prix;
                }
            });
        });

        let TVA = 0.2;
        let ff = 0;
        let sT = Math.ceil(((new Date($scope.newLocation.dateFin)).getTime() - ((new Date($scope.newLocation.dateDebut)).getTime())) / (1000 * 3600 *24))   *  voiturePrix;
        let tt = (sT + sT * TVA) - ff;

        if(typeof $scope.newFacture.dateExpiration === "undefined") {
            console.log("id: " + $scope.newFacture.id);
            console.log("dateDebut: " + $scope.newLocation.dateDebut.toISOString());
            console.log("formattedDate: " +('0' + (new Date($scope.newLocation.dateDebut)).getDate()).slice(-2) + '/' + ('0' + ((new Date($scope.newLocation.dateDebut)).getMonth() + 1)).slice(-2) + '/' + (new Date($scope.newLocation.dateDebut)).getFullYear());
            console.log("sT: " + sT);
            console.log("ff: " + ff);
            console.log("TVA: " + TVA);
            console.log("tt: " + tt);
            console.log("cheque");
            console.log($scope.newFacture.numero);
            Bill.$add({
                id: $scope.newFacture.id,
                date: $scope.newLocation.dateDebut.toISOString(),
                formattedDate: ('0' + (new Date($scope.newLocation.dateDebut)).getDate()).slice(-2) + '/' + ('0' + ((new Date($scope.newLocation.dateDebut)).getMonth() + 1)).slice(-2) + '/' + (new Date($scope.newLocation.dateDebut)).getFullYear(),
                sousTotal: sT,
                forfait: ff,
                tva: TVA,
                total: tt,
                paiement: "cheque",
                numero: $scope.newFacture.numero
            });
        } else {
            Bill.$add({
                id: $scope.newFacture.id,
                date: $scope.newLocation.dateDebut.toISOString(),
                formattedDate: ('0' + (new Date($scope.newLocation.dateDebut)).getDate()).slice(-2) + '/' + ('0' + ((new Date($scope.newLocation.dateDebut)).getMonth() + 1)).slice(-2) + '/' + (new Date($scope.newLocation.dateDebut)).getFullYear(),
                sousTotal: sT,
                forfait: ff,
                tva: TVA,
                total: tt,
                paiement: "carte",
                numero: $scope.newFacture.numero,
                dateExpiration: $scope.newFacture.dateExpiration
            });
        }
        
        $scope.success = true;

        // Clearing the input fields
        $scope.newLocation = {};
        
    };

    /* Read */
    $scope.locations = Location;

    /* Update */
    $scope.updateLocation = function(location) {
        Location.$save(location);
        $scope.showLocationsRead();
    };

    /* Update Bill */
    $scope.updateBill = function(bill, location) {
        Bill.$save(bill);
        Location.$save(location)
        $scope.showLocationsRead();
    };

    /* Delete */
    $scope.deleteLocation = function (location) {
                
        /* Bill.$ref().once('value', function(snap) {
            angular.forEach(snap.val(), function(index) {
                if(index.id == location.facture) {
                    this.$remove(index);
                }
            });
        });
        
        Location.$remove(location); */

        firebase.database().ref('Bill').once('value', function(snap) {
            snap.forEach(function(childSnap) {
                var bill = childSnap.val();
                if (bill.id === location.facture) {
                    childSnap.ref.remove();
                }
            });
        });
    
        Location.$remove(location);
    };

    /* Clear */
    $scope.clearLocation = function() {
        $scope.newLocation = {};
        $scope.location = {};
    };


});