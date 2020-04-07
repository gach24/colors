// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
    apiKey: "AIzaSyBxwJlofSDeRmGA3IOAS2oUVjYznvYwFy0",
    authDomain: "colors-a2daf.firebaseapp.com",
    databaseURL: "https://colors-a2daf.firebaseio.com",
    projectId: "colors-a2daf",
    storageBucket: "colors-a2daf.appspot.com",
    messagingSenderId: "975087980287",
    appId: "1:975087980287:web:ef015d5c5444968eac86ca",
    measurementId: "G-YYN1NMTGKZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();



const googleLogin = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    firebase.auth().languageCode = 'es_ES';
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // console.log (result.user);
        // The signed-in user info.
        var user = {};
        user.name  = result.user.displayName;
        user.email = result.user.email;
        user.photo = result.user.photoURL;
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user)); 
        window.location.href = window.location.origin + '/main.html'
         
        // ...
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
    });


};


const facebookLogin = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('email');
    /*
    provider.setCustomParameters({
        'display': 'popup'
      });
    */
    firebase.auth().languageCode = 'es_ES';
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        // console.log("Bien");

        console.log(user);
        // ...
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        console.log(error.message);
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
    });


};
