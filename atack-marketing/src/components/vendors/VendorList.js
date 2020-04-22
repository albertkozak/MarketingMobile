import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import VendorItem from './VendorItem'
import Container from '../Container'
import Colors from '../../constants/Color'
import firebase from "../../firebase";

const VendorList = ({ navigation, route }) => {
  const { eventId, eventName } = route.params;

  const EVENT_PATH = eventId + "/Vendors"

  const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/Events/" + EVENT_PATH

  const [fetchedVendors, setFetchedVendors] = useState([])

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
            setFetchedVendors(responseData.vendors);
            console.log(BASE_URL)
            console.log("fetched data")
            console.log(responseData.vendors)
            console.log("fetched vendors")
            console.log(fetchedVendors);
          });
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const dummyData = [
  //   {
  //     eventTitle: {eventName},
  //     vendorName: "Amazon",
  //     vendorDescription: "Cloud computing E-commerce Artificial intelligence Consumer electronics Digital distribution Grocery stores",
  //     marketMaterials: ["Coffee Mugs", "Mouse Pads", "Keychains"],
  //   },
  // ];

  const showVendorDetail = (vendor) => {
    navigation.navigate("Vendor", vendor);
  };

  return (
    <Container>
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.title}>Vendors</Text>
      {/* <Text style={styles.eventTitle}>{eventName}</Text> */}
      <FlatList
        keyExtractor={(vendor) => vendor.eventVendorId.toString()}
        data={fetchedVendors}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => showVendorDetail(item)}>
              <VendorItem vendor={item} />
            </TouchableOpacity>
          );
        }}
      >
      </FlatList>

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
    textTransform: 'uppercase',
    marginBottom: 25
  }
})

export default VendorList;
