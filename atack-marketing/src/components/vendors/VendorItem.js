import * as React from "react";
import { View, Text, Button, FlatList, StyleSheet, SafeAreaView, Dimensions} from "react-native";
import Colors from '../../constants/Color'

const VendorItem = ({ vendor }) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      {/* Update with dynamic info */}
  <Text style={styles.text}>{vendor.vendorName}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    wrapper: {
    },
    text: {
      color: Colors.WHITE,
      fontSize: 16,
      borderBottomColor: Colors.GREY,
      borderBottomWidth: 1,
      paddingBottom: 10,
      // width: Dimensions.get('window').width,
      // textAlign: 'center'
    }
  })

export default VendorItem;