import * as React from "react";
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import Container from "../components/Container";
import Colors from '../constants/Color'

function QRScannerScreen({ navigation }) {
  return (
    <Container>
      <SafeAreaView style={styles.wrapper}>
        <Text style={styles.title}>QR Scanner</Text>
        <Button 
          title="Scan"
          color={Colors.ORANGE} />
      </SafeAreaView>
    </Container>
  );
}

const styles = StyleSheet.create({
  wrapper: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center" 
  },
  title: {
    color: Colors.WHITE,
    fontSize: 22,
    marginBottom: 25
  }
})

export default QRScannerScreen;
