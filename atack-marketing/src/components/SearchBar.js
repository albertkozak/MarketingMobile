import * as React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Colors from "../constants/Color";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ term, onTermChange, onTermSubmit }) => {
  return (
    <View style={styles.background}>
      <Ionicons name="ios-search" size={18} color={Colors.GREY} />
      <TextInput
        placeholder="Search Events"
        placeholderTextColor={Colors.GREY}
        value={term}
        style={styles.input}
        onChangeText={(newTerm) => onTermChange(newTerm)}
        onSubmitEditing={() => onTermSubmit()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.GREY,
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 30
  },
  input: {
    flex: 1,
    color: Colors.WHITE,
    fontSize: 15,
    marginLeft: 10,
  },
});

export default SearchBar;
