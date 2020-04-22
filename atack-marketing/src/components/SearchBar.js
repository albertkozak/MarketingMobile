import * as React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Colors from "../constants/Color";
import { colors } from "react-native-elements";

const SearchBar = ({ term, onTermChange, onTermSubmit }) => {
  return (
    <View style={styles.background}>
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
  },
  input: {
    flex: 1,
    color: Colors.WHITE,
    fontSize: 15,
  },
  icon: {
    fontSize: 35,
    alignSelf: "center",
    marginHorizontal: 15,
  },
});

export default SearchBar;
