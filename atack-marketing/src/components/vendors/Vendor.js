import * as React from "react";
import { View, Text, Button } from "react-native";

function Vendor({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Vendor Screen</Text>
      <Button title="Subscribe" />
    </View>
  );
}

export default Vendor;
