import * as React from "react";
import { Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import Colors from "../../constants/Color";

const SubscriptionItem = ({ subscription }) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.text}>{subscription.eventSubscriptions.vendorName}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  text: {
    color: Colors.WHITE,
    fontSize: 16,
    paddingVertical: 15,
    width: Dimensions.get("window").width * 0.75,
  },
});

export default SubscriptionItem;
