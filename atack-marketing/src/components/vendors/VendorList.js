import * as React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Vendor from './Vendor'
import { TouchableOpacity } from "react-native-gesture-handler";
import VendorItem from './VendorItem'

const VendorList = ({ navigation }) => {
  const dummyData = [
    {eventTitle: "Vancouver Tech Conferencee 2020", vendorName: "Amazon", marketMaterials: ['Coffee Mugs', 'Mouse Pads', 'Keychains']}
  ]

  const showVendorDetail = (vendor) => {
    navigation.navigate('Vendor', vendor)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vendors</Text>
      <FlatList 
        keyExtractor={vendor => vendor.vendorName}
        data={dummyData}
        renderItem={({item}) => {
          return <TouchableOpacity onPress={() => showVendorDetail(item)}>
            <VendorItem vendor={item} />
          </TouchableOpacity>
        }}
      >
        <Vendor />
      </FlatList>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1, 
   alignItems: "center", 
   justifyContent: "center" 
  }
})

export default VendorList;
