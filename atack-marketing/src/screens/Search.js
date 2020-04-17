import * as React from "react";
import { View, Text } from "react-native";
import { SearchBar } from "../components/SearchBar";

const SearchScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* <SearchBar /> */}
      <Text>Search Screen</Text>
    </View>
  );
};

export default SearchScreen;
