import * as React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import Colors from "../../constants/Color";
import SubscriptionItem from "./SubscriptionItem";

const SubscriptionList = ({ navigation, results }) => {
  const subscriptions = results;
  const [eventSubscriptions, setEventSubscriptions] = React.useState([]);

  return (
    <View>
      {console.log(subscriptions)}
      {/* {subscriptions.keys(Object.eventId.toString()).map((key) => (
        <Text key={key}>{Object.eventId[key]}</Text>
      ))} */}
      {/* <FlatList
        keyExtractor={(subscription) => subscription.eventId.toString()}
        data={subscriptions}
        renderItem={({ item }) => {
          item
            .keys(item.eventSubscriptions.eventVendorId)
            .map((key) => <SubscriptionItem subscription={key} />);
          // return <SubscriptionItem subscription={item} />;
        }}
      /> */}
    </View>
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
