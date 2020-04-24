import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
// import Swiper from "react-native-swiper";
import EventItem from "../components/events/EventItem";
import Container from "../components/Container";
import Colors from "../constants/Color";
import firebase from "../firebase";
import EventList from "../components/events/EventList";

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
      <View style={styles.wrapper}>
        <Text style={styles.title}>Upcoming Events</Text>
        <EventList results={fetchedData} navigation={navigation} />
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
  // slide1: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // slide2: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  title: {
    color: Colors.WHITE,
    fontSize: 22,
    textTransform: "uppercase",
    marginBottom: 25,
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
