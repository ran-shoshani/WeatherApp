import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Alert,
} from "react-native";
import { ROUTES } from "../utils/constants";
import { authStyles } from "../styles/authStyles";
import { UserContext } from "../utils/UserContext";
import { FirebaseContext } from "../utils/FirebaseContext";
import { MaterialIcons } from "@expo/vector-icons";

const SignUp = ({ navigation }) => {
  // states for this component
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);

  const [validCheck, setValidCheck] = useState(false);
  // context for this component
  const firebase = useContext(FirebaseContext);
  const [_, setUser] = useContext(UserContext);
  // hook call for this component
  useEffect(() => {
    console.log("Sign Up Screen");
  }, []);

  // functions
  const signUp = async () => {
    // validation check function
    if (validateInputs(username, email, password)) {
      setLoading(true);
      const user = {
        username,
        email,
        password,
      };

      try {
        // email password check
        const createdUser = await firebase.createUser(user);
        setUser({ ...createdUser, isLoggedIn: true });
        console.log("-----signUp successful");
      } catch (error) {
        console.log("error @signUp", error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const validateInputs = (username, email, password) => {
    if (username.length < 3) {
      Alert.alert("user name too short", [{ text: "OK" }]);
      return false;
    } else if (password.length < 8) {
      Alert.alert("password must be more than 8 characters long", [{ text: "OK" }]);
      return false;
    } else if (!(email.indexOf("@") > 0)) {
      Alert.alert("email must use @", [{ text: "OK" }]);
      return false;
    } else {
      return true;
    }
  };

  return (
    <View style={authStyles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="#539edd"
        barStyle="dark-content"
      />
      <View style={authStyles.centerAlign}>
        <Text style={authStyles.pageHeader}>Register to get Started</Text>

        <View style={authStyles.inputView}>
          <Text style={authStyles.viewHeader}>User Name: </Text>
          <TextInput
            style={authStyles.textInput}
            value={username}
            onChangeText={(username) => setUsername(username.trim())}
            placeholder={"Micheal"}
          />
        </View>

        <View style={authStyles.inputView}>
          <Text style={authStyles.viewHeader}>Email: </Text>
          <TextInput
            style={authStyles.textInput}
            value={email}
            onChangeText={(email) => setEmail(email.trim())}
            placeholder={"email@example.com"}
          />
        </View>

        <View style={authStyles.passwordView}>
          <Text style={authStyles.viewHeader}>Password: </Text>

          <View style={authStyles.passwordRow}>
            <TextInput
              style={authStyles.textInput}
              value={password}
              onChangeText={(password) => setPassword(password.trim())}
              placeholder={"*******"}
              secureTextEntry={passwordHidden}
            />
            <TouchableOpacity
              style={authStyles.passwordIcon}
              onPress={() => setPasswordHidden(!passwordHidden)}
            >
              <MaterialIcons
                name={`visibility${passwordHidden ? "-off" : ""}`}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={authStyles.submitButtonView}>
          <TouchableOpacity
            onPress={signUp}
            style={authStyles.submitButton}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size={"large"} color="#529edd" />
            ) : (
              <Text style={authStyles.submitButtonText}>{"Sign Up"}</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={authStyles.bottomNavView}>
          <Text style={authStyles.bottomNavText}>{"Already a member?"}</Text>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.SIGN_IN)}>
            <Text style={authStyles.bottomNavLink}>{"Sign In"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
