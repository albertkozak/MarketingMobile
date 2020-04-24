import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
// import Swiper from "react-native-swiper";
import EventItem from "../components/events/EventItem";
import Container from "../components/Container";
// import Colors from "../constants/Color";
import firebase from "../firebase";

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

  const showEventDetail = (event) => {
    navigation.navigate("Event", event);
  };

  return (
    <Container>
      <Text style={styles.text}>Upcoming Events</Text>
      <FlatList
        keyExtractor={(event) => event.eventId.toString()}
        data={fetchedData}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => showEventDetail(item)}>
              <EventItem event={item} />
            </TouchableOpacity>
          );
        }}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 20,
    marginBottom: 30,
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default Home;

//Swiper Code for potential use:
// <Swiper
//   showsPagination={false}
//   style={styles.wrapper}
//   showsButtons
//   loop={true}
//   autoplay={true}
// >
//   <View testID="Microsoft" style={styles.slide1}>
//     <Image source={require("../../assets/img/1.jpg")} />
//     <Text style={styles.text}>Microsoft</Text>
//   </View>
//   <View testID="BCIT" style={styles.slide2}>
//     <Image source={require("../../assets/img/2.jpg")} />
//     <Text style={styles.text}>BCIT</Text>
//   </View>
// </Swiper>
