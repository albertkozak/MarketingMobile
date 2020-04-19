import * as React from "react";
import { View, Text } from "react-native";
import Container from "../components/Container";

function ProfileScreen({ navigation }) {
  return (
    <Container>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Profile Screen</Text>
      </View>
    </Container>
  );
}

export default ProfileScreen;
