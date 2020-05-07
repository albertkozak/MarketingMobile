import React, { useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Container from "../components/Container";
import { Button } from "react-native-elements";
import Colors from "../constants/Color";

import firebase from "../firebase";

const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/";

const QRScan = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    let qrData = JSON.parse(data);
    // console.log("QRDATA: " + JSON.stringify(qrData));

    await firebase
      .auth()
      .currentUser.getIdTokenResult()
      .then(tokenResponse => {
        fetch(BASE_URL + "User/eventlist", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${tokenResponse.token}`
          }
        })
          .then(response => response.json())
          .then(responseData => {
            if (validateEventScan(responseData.eventsJoined, qrData.eventId)) {
              navigation.navigate("Vendor", {
                vendor: {
                  eventVendorId: qrData.eventVendorId,
                  vendorName: qrData.vendorName
                },
                eventId: qrData.eventId
              });
            } else {
              alert("You Must Join This Event Before Scanning Vendor QR Codes");
            }
          });
      });
  };

  function validateEventScan(apiResult, eventId) {
    for (let i = 0; i < apiResult.length; i++) {
      if (apiResult[i].eventId === eventId) {
        return true;
      }
    }

    return false;
  }

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
