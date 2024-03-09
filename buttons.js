import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


  export default function PlusButton(){
    return(
    <View style ={styles.container}>
                <Ionicons name="person-circle" size = {60} color ="#000000" onPress={() => console.log("sock")}/>

        <Ionicons name="add-circle" size = {60} color = "#000000" onPress={() => console.log("poop")}/>
    </View>
    );

    

  }

  

  

  const styles = StyleSheet.create({
    container:{
        flex: 1,
        
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center'

    },
  });

  