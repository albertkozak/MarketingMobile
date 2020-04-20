import * as React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { SearchBar } from "../components/SearchBar";
import Container from "../components/Container";
import Colors from "../constants/Color";

const SearchScreen = ({ navigation }) => {
  return (
    <Container>
      <View style={styles.wrapper}>
        {/* <SearchBar /> */}
        <Text style={styles.title}>Search Screen</Text>
        <Button
          title="Go to Events"
          color={Colors.ORANGE}
          onPress={() => navigation.navigate("EventList")}
        />
      </View>
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
    marginBottom: 25,
  },
});

export default SearchScreen;
