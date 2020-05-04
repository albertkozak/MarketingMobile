import * as React from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
import Colors from "../../constants/Color";
import moment from "moment";

const EventItemHome = ({ event }) => {
  const eventDate = moment(event.eventStartDateTime).format(
    "MMM DD, YYYY, h:mm a"
  );
  // update to local time after video demo
  return (
    <SafeAreaView style={styles.wrapper}>
      {/* Update with dynamic info */}
      <Text style={styles.text}>{event.eventName}</Text>
      <Text style={styles.text}>{eventDate}</Text>
    </SafeAreaView>
  );
};

// Border Bottom does NOT work in iOS at this time. Pending further review...
const styles = StyleSheet.create({
  wrapper: {},
  text: {
    color: Colors.WHITE,
    fontSize: 16,
    borderColor: "transparent",
    borderBottomColor: Colors.GREY,
    borderWidth: 1,
    paddingVertical: 15,
    textAlign: "center",
    width: Dimensions.get("window").width * 0.75,
  },
});

export default EventItemHome;
