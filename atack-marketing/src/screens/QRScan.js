import * as React from "react";
import { View, Text, Button } from "react-native";

function QRScannerScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>QR Scanner</Text>
      <Button title="Scan" />
    </View>
  );
}

export default QRScannerScreen;
