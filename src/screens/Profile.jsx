import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  StatusBar
} from "react-native";
import { ROUTES } from "../utils/constants";
import { MaterialIcons } from "@expo/vector-icons";
import { FirebaseContext } from "../utils/FirebaseContext";
import { UserContext } from "../utils/UserContext";


const Profile = ({ navigation }) => {


  const image = require("../styles/frog1.jpg");
  
  //states for this component
  const firebase = useContext(FirebaseContext);
  const [_, setUser] = useContext(UserContext);


  // states for this component
  const [currentPassword, setCurrentPassword] = useState("");
  const [newUsername, setNewUsername] = useState();
  const [newPassword, setNewPassword] = useState();
  const [passwordHiddenNew, setPasswordHiddenNew] = useState(true);
  const [passwordHiddenCurrent, setPasswordHiddenCurrent] = useState(true); //(true);

// hooks
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
        <StatusBar translucent={true} backgroundColor="#539edd" barStyle="dark-content"/>
        <TouchableOpacity style={{marginRight: 20}} onPress={handleHeaderPress}>
          <Text>Sign Out</Text>
        </TouchableOpacity>
        </>
      ),
      headerStyle:{
        backgroundColor:"#529edd",
      }
    });
  }, [navigation]);

  useEffect(() => {
    console.log("Profile Page Screen");
  }, []);


// functions
  const handleUpdateUsername = async () => {
    console.log("new password: ", newPassword);
    console.log("current password: ", currentPassword);
    // setSaveUsernameLoading(!saveUsernameLoading);

    try {
      const didUpdateUsername = await firebase.updateUsername(newUsername);
      if (didUpdateUsername) {
        setUser((state) => ({ ...state, username: newUsername }));
        console.log("successfully updated username");
      }
    } catch (err) {
      console.log("error @handleUsername", err.message);
    }
    //once we reach this line , name changed succefully
    //we can clear the placeholder
    setNewUsername();
  };

  const handleUpdatePassword = async () => {
    // setUpdatePasswordLoading(true);
    console.log("new password: ", newPassword);
    console.log("current password: ", currentPassword);
    try {
      const didUpdatePassword = await firebase.updatePassword(
        currentPassword,
        newPassword
      );
      if (didUpdatePassword) {
        setUser((state) => ({ ...state, password: newPassword }));
        console.log("successfully updated password!");
      }
    } catch (err) {
      console.log("error @handleUpdatePassword", err.message);
    }
    // setUpdatePasswordLoading(false);
    setNewPassword("");
    //once we reach this line , name changed succefully
    //we can clear the placeholder
    setCurrentPassword();
  };

  const handleHeaderPress = async () => {
    console.log("Header button pressed");

    const loggedOut = await firebase.signOut();
    if (loggedOut) {
      // REVERT BACK TO THE INITIAL STATE, reset the user
      setUser((state) => ({
        username: "",
        email: "",
        uid: "",
        isLoggedIn: false,
      }));
    }
  };




  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={image} resizeMode="cover">
      <View style={styles.updateUserNameContainer}>
      {/* UPDATE USER NAME*/}
        <View style={styles.inputView}>
          <Text style={styles.inputHeader}>Update username</Text>
        <TextInput
        style={styles.textInput}
        placeholder={"name username"}
        value={newUsername}
        onChangeText={(value) => setNewUsername(value)}
        />
        </View>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleUpdateUsername}
        >
          <Text style={styles.saveButtonText}>Update Username</Text>
        </TouchableOpacity>
      </View>




      <View style={styles.updatePasswordContainer}>
      
        {/* UPDATE PASSWORD */}
        <View style={styles.inputView}>
          <Text style={styles.inputHeader}>New Password</Text>
          <View style={styles.passwordInputRow}>
          <TextInput
            style={styles.textInput}
            placeholder={"*******"}
            value={newPassword}
            secureTextEntry={passwordHiddenNew}
            onChangeText={(value) => setNewPassword(value)}
          />
          <TouchableOpacity
            style={styles.passwordInputIcon}
            onPress={() => setPasswordHiddenNew(!passwordHiddenNew)}
          >
            <MaterialIcons
              name={`visibility${passwordHiddenNew ? "-off" : ""}`}
              size={24}
              color="black"
            />
          </TouchableOpacity>
          </View>
        </View>


        <View style={styles.inputView}>
          <Text style={styles.inputHeader}>Current Password</Text>
          <View style={styles.passwordInputRow}>
          <TextInput
            style={styles.textInput}
            placeholder={"*******"}
            value={currentPassword}
            secureTextEntry={passwordHiddenCurrent}
            onChangeText={(value) => setCurrentPassword(value)}
          />
          <TouchableOpacity
            style={styles.passwordInputIcon}
            onPress={() => setPasswordHiddenCurrent(!passwordHiddenCurrent)}
          >
            <MaterialIcons
              name={`visibility${passwordHiddenCurrent ? "-off" : ""}`}
              size={24}
              color="black"
            />
          </TouchableOpacity>
          </View>
        </View>


        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleUpdatePassword}>          
          <Text style={styles.saveButtonText}>Update Password</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  updateUserNameContainer: {
    marginTop:20,
    padding: 10,
  },

  updatePasswordContainer: {
    marginTop:20,
    padding: 10,
  },
  inputView: {
    padding: 10,
    margin: 10,
  },

  saveButton: {
    width:'95%',
    alignSelf: "center",
    padding: 10,
    backgroundColor:'#9e9e9eac',
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
    marginBottom:10,
  },
  saveButtonText: {
    fontSize: 22,
    alignSelf: "center",
  },
  passwordInputRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInputIcon: {
    position: "absolute",
    right: -5,
    padding: 10,
  },
  textInput: {
    fontSize: 14,
    width: "100%",
    marginTop: 5,
    paddingBottom: 10,
    borderBottomWidth: 1,
    alignSelf: "center",
  },
  inputView: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
  },
  inputHeader: {
    fontSize: 10,
  },
  image: {
    flex: 1,
  },
});

