import * as React from "react";
import { View, Text, Button } from "react-native";
import { SearchBar } from "../components/SearchBar";
import Container from "../components/Container";

const SearchScreen = ({ navigation }) => {
  return (
    <Container>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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

export default SearchScreen;
