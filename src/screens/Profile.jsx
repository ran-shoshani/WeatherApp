import React, { useContext , useEffect , useLayoutEffect } from "react";
import { StyleSheet, Text, View , Button , TouchableOpacity } from 'react-native'
import { ROUTES } from '../utils/constants';
import { MaterialIcons } from '@expo/vector-icons';
import { FirebaseContext } from "../utils/FirebaseContext";
import { UserContext } from "../utils/UserContext";

const Profile = ({navigation}) => {

    const firebase = useContext(FirebaseContext);
    const [_,setUser] = useContext(UserContext);
    

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

    useEffect(() => {
        console.log("Profile Page Screen");
      });



      useLayoutEffect(() => {
        navigation.setOptions({
          headerRight:()=> (
            <TouchableOpacity onPress={handleHeaderPress}>
              <Text>Sign Out</Text>
            </TouchableOpacity>
          )
        })
      },[navigation])




    return (
        <View>
            <Text>Profile</Text>
            <Button onPress={() => navigation.navigate(ROUTES.HOME)} title='Home Page'/>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({})




//<Button onPress={() => navigation.navigate(ROUTES.SIGN_IN)} title='Sign out'/>