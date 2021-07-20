import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { ROUTES } from "../utils/constants";
import { UserContext } from "../utils/userContext";
import { MaterialIcons } from "@expo/vector-icons";
import { authStyles } from "../styles/authStyles";
//import firebase from '../utils/firebase';

const SignIn = ({ navigation }) => {
  const [user, setUser] = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);

  useEffect(() => {
    console.log("signin component user uid", user.uid);
  }, [user.uid]);

  const handleSignin = () => {
    try {
      firebase.auth().signinWithEmailAndPassword(email, password).then();
    } catch (error) {
      console.log("error @signin, ", errormessage);
    }
  };

  return (
    <View style={authStyles.centerAlign}>
      <Text>Sign In</Text>

      <View style={authStyles.emailView}>
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

      <View style={authStyles.signInView}>
        <TouchableOpacity style={authStyles.signInButton}>
          <Text style={authStyles.signInText}>{"Sign In"}</Text>
        </TouchableOpacity>
      </View>

      <View style={authStyles.signUpView}>
        <Text style={authStyles.signUpText}>{"Not a member yet?"}</Text>
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.SIGN_UP)}>
          <Text style={authStyles.signUpLink}>{"Sign Up"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;
