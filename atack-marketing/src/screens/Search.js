import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Button } from 'react-native-elements'
import { TouchableOpacity } from "react-native-gesture-handler";
import SearchBar from "../components/SearchBar";
import EventItem from "../components/events/EventItem";
import Container from "../components/Container";
import Colors from "../constants/Color";
import firebase from "../firebase";
import EventList from "../components/events/EventList";

const SearchScreen = ({ navigation }) => {
  const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/Events";
  const [term, setTerm] = useState("");
  const [events, setEvents] = useState([]);
  const [searchedEvents, setSearchedEvents] = useState([]);

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
          });
        setSearchedEvents(
          events.filter((event) => {
            return event.eventName.toLowerCase().includes(term.toLowerCase());
          })
        );
      });
  };

  useEffect(() => {
    searchAPI();
  }, []);

  let eventData;
  if (term.length === 0) {
    eventData = events;
  } else {
    eventData = searchedEvents;
  }

  return (
    <Container>
      <View style={styles.wrapper}>
        <SearchBar
          term={term}
          onTermChange={(newTerm) => setTerm(newTerm)}
          onTermSubmit={() => searchAPI()}
        />
        <EventList results={eventData} navigation={navigation} />
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
  }
});

export default SearchScreen;
