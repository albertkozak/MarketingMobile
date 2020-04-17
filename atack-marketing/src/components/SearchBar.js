import * as React from "react";
import { View, TextInput } from "react-native";

const SearchBar = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TextInput placeholder="search" />
    </View>
  );
};

export default SearchBar;
