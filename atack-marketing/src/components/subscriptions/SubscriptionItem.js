import * as React from "react";
import { Text, StyleSheet, SafeAreaView, Dimensions,FlatList } from "react-native";
import Colors from "../../constants/Color";

const SubscriptionItem = ({ event }) => {
  console.log(event.eventSubscriptions[0]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.text}>{event.eventName}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        data={event.eventSubscriptions}
        //listKey={(item, index) => 'D' + index.toString()}
        keyExtractor={(item, index) => item.key}
        renderItem={({ item }) => {
          return (
            <Text style={styles.vendorText} >{item.vendorName}</Text>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  text: {
    color: Colors.WHITE,
    fontSize: 18,
    paddingVertical: 15,
    textAlign: "center",
    width: Dimensions.get("window").width * 0.75,
  },
  vendorText:{
    color: Colors.WHITE,
    fontSize: 10,
    marginRight:10,
    

  }
});

export default SubscriptionItem;
