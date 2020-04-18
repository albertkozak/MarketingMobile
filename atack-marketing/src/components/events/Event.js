import * as React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Event = ({ route, navigation }) => {
  const { eventTitle } = route.params;
  return (
    <View style={styles.container}>
      {/* Update with dynamic info */}
      <Text stlye={styles.eventTitle}>{eventTitle}</Text>
      <Button title="Join" onPress={() => navigation.navigate("QRScan")} />
      <Button
        title="Vendors"
        onPress={() => navigation.navigate("VendorList")}
      />
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

export default Event;
