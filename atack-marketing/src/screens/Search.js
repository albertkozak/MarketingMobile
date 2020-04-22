import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import SearchBar from "../components/SearchBar";
import EventItem from "../components/events/EventItem";
import Container from "../components/Container";
import Colors from "../constants/Color";
import firebase from "../firebase";

const SearchScreen = ({ navigation }) => {
  const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/Events";
  const [term, setTerm] = useState("");
  const [events, setEvents] = useState([]);

  const searchAPI = () => {
    firebase
      .auth()
      .currentUser.getIdTokenResult()
      .then((tokenResponse) => {
        fetch(BASE_URL, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${tokenResponse.token}`,
          },
        })
          .then((response) => response.json())
          .then((responseData) => {
            setEvents(responseData.events);
            console.log(events);
          });
      });
  };

  useEffect(() => {
    searchAPI();
  }, []);

  const showEventDetail = (event) => {
    navigation.navigate("Event", event);
  };

  return (
    <Container>
      <View style={styles.wrapper}>
        <SearchBar
          term={term}
          onTermChange={(newTerm) => setTerm(newTerm)}
          onTermSubmit={() => searchAPI()}
        />
        <FlatList
          style={styles.list}
          keyExtractor={(event) => event.eventId.toString()}
          data={events}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => showEventDetail(item)}>
                <EventItem event={item} />
              </TouchableOpacity>
            );
          }}
        ></FlatList>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  title: {
    color: Colors.WHITE,
    fontSize: 22,
    marginBottom: 25,
  },
  list: {
    marginTop: 50,
  },
});

export default SearchScreen;
