import React from 'react'
import { StyleSheet, Text, View } from 'react-native'




const ListHeader = ({location}) => {
    return (
        <View style={styles.background}>
            <Text style={styles.text}>{location.name}</Text>
        </View>
    )
}

export default ListHeader

const styles = StyleSheet.create({
    background:{
        alignItems:'center',
        backgroundColor:'silver',
        minWidth:'100%',
    },
    text:{
        fontSize:24
    }


})
