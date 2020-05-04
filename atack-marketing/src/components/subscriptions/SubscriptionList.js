import * as React from "react";
import { StyleSheet, FlatList } from "react-native";
import Colors from "../../constants/Color";
import SubscriptionItem from "./SubscriptionItem";

const SubscriptionList = ({ navigation, results }) => {
  const subscriptions = results;

  return (
    <FlatList
      keyExtractor={(subscription) =>
        subscription.eventSubscriptions.eventVendorId.toString()
      }
      data={subscriptions}
      renderItem={({ item }) => {
        <SubscriptionItem subscription={item} />;
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
