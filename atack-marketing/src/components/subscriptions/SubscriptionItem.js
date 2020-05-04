import * as React from "react";
import { Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import Colors from "../../constants/Color";

const SubscriptionItem = ({ subscription }) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      {/* Update with dynamic info */}
      <Text style={styles.text}>
        {subscription.eventSubscription.vendorName}
      </Text>
    </SafeAreaView>
  );
};

// Border Bottom does NOT work in iOS at this time. Pending further review...
const styles = StyleSheet.create({
  wrapper: {},
  text: {
    color: Colors.WHITE,
    fontSize: 16,
    borderColor: "transparent",
    borderBottomColor: Colors.GREY,
    borderWidth: 1,
    paddingVertical: 15,
    width: Dimensions.get("window").width * 0.75,
  },
});

export default SubscriptionItem;
