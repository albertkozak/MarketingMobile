import * as React from "react";
import { View, Text, Button, FlatList, StyleSheet} from "react-native";

const VendorItem = ({ vendor }) => {
  return (
    <View style={styles.container}>
      {/* Update with dynamic info */}
  <Text>{vendor.vendorName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
     flex: 1, 
     alignItems: "center", 
     justifyContent: "center" 
    }
  })

export default VendorItem;