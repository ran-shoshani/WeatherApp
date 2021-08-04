import React from 'react'
import { StyleSheet, Text, View } from 'react-native'





const ListItem = ({item}) => {

    return (
        <View style={styles.background}>
            <Text style={styles.text}>{item.name}</Text>
        </View>
    )
}

export default ListItem

const styles = StyleSheet.create({
    background:{
        alignItems:'center',
        backgroundColor:'lightblue'
    },
    text:{
        fontSize:20,
    }
})
