import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import Container from "../components/Container";
import Colors from "../constants/Color";
import firebase from "../firebase";
import Logout from "../components/Logout";

function ProfileScreen({ navigation }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);

  const getCurrentUser = async () => {
    try {
      let currentUser = await firebase.auth().currentUser;
      //	console.log(currentUser);

      if (currentUser != null) {
        setCurrentUser(currentUser);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
        navigation.navigate("Login", "");
      }
    } catch (error) {
      console.log("Error Checking Logged In User" + error);
    }
  };

  getCurrentUser();
  function getLoggedIn(boolean) {
    setLoggedIn(boolean);
  }
  return (
    <Container>
      <SafeAreaView style={styles.wrapper}>
        {/* <Text style={styles.title}>Profile Screen</Text> */}
        <Image
          style={styles.banner}
          source={require("../../assets/account-banner.png")}
        />
        <View style={styles.logout}>
          {loggedIn && (
            <Text style={styles.loggedStat}>
              Currently logged in as: {currentUser.email}
            </Text>
          )}
          <View>{loggedIn && <Logout getLoggedIn={getLoggedIn} />}</View>
        </View>
      </SafeAreaView>
    </Container>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    marginTop: 30,
  },
  title: {
    color: Colors.WHITE,
    fontSize: 22,
    marginBottom: 25,
  },
  loggedStat: {
    color: Colors.WHITE,
    marginBottom: 25,
  },
  banner: {
    width: Dimensions.get("window").width,
    height: 250,
    marginBottom: 25,
  },
  logout: {
    marginTop: 100,
  },
});

export default ProfileScreen;
