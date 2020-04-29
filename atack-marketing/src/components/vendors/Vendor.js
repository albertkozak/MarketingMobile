import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView} from "react-native";
import { Button } from 'react-native-elements'
import Container from '../Container'
import Colors from '../../constants/Color'
import firebase from "../../firebase";
import { Ionicons} from "@expo/vector-icons";

const Vendor = ({ route, navigation }) => {
  const { eventId } = route.params;
  const eventVendorId = route.params.vendor.eventVendorId
  const vendorName = route.params.vendor.vendorName

  const EVENT_PATH = eventId + "/Vendors/" + eventVendorId

  const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/Events/" + EVENT_PATH

  const [fetchedDetails, setVendorDetails] = useState([])

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

  useEffect(() => {
    fetchData();
  }, []);

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
          keyExtractor={product => product.productId}
          renderItem={({item}) => {
            return <Text style={styles.listItem}>{item.productName}</Text>
          }}
      />
      <Button 
        title="Subscribe"
        buttonStyle={{
          backgroundColor: Colors.ORANGE,
        }}
        style={styles.button}
      />
    </SafeAreaView>
    </Container>
  );
}

const styles = StyleSheet.create({
  wrapper: {
   flex: .8, 
   justifyContent: "center",
   marginHorizontal: 25

  },
  title: {
    color: Colors.GREY,
    marginBottom: 25,
    fontSize: 16,
    textAlign: 'left'
  },
  vendor: {
    color: Colors.WHITE,
    fontSize: 24,
    marginBottom: 25
  },
  description: {
    color: Colors.GREY,
    fontSize: 15,
    marginBottom: 15
  },
  website: {
    display: 'flex',
    flexDirection: 'row',
  },
  websiteText:{
    color: Colors.GREY,
    fontSize: 15,
    marginLeft: 10,
    marginBottom: 15
  },
  emailText:{
    color: Colors.GREY,
    fontSize: 15,
    marginLeft: 10,
    marginBottom: 25
  },
  email: {
    display: 'flex',
    flexDirection: 'row',
  },
  list: {
   marginVertical: 10 
  },
  listItem:{
    color: Colors.WHITE,
    textAlign: 'left',
    paddingBottom: 10,
    marginLeft: 25
  },
  button: {
  }
})

export default Vendor;
