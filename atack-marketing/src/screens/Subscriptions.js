import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import Container from "../components/Container";
import Colors from "../constants/Color";
import firebase from "../firebase";
import SubscriptionList from "../components/subscriptions/SubscriptionList";

const Subscriptions = ({ navigation }) => {
  const BASE_URL =
    "https://atackmarketingapi.azurewebsites.net/api/User/subscriptionlist";
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
            setFetchedData(responseData.subscriptions);
            console.log(fetchedData);
            console.log(responseData.subscriptions);
          });
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <View style={styles.wrapper}>
        {/* <Text style={styles.title}>Subscriptions</Text> -> Replaced with banner */}
        <Image
          style={styles.banner}
          source={require("../../assets/subscriptions-banner.png")}
        />
        <SubscriptionList results={fetchedData} navigation={navigation} />
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
    textTransform: "uppercase",
    marginBottom: 25,
  },
  banner: {
    width: Dimensions.get("window").width,
    height: 225,
    marginBottom: 25,
  },
});

export default Subscriptions;
