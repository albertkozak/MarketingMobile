import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { Button } from "react-native-elements";
import Container from "../Container";
import Colors from "../../constants/Color";
import firebase from "../../firebase";
import { Ionicons } from "@expo/vector-icons";

const Vendor = ({ route, navigation }) => {
  const { eventId } = route.params;
  const eventVendorId = route.params.vendor.eventVendorId;
  const vendorName = route.params.vendor.vendorName;

  const EVENT_PATH = eventId + "/Vendors/" + eventVendorId;

  const BASE_URL =
    "https://atackmarketingapi.azurewebsites.net/api/Events/" + EVENT_PATH;

  const [fetchedDetails, setVendorDetails] = useState([]);
  const [status, setStatus] = useState("Subscribe");

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
            setVendorDetails(responseData.vendor);
          });
      });
  };

  const handleButton = async (event) => {
    event.preventDefault();
    const eventId = eventId;
    const eventVendorId = eventVendorId;

    let statusValue;
    if (status === "Subscribe") {
      statusValue = "/subscribe";
    } else {
      statusValue = "/unsubscribe";
    }

    let JWToken = await await firebase.auth().currentUser.getIdTokenResult();
    if (JWToken !== null) {
      const result = await fetch(BASE_URL + statusValue, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${JWToken.token}`,
        },
        body: JSON.stringify({
          eventId: eventId,
          eventVendorId: eventVendorId,
        }),
      });
      console.log(BASE_URL);
      console.log(statusValue);
      console.log(result.status);
      if (result.status === 200) {
        if (status === "Subscribe") {
          setStatus("Unsubscribe");
        } else {
          setStatus("Subscribe");
        }
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const format = (amount) => {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };
  return (
    <Container>
      <SafeAreaView style={styles.wrapper}>
        {/* Update with dynamic info */}
        {/* <Text style={styles.title}>{eventName}</Text> */}
        <Text style={styles.vendor}>{vendorName}</Text>
        <Text style={styles.description}>{fetchedDetails.description}</Text>
        <View style={styles.website}>
          <Ionicons name="ios-globe" size={18} color={Colors.GREY} />
          <Text style={styles.websiteText}>{fetchedDetails.website}</Text>
        </View>
        <View style={styles.email}>
          <Ionicons name="ios-mail" size={18} color={Colors.GREY} />
          <Text style={styles.emailText}>{fetchedDetails.email}</Text>
        </View>
        <FlatList
          style={styles.list}
          data={fetchedDetails.products}
          keyExtractor={(product) => product.productId.toString()}
          renderItem={({ item }) => {
            return (
              <View style={styles.listItems}>
                <Text style={styles.listItem}>{item.productName}</Text>
                <Text style={styles.listItem2}>
                  {" $" + format(item.productPrice)}
                </Text>
              </View>
            );
          }}
        />
        <Button
          title={status}
          buttonStyle={{
            backgroundColor: Colors.ORANGE,
            width: 100,
            alignSelf: "center",
          }}
          style={styles.button}
          onPress={handleButton}
        />
      </SafeAreaView>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 0.8,
    justifyContent: "center",
    marginHorizontal: 25,
  },
  title: {
    color: Colors.GREY,
    marginBottom: 25,
    fontSize: 16,
    textAlign: "left",
  },
  vendor: {
    color: Colors.WHITE,
    fontSize: 24,
    marginBottom: 25,
  },
  description: {
    color: Colors.GREY,
    fontSize: 15,
    marginBottom: 15,
  },
  website: {
    display: "flex",
    flexDirection: "row",
  },
  websiteText: {
    color: Colors.GREY,
    fontSize: 15,
    marginLeft: 10,
    marginBottom: 15,
  },
  emailText: {
    color: Colors.GREY,
    fontSize: 15,
    marginLeft: 10,
    marginBottom: 25,
  },
  email: {
    display: "flex",
    flexDirection: "row",
  },
  list: {
    marginVertical: 10,
  },
  listItems: {
    marginHorizontal: 30,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listItem: {
    color: Colors.WHITE,
    textAlign: "left",
    paddingBottom: 12,
  },
  listItem2: {
    color: Colors.WHITE,
    textAlign: "right",
  },
  button: {},
});

export default Vendor;
