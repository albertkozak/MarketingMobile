import * as React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import EventItem from "./EventItem";
import Event from "./Event";

const EventList = ({ navigation }) => {
  const dummyData = [
    {
      eventTitle: "Vancouver Tech Conferencee 2020",
    },
  ];

  const showEventDetail = (event) => {
    navigation.navigate("Event", event);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Events</Text>
      <FlatList
        keyExtractor={(event) => event.eventTitle}
        data={dummyData}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => showEventDetail(item)}>
              <EventItem event={item} />
            </TouchableOpacity>
          );
        }}
      >
        <Event />
      </FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default EventList;
