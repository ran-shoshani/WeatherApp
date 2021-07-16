import firebase from 'firebase/app'

require('firebaseapp/auth')



var firebaseConfig = {
    apiKey: "AIzaSyDWYSZTYBq3LjiuXMzeI3t7S9Syf6X-z4Y",
    authDomain: "weatherapp-e3483.firebaseapp.com",
    projectId: "weatherapp-e3483",
    storageBucket: "weatherapp-e3483.appspot.com",
    messagingSenderId: "258109457087",
    appId: "1:258109457087:web:d351994d6c5440a5ed7c0a"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;