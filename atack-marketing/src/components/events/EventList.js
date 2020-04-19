import * as React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import EventItem from "./EventItem";
import Event from "./Event";
import Container from "../Container";
import Colors from "../../constants/Color";

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
    <Container>
      <SafeAreaView style={styles.wrapper}>
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
        ></FlatList>
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
    textTransform: "uppercase",
    marginBottom: 25,
  },
});

export default EventList;
