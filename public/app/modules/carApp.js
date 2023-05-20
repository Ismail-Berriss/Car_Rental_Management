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

/* const firebaseConfig = {
    apiKey: "AIzaSyBYMD2HIqDJFdoUsm7U63kVZC6550-3bH0",
    authDomain: "carrentalmanagement-6c61e.firebaseapp.com",
    databaseURL: "https://carrentalmanagement-6c61e-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "carrentalmanagement-6c61e",
    storageBucket: "carrentalmanagement-6c61e.appspot.com",
    messagingSenderId: "72692004796",
    appId: "1:72692004796:web:169b1c8b0249e301661db9"
  };
 */
firebase.initializeApp(firebaseConfig);

let app = angular.module("carApp", ["firebase"]);
