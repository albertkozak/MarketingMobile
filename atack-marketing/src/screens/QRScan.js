import * as React from "react";
import { View, Text, Button } from "react-native";
import Container from "../components/Container";

function QRScannerScreen({ navigation }) {
  return (
    <Container>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>QR Scanner</Text>
        <Button title="Scan" />
      </View>
    </Container>
  );
}

export default QRScannerScreen;
