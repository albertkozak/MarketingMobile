import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const LogoSize = props =>{
    return(
        <View>
            <Image source = {props.imageSrc} style = {styles.image}/>
        </View>
    )
};
const styles = StyleSheet.create({
    image:{
        height:175,
    width:300
    }
});
export default LogoSize;