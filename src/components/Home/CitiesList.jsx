import React from 'react'
import { StyleSheet, Text, View , FlatList } from 'react-native'
import ListItem from './list/ListItem';
import ListHeader  from './list/ListHeader';
import ListEmpty from './list/ListEmpty';

const CitiesList = () => {



   const data = [
       {
           name:"current position",
           id:'0'
       },
       {
        name:"Sydney",
        id:'1'
    },
    {
        name:"Cairns",
        id:'2'
    },
    {
        name:"brisbane",
        id:'3'
    }
   ]


   const renderItem = ({item}) => {
       //console.log('item in renderlist:', item);
       return(
           <ListItem item={item}/>
       )
   };

    return (
        <View>
            <FlatList
            data={data}
            renderItem={renderItem}
            ListEmptyComponent={ListEmpty}
            ListHeaderComponent={ListHeader}
            />
        </View>
    )
}

export default CitiesList

const styles = StyleSheet.create({})
