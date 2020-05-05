import React from "react";
import firebase from "../firebase";
import { Button } from "react-native-elements";
import Colors from "../constants/Color";
const Logout = (props) => {
  async function signOutUser() {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        props.getLoggedIn(false);
      })

      .catch(function (error) {});
  }

  return (
    <Button
      buttonStyle={{
        backgroundColor: Colors.ORANGE,
        marginHorizontal: 100,
      }}
      title="LOG OUT"
      onPress={() => signOutUser()}
    />
  );
};

export default Logout;
