import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Colors from "../../constants/Color";
import SubscriptionItem from "./SubscriptionItem";

const SubscriptionList = ({ navigation, results }) => {
  const subscriptions = results;

  const showSubsDetail = (event) => {
    navigation.navigate("Event", {
      screen: "Event",
      params: { event: event },
    });
  };

  return (
    <FlatList
      keyExtractor={(event) => event.eventId.toString()}
      data={subscriptions}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity onPress={() => showSubsDetail(item)}>
            <SubscriptionItem event={item} />
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

export default SubscriptionList;
