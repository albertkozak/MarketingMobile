import * as React from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
import Colors from "../../constants/Color";

const SubscriptionItem = ({ subscription }) => {
  console.log(subscription.vendorName);
  console.log(subscription.eventSubscriptions.vendorName);
  return (
    <SafeAreaView style={styles.wrapper}>
      {/* Update with dynamic info */}
      <Text style={styles.text}>{eventSubscriptions.vendorName}</Text>
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
