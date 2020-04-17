import * as React from "react";
import { View, Text, Button, FlatList, StyleSheet} from "react-native";

const Vendor = ({ route }) => {
  const { eventTitle, vendorName, marketMaterials } = route.params 
  return (
    <View style={styles.container}>
      {/* Update with dynamic info */}
  <Text stlye={styles.eventTitle}>{eventTitle}</Text>
  <Text>{vendorName}</Text>
      <FlatList>
          data={marketMaterials}
          keyExtractor={item => item}
          renderItem{({item}) => {
            return <Text style={styles.listItem}>{item}</Text>
          }}
      </FlatList>
      <Button title="Subscribe" />
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

export default Vendor;
