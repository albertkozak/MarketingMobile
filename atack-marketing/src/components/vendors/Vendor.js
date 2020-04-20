import * as React from "react";
import { View, Text, Button, FlatList, StyleSheet, SafeAreaView} from "react-native";
import Container from '../Container'
import Colors from '../../constants/Color'

const Vendor = ({ route }) => {
  const { eventTitle, vendorName, marketMaterials } = route.params 
  return (
    <Container>
    <SafeAreaView style={styles.wrapper}>
      {/* Update with dynamic info */}
      <Text style={styles.title}>{eventTitle}</Text>
      <Text style={styles.vendor}>{vendorName}</Text>
      <FlatList>
          data={marketMaterials}
          keyExtractor={item => item}
          renderItem{({item}) => {
            return <Text style={styles.listItem}>{item}</Text>
          }}
      </FlatList>
      <Button 
        title="Subscribe"
        color={Colors.ORANGE}
      />
    </SafeAreaView>
    </Container>
  );
}

const styles = StyleSheet.create({
  wrapper: {
   flex: .75, 
   justifyContent: "center",
   marginHorizontal: 25

  },
  title: {
    color: Colors.WHITE,
    marginBottom: 25,
    fontSize: 16,
    textAlign: 'left'
  },
  vendor: {
    color: Colors.WHITE,
    fontSize: 24
  }
})

export default Vendor;
