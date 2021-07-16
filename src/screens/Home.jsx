import React from 'react'
import { StyleSheet, Text, View , Button} from 'react-native'

const Home = (navigation) => {
    return (
        <View>
            <Text>Home</Text>
            <Button onPress={() => navigation.navigate('Weather Details')}>Weather Detail</Button>
        </View>
    )
}

export default Home



const styles = StyleSheet.create({})
