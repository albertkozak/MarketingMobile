import * as React from "react";
import { View, Text, Button, FlatList} from "react-native";

const Vendor = ({ props }) => {
  return (
    <View style={styles.container}>
      {/* Update with dynamic info */}
      <Text stlye={styles.eventTitle}>Vancouver Tech Conference 2020</Text>
      <Text>Amazon</Text>
      <FlatList style={styles.list}>
        <Text style={styles.listItem}>Coffee Mugs</Text>
        <Text style={styles.listItem}>Mouse Pads</Text>
        <Text style={styles.listItem}>Keychain</Text>
      </FlatList>
      <Button title="Subscribe" />
    </View>
  );
}

const styles = StyleSheet.create({
   flex: 1, 
   alignItems: "center", 
   justifyContent: "center" 
})

export default Vendor;
