var firebaseRef = require('firebase');
const firebaseConfig = {
    apiKey: "AIzaSyDhCl1Bh55pGhT9ndNyfeO1G0iYmnHWJLI",
    authDomain: "groceryweb-5941d.firebaseapp.com",
    databaseURL: "https://groceryweb-5941d.firebaseio.com",
    projectId: "groceryweb-5941d",
    storageBucket: "groceryweb-5941d.appspot.com",
    messagingSenderId: "833774791045",
    appId: "1:833774791045:web:a3b309f81ea1faed79fcec",
    measurementId: "G-5JPQSTKZJJ"
  };

// Initialize Firebase
firebaseRef.initializeApp(firebaseConfig);

function signUp(email, password, callback, erro) {
    firebaseRef.auth().createUserWithEmailAndPassword(email, password).then(function (result) {
        callback(result);
    }).catch(function (error) {
        erro(error);
    });
}

function signIn(email, password, callback, erro) {
    firebaseRef.auth().signInWithEmailAndPassword(email, password).then(function (result) {
        callback(result);
    }).catch(function (error) {
        erro(error);
    });
}

module.exports = {
    signUp: signUp,
    signIn: signIn
}