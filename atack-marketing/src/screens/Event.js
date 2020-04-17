import * as React from "react";
import { View, Text, Button } from "react-native";

function Event({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Event Screen</Text>
      <Button title="Join" onPress={() => navigation.navigate("QRScan")} />
      <Button title="Vendors" />
    </View>
  );
}

export default Event;
