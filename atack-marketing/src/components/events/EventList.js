import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import EventItem from "./EventItem";
import Event from "./Event";
import Container from "../Container";
import Colors from "../../constants/Color";
import firebase from "../../firebase";

const EventList = ({ navigation }) => {
  const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/Events";
  const dummyData = [
    {
      eventTitle: "Vancouver Tech Conferencee 2020",
      eventDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      eventStart: "August 1, 2020 at 1pm",
    },
  ];

  useEffect(() => {
    firebase
      .auth()
      .currentUser.getIdTokenResult()
      .then((tokenResponse) => {
        fetch(BASE_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenResponse.token}`,
          },
        })
          .then((response) => {
            response.json();
          })
          .then((responseJson) => {
            console.log(responseJson);
            console.log(tokenResponse.token);
          });
      });
  });

  const showEventDetail = (event) => {
    navigation.navigate("Event", event);
  };

  return (
    <Container>
      <SafeAreaView style={styles.wrapper}>
        <Text style={styles.title}>Events</Text>
        <FlatList
          keyExtractor={(event) => event.eventTitle}
          data={dummyData}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => showEventDetail(item)}>
                <EventItem event={item} />
              </TouchableOpacity>
            );
          }}
        ></FlatList>
      </SafeAreaView>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: Colors.WHITE,
    fontSize: 22,
    textTransform: "uppercase",
    marginBottom: 25,
  },
});

export default EventList;
