import * as React from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";

const EventItem = ({ event }) => {
  return (
    <View style={styles.container}>
      {/* Update with dynamic info */}
      <Text>{event.eventTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default EventItem;
