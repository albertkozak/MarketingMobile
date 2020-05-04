import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Image, Dimensions } from "react-native";
import Constants from "expo-constants";
import EventList from "../components/events/EventList";
import firebase from "../firebase";
import Colors from "../constants/Color";
import Container from "../components/Container";

const Home = ({ navigation }) => {
  const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/Events";
  const [fetchedData, setFetchedData] = useState([]);

  const fetchData = () => {
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
            setFetchedData(responseData.events);
            console.log(fetchedData);
          });
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Image
        style={styles.banner}
        source={require("../../assets/events-banner.png")}
      />
      <SafeAreaView style={styles.container}>
        <EventList results={fetchedData} navigation={navigation} />
      </SafeAreaView>
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    color: Colors.WHITE,
    fontSize: 22,
    textTransform: "uppercase",
    marginBottom: 25,
  },
  banner: {
    width: Dimensions.get("window").width,
    height: 225,
    marginBottom: 25,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
