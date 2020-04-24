// import React, { useEffect, useState } from "react";
import * as React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import EventItem from "./EventItem";
import Container from "../Container";
import Colors from "../../constants/Color";
import firebase from "../../firebase";

const EventList = ({ navigation, results }) => {
  const events = results

  const showEventDetail = (event) => {
    // navigation.push("Event", event);
    navigation.navigate('Event', {
      screen: 'Event',
      params: { event: event },
    });
    console.log("the event passed:")
    console.log(event)
  };

  return (
    <FlatList
      keyExtractor={(event) => event.eventId.toString()}
      data={events}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity onPress={() => showEventDetail(item)}>
            {/* <TouchableOpacity
            onPress={() =>
              navigation.navigate("Event", {
                event: (item),
                eventId: (item.eventId)
              })
            }
          > */}
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
