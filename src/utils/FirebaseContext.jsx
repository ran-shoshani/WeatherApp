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

            if(users.exist){
                return user.data()
            }

        } catch (error) {
            console.log('error @getUserInfo: ', error.message);
        }

    }
}


// set uo FirebaseProvider component that can wrap the App
const FirebaseProvider = (props) => {
    return <FirebaseContext.Provider value={Firebase}>{props.children}</FirebaseContext.Provider>
}

export{FirebaseContext,FirebaseProvider};