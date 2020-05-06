import React, { useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Container from "../components/Container";
import { Button } from "react-native-elements";
import Colors from "../constants/Color";

const QRScan = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    //FYI: PROOF OF CONCEPT
    //This Does *NOT* validate they joined the event

    let qrData = JSON.parse(data);
    console.log(qrData);

    alert(
      `Bar code with type ${type} and data ${JSON.stringify(
        qrData
      )} has been scanned!`
    );

    navigation.navigate("Vendor", {
      vendor: {
        eventVendorId: qrData.eventVendorId,
        vendorName: qrData.vendorName
      },
      eventId: qrData.eventId
    });
  };

  return (
    <Container>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFill}
      />

      {scanned && (
        <Button
          buttonStyle={{ backgroundColor: Colors.ORANGE, borderRadius: 20 }}
          title={"Tap to Scan Again."}
          onPress={() => setScanned(false)}
        />
      )}
    </Container>
  );
};

export default QRScan;
