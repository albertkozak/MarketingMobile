import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Swiper from "react-native-swiper";
import EventItem from "../components/events/EventItem";
import Container from "../components/Container";
import Colors from "../constants/Color";
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
    <Swiper
      showsPagination={false}
      style={styles.wrapper}
      showsButtons
      loop={true}
      autoplay={true}
    >
      <View testID="Microsoft" style={styles.slide1}>
        <Image source={require("../../assets/img/1.jpg")} />
        <Text style={styles.text}>Microsoft</Text>
      </View>
      <View testID="BCIT" style={styles.slide2}>
        <Image source={require("../../assets/img/2.jpg")} />
        <Text style={styles.text}>BCIT</Text>
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  text: {
    position: "absolute",
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default Home;
