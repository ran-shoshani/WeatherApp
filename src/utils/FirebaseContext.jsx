import React, { createContext } from 'react'
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import config from './firebase'



// create a firebase context
const FirebaseContext = createContext();

// check the read only array of initialized firebase apps, if there are none in it, initialize one
if(!firebase.apps.length){
    firebase.initializeApp(config)
};

//access the firestore services from firebase
const db = firebase.firestore();


// define an object with all the firebase functions
const Firebase ={
    getCurrentUser: ()=> {
        return firebase.auth().currentUser;
    },

    createUser: async(user) => {
        try {
            // create a user in the authentication portion of firebase
            await firebase.auth().createUserWithEmailAndPassword(user.email,user.password);
            
            // 
            const uid = Firebase.getCurrentUser().uid;

            await db.collection('users').doc(uid).set({
                username: user.username,
                email: user.email,
            })

            // discard the user password
            delete user.password;

        } catch (error) {
            console.log('error @createUser ', error.message);
        }
    },

    getUserInfo: async(uid)=> {
        try {
            const user = await db.collection('users').doc(uid).get()

            if(user.exists){
                return user.data()
            }

        } catch (error) {
            console.log('error @getUserInfo: ', error.message);
        }
    },

    signOut: async () => {
            try{
                await firebase.auth().signOut();
                return true;
            }
            catch(error){
                console.log('error @signOut: ', error.message);
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
    try{
        return firebase.auth().currentUser.reauthenticateWithCredential(credential);
    }catch(error)
    {
        console.log("error @reauthenticateUser", error.message);
        return false;
    }
    },

  
    // update name and password
    updatePassword: async(currentPassword,newPassword) => {
        // get the uid of the current user
       const didReauthenticate = await Firebase.reauthenticateUser(currentPassword);
       if(didReauthenticate){
           try{
               firebase.auth().currentUser.updatePassword(newPassword).then(
                   console.log("successfully updated userPassword")
               )
               return true;
           }catch(err){
               console.log("error @updatePassword", error.message);
               return false
           }
       }
        
    },
    updateUsername: async(newUsername) => {

        try{
        const uid = firebase.currentUser().uid;
        await db.collection('users').doc(uid).update({username:newUsername})
        .then(console.log("successfully updated username"));
        return true;

    }catch(err)
     {
        console.log("error updating username", err.message);
        return false;
     }
     
    }

}


// set uo FirebaseProvider component that can wrap the App
const FirebaseProvider = (props) => {
    return <FirebaseContext.Provider value={Firebase}>{props.children}</FirebaseContext.Provider>
}

export{FirebaseContext,FirebaseProvider};