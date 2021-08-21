import React, { createContext } from "react";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import config from "./clientSecrets/firebase";

// create a firebase context
const FirebaseContext = createContext();

// check the read only array of initialized firebase apps, if there are none in it, initialize one
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

//access the firestore services from firebase
const db = firebase.firestore();

// define an object with all the firebase functions
const Firebase = {
  getCurrentUser: () => {
    const user = firebase.auth().currentUser;
    console.log(" - Firebase.getCurrentUser()", user);
    return user;
    // return firebase.auth().currentUser;
  },

  onAuthStateChanged: async () => {
    return new Promise((resolve, reject) => {
      try {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            console.log(" - Firebase.getCurrentUser() UID", user.uid);
            resolve(user);
          } else {
            console.log("user not found");
            resolve(null);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  createUser: async (user) => {
    return new Promise((resolve, reject) => {
      try {
        firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
          .then((response) => {
            const uid = response.user.uid;
            db.collection("users").doc(response.user.uid).set({
              username: user.username,
              email: user.email,
            }).then(() => {
                // discard the user password
                delete user.password;
                resolve({...user,uid});
            })
          }).catch(error => {
            reject(error);
          })
      }catch (error) {
        reject(error);
      }
    })
  },

  getUserInfo: async (uid) => {
    try {
      const user = await db.collection("users").doc(uid).get();

      if (user.exists) {
        return user.data();
      }
    } catch (error) {
      console.log("error @getUserInfo: ", error.message);
    }
  },

  signOut: async () => {
    try {
      await firebase.auth().signOut();
      return true;
    } catch (error) {
      console.log("error @signOut: ", error.message);
    }

    return false;
  },

  signIn: async (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },

  reauthenticateUser: async (currentPassword) => {
    let credentials = firebase.auth.EmailAuthProvider.credential(
      firebase.auth().currentUser.email,
      currentPassword
    );
    try {
      return firebase
        .auth()
        .currentUser.reauthenticateWithCredential(credentials);
    } catch (error) {
      console.log("error @reauthenticateUser", error.message);
      return false;
    }
  },

  // update name and password
  updatePassword: async (currentPassword, newPassword) => {
    // get the uid of the current user
    const didReauthenticate = await Firebase.reauthenticateUser(
      currentPassword
    );
    if (didReauthenticate) {
      try {
        firebase
          .auth()
          .currentUser.updatePassword(newPassword)
          .then(console.log("successfully updated userPassword"));
        return true;
      } catch (err) {
        console.log("error @updatePassword", error.message);
        return false;
      }
    }
  },
  updateUsername: async (newUsername) => {
    try {
      const uid = Firebase.getCurrentUser().uid;
      await db
        .collection("users")
        .doc(uid)
        .update({ username: newUsername })
        .then(console.log("successfully updated username"));
      return true;
    } catch (err) {
      console.log("error updating username", err.message);
      return false;
    }
  },
};

// set up FirebaseProvider component that can wrap the App
const FirebaseProvider = (props) => {
  return (
    <FirebaseContext.Provider value={Firebase}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext, FirebaseProvider };
