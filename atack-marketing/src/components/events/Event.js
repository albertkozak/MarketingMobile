// import * as React from "react";
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import Container from "../Container";
import Colors from "../../constants/Color";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const Event = ({ route, navigation }) => {
  const { event } = route.params;

  const showdetails = () => {
    console.log(route)
    console.log(route.params)
  }

  useEffect(() => {
    showdetails();
  }, []);

  return (
    <Container>
      <SafeAreaView style={styles.wrapper}>
        {/* Update with dynamic info */}
        <Text style={styles.eventTitle}>{event.eventName}</Text>
        <View style={styles.location}>
          <MaterialIcons name="location-on" size={18} color={Colors.GREY} />
          <Text style={styles.eventVenue}>{event.venue.venueName}</Text>
        </View>
        <View style={styles.start}>
          <Ionicons name="ios-time" size={18} color={Colors.GREY} />
          <Text style={styles.eventStart}>{event.eventStartDateTime}</Text>
        </View>
        <Text style={styles.eventVendors}>Vendors: {event.numOfVendors}</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Join"
            color={Colors.ORANGE}
            onPress={() => navigation.navigate("QRScan")}
          />
          <Button
            title="Vendors"
            color={Colors.ORANGE}
            onPress={() => navigation.navigate("VendorList", { eventId }, { eventName })}
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
  location: {
    display: 'flex',
    flexDirection: 'row',
  },
  start: {
    display: 'flex',
    flexDirection: 'row'
  },
  eventVenue: {
    color: Colors.WHITE,
    marginBottom: 25,
    fontSize: 18,
    marginLeft: 10
  },
  eventVendors: {
    color: Colors.GREY,
    marginBottom: 25,
    fontSize: 15,
  },
  eventStart: {
    color: Colors.WHITE,
    marginBottom: 25,
    fontSize: 15,
    marginLeft: 10
  },
  buttonContainer: {
    alignSelf: 'center',
    flexDirection: "row",
    justifyContent: "space-around",
    width: '60%',
    marginTop: 20,
  },
});

export default Event;
