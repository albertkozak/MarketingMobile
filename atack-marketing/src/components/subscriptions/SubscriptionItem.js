import * as React from "react";
import { Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import Colors from "../../constants/Color";

const SubscriptionItem = ({ event }) => {
  console.log(event.eventSubscriptions[0]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.text}>{event.eventName}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  text: {
    color: Colors.GREY,
    fontSize: 20,
    paddingVertical: 15,
    width: Dimensions.get("window").width * 0.75,
    marginTop: 10
  }
});

export default SubscriptionItem;
