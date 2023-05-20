/* import {app} from '../modules/carApp'
 */
app.controller("controllerVoiture", function($scope, $firebaseArray) {
    const voitureRef = firebase.database().ref().child("Voitures");

    let Voitures = $firebaseArray(voitureRef);
    
    console.log(Voitures);
    console.log(Voitures.length);
    console.log(Voitures[0]);

    $scope.voitures = Voitures;

});