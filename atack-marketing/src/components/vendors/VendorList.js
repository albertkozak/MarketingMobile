import * as React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import Vendor from './Vendor'
import { TouchableOpacity } from "react-native-gesture-handler";
import VendorItem from './VendorItem'
import Container from '../Container'
import Colors from '../../constants/Color'

const VendorList = ({ navigation, route }) => {
  const { eventTitle } = route.params;
  const dummyData = [
    {
      eventTitle: "Vancouver Tech Conferencee 2020",
      vendorName: "Amazon",
      vendorDescription: "Cloud computing E-commerce Artificial intelligence Consumer electronics Digital distribution Grocery stores",
      marketMaterials: ["Coffee Mugs", "Mouse Pads", "Keychains"],
    },
  ];

  const showVendorDetail = (vendor) => {
    navigation.navigate("Vendor", vendor);
  };

  return (
    <Container>
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.title}>Vendors</Text>
      <FlatList
        keyExtractor={(vendor) => vendor.vendorName}
        data={dummyData}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => showVendorDetail(item)}>
              <VendorItem vendor={item} />
            </TouchableOpacity>
          );
        }}
      >
      </FlatList>

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
    textTransform: 'uppercase',
    marginBottom: 25
  }
})

export default VendorList;
