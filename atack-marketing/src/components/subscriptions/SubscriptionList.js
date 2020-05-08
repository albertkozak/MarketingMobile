import * as React from "react";
import { StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Colors from "../../constants/Color";
import SubscriptionItem from "./SubscriptionItem";
import SubscriptionVendors from "./SubscriptionVendors";

const SubscriptionList = ({ navigation, results }) => {
  const subscriptions = results;

  const showSubsDetail = event => {
    navigation.navigate("Event", {
      screen: "Event",
      params: { event: event }
    });
  };

  return (
    <FlatList
      scrollEnabled
      keyExtractor={event => event.eventId.toString()}
      data={subscriptions}
      renderItem={({ item }) => {
        return (
          <>
            <TouchableOpacity onPress={() => showSubsDetail(item)}>
              <SubscriptionItem showEventDetail={showSubsDetail} event={item} />
            </TouchableOpacity>
            <SubscriptionVendors event={item} />
          </>
        );
      }}
    />
  );
};

export default SubscriptionList;
