import * as React from "react";
import { Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import Colors from "../../constants/Color";

const VendorItem = ({ vendor }) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      {/* Update with dynamic info */}
      <Text style={styles.text}>{vendor.vendorName}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  text: {
    color: Colors.WHITE,
    fontSize: 16,
    // borderColor: "transparent",
    // borderBottomColor: Colors.GREY,
    // borderWidth: 1,
    textAlign: "center",
    paddingVertical: 15,
    width: Dimensions.get("window").width * 0.75,
  },
});

export default VendorItem;
