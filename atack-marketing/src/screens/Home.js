import React from "react";
import { Text, View, Image } from "react-native";
import Swiper from "react-native-swiper";

const Home = () => {
  var styles = {
    wrapper: {},
    slide1: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#9DD6EB",
    },
    slide2: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#97CAE5",
    },
    slide3: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#92BBD9",
    },
    text: {
      position: "absolute",
      color: "#fff",
      fontSize: 30,
      fontWeight: "bold",
    },
  };

  return (
    <Swiper
      showsPagination={false}
      style={styles.wrapper}
      showsButtons
      loop={true}
      autoplay={true}
    >
      <View testID="Hello" style={styles.slide1}>
        <Image source={require("../../assets/img/1.jpg")} />
        <Text style={styles.text}>BCIT Convention</Text>
      </View>
      <View testID="Beautiful" style={styles.slide2}>
        <Image source={require("../../assets/img/2.jpg")} />
        <Text style={styles.text}>Microsoft</Text>
      </View>
      <View testID="Simple" style={styles.slide3}>
        <Image source={require("../../assets/img/1.jpg")} />
        <Text style={styles.text}>Telus</Text>
      </View>
    </Swiper>
  );
};

export default Home;
