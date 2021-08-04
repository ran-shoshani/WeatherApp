import React from 'react'
import { StyleSheet, Text, View } from 'react-native'




const ListHeader = () => {
    return (
        <View style={styles.background}>
            <Text style={styles.text}>Cities List Header</Text>
        </View>
    )
}

export default ListHeader

const styles = StyleSheet.create({
    background:{
        backgroundColor:'gray',
        minWidth:'100%',
    },
    text:{
        fontSize:24
    }


})
