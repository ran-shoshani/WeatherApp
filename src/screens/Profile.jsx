import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
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
import { authStyles } from "../styles/authStyles";

const Profile = ({ navigation }) => {
  const firebase = useContext(FirebaseContext);
  const [_, setUser] = useContext(UserContext);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newUsername, setNewUsername] = useState();
  const [newPassword, setNewPassword] = useState();

  const handleUpdateUsername = async () => {
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
  };

  const handleUpdatePassword = async () => {
    // setUpdatePasswordLoading(true);

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
  };

  useEffect(() => {
    console.log("Profile Page Screen");
  }, []);

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
    <View style={styles.profileContainer}>
      <View style={styles.updateUserNameContainer}>
        <View style={styles.inputView}>
        <TextInput
        placeholder={"name"}
        value={newUsername}
        onChangeText={(value) => setNewUsername(value)}
        />
        </View>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleUpdateUsername}
        >
          <Text style={styles.saveButtonText}>update username button</Text>
        </TouchableOpacity>
        
      </View>




      <View style={styles.updatePasswordContainer}>
        <View style={styles.inputView}>
          <Text style={styles.inputHeader}> update password input header</Text>
          <View style={styles.passwordInputRow}>
          <TextInput
           placeholder={"new password"}
          value={newPassword}
          onChangeText={(value) => setNewPassword(value)}
          />


          </View>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputHeader }
           
            //confirm current password input header
            //<TextInput
            placeholder={"current password"}
            value={currentPassword}
            onChangeText={(value) => setCurrentPassword(value)}
            //>
            
          />
          <View style={styles.passwordInputRow}>
            




            
          </View>
        </View>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleUpdatePassword}>          
          <Text style={styles.saveButtonText}>update password button</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 25,
  },
  updateUserNameContainer: {
    width: "90%",
    borderWidth: 1,
    borderColor: "black",
  },

  updatePasswordContainer: {
    width: "90%",
    borderWidth: 1,
    borderColor: "black",
  },
  inputView: {
    padding: 10,
    margin: 10,
  },

  saveButton: {
    width: "100%",
    padding: 10,
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
    marginTop: 15,
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
    fontSize: 12,
  },
});

//<Button onPress={() => navigation.navigate(ROUTES.SIGN_IN)} title='Sign out'/>

//{
//   /* <View style={styles.profileContainer}>
//       {/* UPDATE PROFILE UI */
// }

// {
//   /* TEXT INPUT to get that value from user */
// }
// //   <Text>Update user name</Text>
// //   <View style={styles.userNameContainer}>
// //     <TextInput
// //       placeholder={"name"}
// //       value={newUsername}
// //       onChangeText={(value) => setNewUsername(value)}
// //     />

// //     {/* save button */}
// //     <TouchableOpacity onPress={handleUpdateUsername}>
// //       <Text>{"Save Name"}</Text>
// //     </TouchableOpacity>
// //   </View>

// //   {/* UPDATE PASSWORD UI */}
// //   {/* TEXT value= new password */}
// //   {/* userPasswordView */}

// //   <View style={styles.passwordContainer}>
// //   <Text>Update user Password</Text>
// //     {/* TEXT INPUT to get that value from user */}
// //     <View style={styles.passwordView}>
// //       <TextInput
// //         placeholder={"new password"}
// //         value={newPassword}
// //         onChangeText={(value) => setNewPassword(value)}
// //       />
// //     </View>




//-------------------------------------------
//      {/* ------- current password */}
//      <Text>Confirm Current Password</Text>
//      {/* TEXT INPUT to get that value from user */}
//      <View style={styles.currentUserPasswordView}>
//        <TextInput
//          placeholder={"current password"}
//          value={currentPassword}
//          onChangeText={(value) => setCurrentPassword(value)}
//        />
//      </View>
//      {/* save button */}
//      <TouchableOpacity onPress={handleUpdatePassword}>
//          <Text>{"Save Password"}</Text>
//        </TouchableOpacity>
//    </View>
//  </View> }*/
