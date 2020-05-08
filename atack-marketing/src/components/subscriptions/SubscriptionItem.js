import * as React from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  FlatList,
} from "react-native";
import Colors from "../../constants/Color";

const SubscriptionItem = ({ event }) => {
  console.log(event.eventSubscriptions[0]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.text}>{event.eventName}</Text>
      <FlatList
        pagingEnabled={true}
        data={event.eventSubscriptions}
        //listKey={(item, index) => 'D' + index.toString()}
        keyExtractor={(item, index) => item.key}
        renderItem={({ item }) => {
          return <Text style={styles.vendorText}>{item.vendorName}</Text>;
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  text: {
    color: Colors.GREY,
    fontSize: 14,
    paddingVertical: 15,
    width: Dimensions.get("window").width * 0.75,
    marginTop: 10,
  },
  vendorText: {
    color: Colors.WHITE,
    fontSize: 15,
    marginLeft: 20,
    paddingBottom: 5,
  },
});

export default SubscriptionItem;
