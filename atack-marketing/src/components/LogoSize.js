import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const LogoSize = (props) => {
  return (
    <View>
      <Image source={props.imageSrc} style={styles.image} />
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 150,
  },
});
export default LogoSize;
