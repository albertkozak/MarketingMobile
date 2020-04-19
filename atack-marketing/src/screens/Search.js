import * as React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { SearchBar } from "../components/SearchBar";
import Container from "../components/Container";

const SearchScreen = ({ navigation }) => {
  return (
    <Container>
      <View style={styles.wrapper}>
        {/* <SearchBar /> */}
        <Text>Search Screen</Text>
        <Button
          title="Go to Events"
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
});

export default SearchScreen;
