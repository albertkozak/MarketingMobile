import React, {useState, useEffect}from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Button } from 'react-native-elements'
import Container from "../Container";
import Colors from "../../constants/Color";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import moment from 'moment';

const Event = ({ route, navigation }) => {
  const { event } = route.params;
  const eventId = event.eventId
  const eventName = event.eventName
  const date = new Date(event.eventStartDateTime)
  const eventDate = moment(event.eventStartDateTime).format('MMM DD, YYYY, h:mm a');
  // update to local time after video demo
  const today = new Date();
  const todayFormatted = moment(today).format('MMM DD, YYYY, h:mm a');
  const [joinActive, setJoinActive] = useState(true)
  const [vendorsActive, setVendorsActive] = useState(true)

  function isEventAvailable() {
    let joinValue;
    let vendorValue;
    let fromToday = Math.floor((today.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
    
    if (fromToday > 0 ){
      joinValue = true;
      vendorValue = false;
    } else if (fromToday == 0 ) {
      joinValue = false;
      vendorValue = false;
    } else {
      joinValue = true;
      vendorValue = true
    }
    setJoinActive(joinValue)
    setVendorsActive(vendorValue)
  }
  
  useEffect(() => {
    isEventAvailable();
  }, []);

  return (
    <Container>
      <SafeAreaView style={styles.wrapper}>
        {/* Update with dynamic info */}
        <Text style={styles.eventTitle}>{event.eventName}</Text>
        <View style={styles.location}>
          <MaterialIcons name="location-on" size={18} color={Colors.GREY} />
          <Text style={styles.eventVenue}>{event.venue.venueName}</Text>
        </View>
        <View style={styles.start}>
          <Ionicons name="ios-time" size={18} color={Colors.GREY} />
          <Text style={styles.eventStart}>{eventDate}</Text>
        </View>
        <Text style={styles.eventVendors}>Vendors: {event.numOfVendors}</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Join"
            disabled={joinActive}
            color={Colors.ORANGE}
            buttonStyle={{
              backgroundColor: Colors.ORANGE,
              width: 90,
              marginRight: 50,
            }}
            onPress={() => navigation.navigate("QRScan")}
          />
          <Button
            title="Vendors"
            // NEED TO UNCOMMENT 
            disabled={vendorsActive}
            color={Colors.ORANGE}
            buttonStyle={{
              backgroundColor: Colors.ORANGE,
              width: 90,
            }}
            onPress={() => navigation.navigate("VendorList", { eventId }, { eventName })}
          />
        </View>
      </SafeAreaView>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginHorizontal: 25,
    justifyContent: "center",
  },
  eventTitle: {
    color: Colors.WHITE,
    fontSize: 24,
    marginBottom: 25,
  },
  location: {
    display: 'flex',
    flexDirection: 'row',
  },
  start: {
    display: 'flex',
    flexDirection: 'row'
  },
  eventVenue: {
    color: Colors.WHITE,
    marginBottom: 25,
    fontSize: 18,
    marginLeft: 10
  },
  eventVendors: {
    color: Colors.GREY,
    marginBottom: 25,
    fontSize: 15,
  },
  eventStart: {
    color: Colors.WHITE,
    marginBottom: 25,
    fontSize: 15,
    marginLeft: 10
  },
  buttonContainer: {
    alignSelf: 'center',
    flexDirection: "row",
    justifyContent: "space-around",
    width: '60%',
    marginTop: 20,
  },
});

export default Event;
