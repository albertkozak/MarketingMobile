import React from "react";
import { StyleSheet, View, Image } from "react-native";

const LogoSize = (props) => {
  return (
    <View>
      <Image source={props.imageSrc} style={styles.image} />
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    height: 160,
    width: 160,
    marginBottom: 5,
  },
});
export default LogoSize;
