import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

const VendorList = ({ navigation, props }) => {
  return (
    <View style={styles.container}>
      <Text>Vendor List</Text>
    </View>
  );
}

const styles = StyleSheet.create({
   flex: 1, 
   alignItems: "center", 
   justifyContent: "center" 
})

export default VendorList;
