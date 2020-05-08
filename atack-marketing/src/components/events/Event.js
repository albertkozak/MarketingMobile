import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Button } from "react-native-elements";
import Container from "../Container";
import Colors from "../../constants/Color";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import firebase from "../../firebase";

const Event = ({ route, navigation }) => {
  const { event } = route.params;
  const eventId = event.eventId;
  const eventName = event.eventName;
  const date = new Date(event.eventStartDateTime);
  const eventDate = moment(event.eventStartDateTime).format("LLLL");
  const today = new Date();
  const [joinActive, setJoinActive] = useState(true);
  const [vendorsActive, setVendorsActive] = useState(true);

  const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/";
  const EVENT_URL = BASE_URL + "Events/" + eventId + "/";
  const [status, setStatus] = useState("Join");

  function isEventAvailable() {
    let joinValue;
    let vendorValue;
    let fromToday = Math.floor(
      (today.getTime() - date.getTime()) / 1000 / 60 / 60 / 24
    );

    if (fromToday >= 0) {
      joinValue = false;
      vendorValue = false;
    } else {
      joinValue = true;
      vendorValue = true;
    }
    setJoinActive(joinValue);
    setVendorsActive(vendorValue);
  }

  const handleButton = async (event) => {
    event.preventDefault();
    const eventId = eventId;

    let statusValue;
    if (status === "Join") {
      statusValue = "join";
    } else {
      statusValue = "leave";
    }

    let JWToken = await firebase.auth().currentUser.getIdTokenResult();
    if (JWToken !== null) {
      const result = await fetch(EVENT_URL + statusValue, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${JWToken.token}`,
        },
        body: JSON.stringify({
          eventId: eventId,
        }),
      });
      if (result.status === 200) {
        if (status === "Join") {
          setStatus("Leave");
          navigation.navigate("QRScan");
        } else {
          setStatus("Join");
          navigation.navigate("Home");
        }
      } else if (result.status === 400) {
        alert("You've already joined this event.");
        setStatus("Leave");
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  async function checkUserJoined() {
    await firebase
      .auth()
      .currentUser.getIdTokenResult()
      .then((tokenResponse) => {
        fetch(BASE_URL + "User/eventlist", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${tokenResponse.token}`,
          },
        })
          .then((response) => response.json())
          .then((responseData) => {
            if (hasUserJoinedEvent(responseData.eventsJoined)) {
              setStatus("Leave");
            }
          });
      });
  }

  function hasUserJoinedEvent(apiResult) {
    for (let i = 0; i < apiResult.length; i++) {
      if (apiResult[i].eventId === eventId) {
        return true;
      }
    }

    return false;
  }

  useEffect(() => {
    isEventAvailable();
    checkUserJoined();
  }, []);

  return (
    <Container>
      <SafeAreaView style={styles.wrapper}>
        <Text style={styles.eventTitle}>{event.eventName}</Text>
        <View style={styles.location}>
          <MaterialIcons name="location-on" size={18} color={Colors.GREY} />
          <Text style={styles.eventVenue}>{event.venue.venueName}</Text>
        </View>
        <View style={styles.start}>
          <Ionicons name="ios-time" size={18} color={Colors.GREY} />
          <Text style={styles.eventStart}>{eventDate}</Text>
        </View>
        {/* <Text style={styles.eventVendors}>Vendors: {event.numOfVendors}</Text> */}
        <View style={styles.buttonContainer}>
          <Button
            title={status}
            disabled={joinActive}
            color={Colors.ORANGE}
            buttonStyle={{
              backgroundColor: Colors.ORANGE,
              width: 90,
              marginRight: 50,
            }}
            onPress={handleButton}
          />
          <Button
            title="Vendors"
            disabled={vendorsActive}
            color={Colors.ORANGE}
            buttonStyle={{
              backgroundColor: Colors.ORANGE,
              width: 90,
            }}
            onPress={() =>
              navigation.navigate("VendorList", { eventId }, { eventName })
            }
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
    marginTop: 100,
  },
  eventTitle: {
    color: Colors.WHITE,
    fontSize: 24,
    marginBottom: 25,
  },
  location: {
    display: "flex",
    flexDirection: "row",
  },
  start: {
    display: "flex",
    flexDirection: "row",
  },
  eventVenue: {
    color: Colors.WHITE,
    marginBottom: 25,
    fontSize: 18,
    marginLeft: 10,
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
    marginLeft: 10,
  },
  buttonContainer: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
    marginTop: 20,
  },
});

export default Event;
