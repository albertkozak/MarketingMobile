import * as React from "react";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import EventItem from "./EventItem";

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

export default EventList;
