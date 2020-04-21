import * as React from "react";
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import Container from "../Container";
import Colors from "../../constants/Color";

const Event = ({ route, navigation }) => {
  const { eventName, eventStartDateTime, numOfVendors, venue } = route.params;

  const showVendorList = (vendorList) => {
    navigation.navigate("VendorList", vendorList);
  };

  return (
    <Container>
      <SafeAreaView style={styles.wrapper}>
        {/* Update with dynamic info */}
        <Text style={styles.eventTitle}>{eventName}</Text>
        <Text style={styles.eventDescription}>{venue.venueName}</Text>
        <Text style={styles.eventStart}>{eventStartDateTime}</Text>
        <Text style={styles.eventDescription}>{numOfVendors}</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Join"
            color={Colors.ORANGE}
            onPress={() => navigation.navigate("QRScan")}
          />
          <Button
            title="Vendors"
            color={Colors.ORANGE}
            onPress={() => showVendorList(eventName)}
          />
        </View>
      </SafeAreaView>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginHorizontal: 25,
    justifyContent: "center",
  },
  eventTitle: {
    color: Colors.WHITE,
    fontSize: 24,
    marginBottom: 25,
  },
  eventDescription: {
    color: Colors.GREY,
    marginBottom: 25,
    fontSize: 15,
  },
  eventStart: {
    color: Colors.WHITE,
    marginBottom: 25,
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default Event;
