/* (function () {})();
 */
/* Firebase Initialisation */
const firebaseConfig = {
    apiKey: "AIzaSyAv5vXH9niiaYPeRMNBZgfuN3NFmZi7l3Q",
    authDomain: "carmng-53b0b.firebaseapp.com",
    databaseURL: "https://carmng-53b0b-default-rtdb.firebaseio.com/",
    projectId: "carmng-53b0b",
    storageBucket: "carmng-53b0b.appspot.com",
    messagingSenderId: "272142154762",
    appId: "1:272142154762:web:67851dd1129b0b32aeb3f3",
};

firebase.initializeApp(firebaseConfig);



export var app = angular
    .module("carApp", ["firebase"])
    .controller("MyC", function ($scope, $firebaseObject, $firebaseArray) {
        const rootRef = firebase.database().ref().child("Cars");

        let cars = $firebaseArray(rootRef);

        this.object = $firebaseObject(rootRef);

        console.log(cars);
    });
