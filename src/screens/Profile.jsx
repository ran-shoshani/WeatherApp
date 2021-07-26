import React, { useState , useContext, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { ROUTES } from "../utils/constants";
import { MaterialIcons } from "@expo/vector-icons";
import { FirebaseContext } from "../utils/FirebaseContext";
import { UserContext } from "../utils/UserContext";





const Profile = ({ navigation }) => {


  const firebase = useContext(FirebaseContext);
  const [_, setUser] = useContext(UserContext);


  const [currentPassword,setCurrentPassword] = useState('');
  const [newUsername,setNewUsername] = useState();
  const [newPassword,setNewPassword] = useState();



  const handleUpdateUsername = async() => {

    // setSaveUsernameLoading(!saveUsernameLoading);

    try{
      const didUpdateUsername = await firebase.updateUsername(newUsername);
      if(didUpdateUsername){
        setUser((state) => ({...state,username:newUsername}));
        console.log("successfully updated username");
      }

    }catch(err){
      console.log("error @handleUsername", err.message);
    }

  }


  const handleUpdatePassword = async() => {

    // setUpdatePasswordLoading(true);

    try{
      const didUpdatePassword = await firebase.updatePassword(newPassword);
      if(didUpdatePassword){
        setUser((state) => ({...state,password:newPassword}));
        console.log("successfully updated password!");
      }

    }catch(err){
      console.log("error @handleUpdatePassword", err.message);
    }
    // setUpdatePasswordLoading(false);
    setNewPassword('');
  }
  



  useEffect(() => {
    console.log("Profile Page Screen");
  },[]);

  const handleHeaderPress = async () => {
    console.log("Header button pressed");
    
    const loggedOut = await firebase.signOut();
    if(loggedOut){
        // REVERT BACK TO THE INITIAL STATE, reset the user 
        setUser((state) => ({
            username:'',
            email:'',
            uid:'',
            isLoggedIn:false
        }));
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleHeaderPress}>
          <Text>Sign Out</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);







  return (
    <View>
      {/* UPDATE PROFILE UI */}

      {/* UPDATE USER NAME UI */}
      {/* TEXT value=new user name */}
      <Text>Update user name</Text>
      {/* TEXT INPUT to get that value from user */}
      <View>
        {/* <Text styles={styles.centerAlign}>New Password:</Text> */}
        <TextInput 
        
        placeholder={"name"} 
        value={newUsername}
        onChangeText={(value) => setNewUsername(value)}
        />

        {/* save button */}
        <TouchableOpacity onPress={handleUpdateUsername}>
          <Text style={styles.input}>{"Save"}</Text>
        </TouchableOpacity>
      </View>


      {/* UPDATE PASSWORD UI */}
      {/* TEXT value= new password */}
      <Text>Update user Password</Text>
      {/* TEXT INPUT to get that value from user */}
      <View>
        <TextInput 
        
        placeholder={"password"} 
        value={newPassword}
        onChangeText={(value) => setNewUsername(value)}
        />
      </View>
      {/* SAVE BUTTON */}




      {/* ------- current password */}
      <Text>Current Password</Text>
      {/* TEXT INPUT to get that value from user */}
      <View>
        <TextInput 
        
        placeholder={"password"} 
        value={currentPassword}
        onChangeText={(value) => setCurrentPassword(value)}
        />
      </View>
       {/* save button */}
       <TouchableOpacity onPress={handleUpdatePassword}>
          <Text style={styles.input}>{"Save"}</Text>
        </TouchableOpacity>
      
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  input: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // borderWidth: 2,
     fontSize: 20,
    // borderWidth: 1,

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

//<Button onPress={() => navigation.navigate(ROUTES.SIGN_IN)} title='Sign out'/>
