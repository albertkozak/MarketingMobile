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
  const eventDate = moment(event.eventStartDateTime).format("MMMM D");
  // update to local time after video demo
  return (
    <SafeAreaView style={styles.wrapper}>
      {/* Update with dynamic info */}
      <Text style={styles.event}>{event.eventName}</Text>
      <Text style={styles.date}>{eventDate}</Text>
    </SafeAreaView>
  );
};

// Border Bottom does NOT work in iOS at this time. Pending further review...
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  event: {
    color: Colors.WHITE,
    fontSize: 15,
    paddingBottom: 15,
    textAlign: "left",
    maxWidth: "60%",
    paddingBottom: 20,
    // borderColor: "transparent",
    // borderBottomColor: Colors.GREY,
    // borderWidth: 1,
    // width: Dimensions.get("window").width * 0.75,
  },
  date: {
    color: Colors.GREY,
    textAlign: "right",
    fontSize: 13,
  },
});

export default EventItemHome;
