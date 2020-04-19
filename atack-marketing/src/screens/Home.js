import * as React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Container from "../components/Container";

function HomeScreen({ navigation }) {
  return (
    <Container>
      <View style={styles.wrapper}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Events"
          onPress={() => navigation.navigate("EventList")}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
