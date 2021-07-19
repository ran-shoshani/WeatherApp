
import React, { useEffect , useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { UserContext } from '../utils/userContext'




const Splash = () => {

const [_,setUser] = useContext(UserContext);

    useEffect ( () => {

        setTimeout(async() => {
            setUser((state) => ({...state,isLoggedIn:false}));
        },1000);
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
