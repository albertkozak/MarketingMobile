import * as React from "react";
import { Text, StyleSheet, FlatList } from "react-native";
import Colors from "../../constants/Color";

export default function SubscriptionVendors(props) {
  return (
    <FlatList
      pagingEnabled={true}
      data={props.event.eventSubscriptions}
      keyExtractor={item => item.eventVendorId.toString()}
      renderItem={({ item }) => {
        return <Text style={styles.vendorText}>{item.vendorName}</Text>;
      }}
    />
  );
}

const styles = StyleSheet.create({
  vendorText: {
    color: Colors.WHITE,
    fontSize: 15,
    marginLeft: 20,
    paddingBottom: 5
  }
});
