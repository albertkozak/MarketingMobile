import * as React from "react";
import { StyleSheet, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import EventItem from "./EventItem";
import Colors from "../../constants/Color";

const EventList = ({ navigation, results }) => {
  const events = results;

  const showEventDetail = (event) => {
    navigation.navigate("Event", {
      screen: "Event",
      params: { event: event },
    });
  };

  return (
    <FlatList
      keyExtractor={(event) => event.eventId.toString()}
      data={events}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity onPress={() => showEventDetail(item)}>
            <EventItem event={item} />
          </TouchableOpacity>
        );
      }}
    />
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
    textTransform: "uppercase",
    marginBottom: 25,
  },
});

export default EventList;
