import React from 'react'
import { StyleSheet, Text, View } from 'react-native'




const ListEmpty = () => {
    return (
        <View style={styles.item}>
            <Text>no Items</Text>
        </View>
    )
}

export default ListEmpty

const styles = StyleSheet.create({
    item:{
        alignItems:'center',
        marginTop:30,
    }

})
