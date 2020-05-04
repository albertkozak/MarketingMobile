import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, FlatList } from "react-native";
import SearchBar from "../components/SearchBar";
import Container from "../components/Container";
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
      <SearchBar
        term={term}
        onTermChange={(newTerm) => setTerm(newTerm)}
        onTermSubmit={() => searchAPI()}
      />
      <SafeAreaView style={styles.wrapper}>
        <EventList results={eventData} navigation={navigation} />
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
});

export default SearchScreen;
