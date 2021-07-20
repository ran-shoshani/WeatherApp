
import React, { useEffect , useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { UserContext } from '../utils/UserContext'
import { FirebaseContext } from '../utils/FirebaseContext'



const Splash = () => {

const [_,setUser] = useContext(UserContext);
const firebase = useContext(FirebaseContext);

    useEffect ( () => {

        setTimeout(async() => {

            const user = firebase.getCurrentUser();

            if(user){
                const userInfo = await firebase.getUserInfo(user.uid);
                setUser({
                    isLoggedIn: true,
                    email:userInfo.email,
                    uid: user.uid,
                    username:userInfo.username,
                })
            }else{

                setUser((state) => ({...state,isLoggedIn:false}));
            }
        },500);


    },[])


    return (
        <View style={styles.centerAlign}>
            <Text>Splash</Text>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({

centerAlign:{
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
}

})
