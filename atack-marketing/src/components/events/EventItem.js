import * as React from "react";
import { Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import Colors from "../../constants/Color";

const EventItem = ({ event }) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.text}>{event.eventName}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  text: {
    color: Colors.WHITE,
    fontSize: 16,
    paddingVertical: 12,
    textAlign: "center",
    width: Dimensions.get("window").width * 0.75,
  },
});

export default EventItem;
