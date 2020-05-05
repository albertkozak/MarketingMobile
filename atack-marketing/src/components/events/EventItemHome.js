import * as React from "react";
import { Text, StyleSheet, SafeAreaView } from "react-native";
import Colors from "../../constants/Color";
import moment from "moment";

const EventItemHome = ({ event }) => {
  const eventDate = moment(event.eventStartDateTime).format("l");
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.event}>{event.eventName}</Text>
      <Text style={styles.date}>{eventDate}</Text>
    </SafeAreaView>
  );
};

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
    textAlign: "left",
    maxWidth: "60%",
    paddingBottom: 20,
    paddingRight: 10,
  },
  date: {
    color: Colors.GREY,
    textAlign: "right",
    fontSize: 13,
  },
});

export default EventItemHome;
