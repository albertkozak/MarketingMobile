import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import EventItem from "./EventItem";
import Container from "../Container";
import Colors from "../../constants/Color";
import firebase from "../../firebase";

const EventList = ({ navigation, results }) => {
  // const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/Events";
  // const [fetchedData, setFetchedData] = useState([]);

  // const fetchData = () => {
  //   firebase
  //     .auth()
  //     .currentUser.getIdTokenResult()
  //     .then((tokenResponse) => {
  //       fetch(BASE_URL, {
  //         method: "GET",
  //         headers: {
  //           Accept: "application/json",
  //           Authorization: `Bearer ${tokenResponse.token}`,
  //         },
  //       })
  //         .then((response) => response.json())
  //         .then((responseData) => {
  //           setFetchedData(responseData.events);
  //         });
  //     });
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const showEventDetail = (event) => {
    navigation.navigate("Event", event);
  };

  return (
    <Container>
      <SafeAreaView style={styles.wrapper}>
        <Text style={styles.title}>Events</Text>
        <FlatList
          keyExtractor={(event) => event.eventId.toString()}
          data={results}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => showEventDetail(item)}>
                <EventItem event={item} />
              </TouchableOpacity>
            );
          }}
        />
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
