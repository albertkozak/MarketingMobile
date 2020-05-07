import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import HomeScreen from "./src/screens/Home";
import SearchScreen from "./src/screens/Search";
import QRScannerScreen from "./src/screens/QRScan";
import ProfileScreen from "./src/screens/Profile";
import { Ionicons } from "@expo/vector-icons";
import Event from "./src/components/events/Event";
import VendorList from "./src/components/vendors/VendorList";
import Vendor from "./src/components//vendors/Vendor";
import Colors from "./src/constants/Color";
import ForgotPassword from "./src/screens/ForgotPassword";
import Subscriptions from "./src/screens/Subscriptions";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const AppStack = createStackNavigator();
const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();

const HomeTabNavigator = ({}) => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: Colors.ORANGE,
      style: {
        backgroundColor: "#121212",
        borderTopWidth: 0,
        position: "absolute",
      },
    }}
    screenOptions={({ route }) => ({
      headerTransparent: true,
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name == "Home") {
          iconName = "ios-home";
        } else if (route.name == "Search") {
          iconName = "ios-search";
        } else if (route.name == "My Events") {
          iconName = "ios-star";
        } else if (route.name == "Profile") {
          iconName = "ios-person";
        } else if (route.name == "Login") {
          iconName = "ios-apps";
        } else if (route.name == "Register") {
          iconName = "ios-more";
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeStackNavigator} />
    <Tab.Screen name="Search" component={SearchStackNavigator} />
    <Tab.Screen name="My Events" component={Subscriptions} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

function getHeaderTitle(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : "Home";

  switch (routeName) {
    case "Home":
      return "Home";
    case "Search":
      return "Search";
    case "My Events":
      return "My Events";
    case "Profile":
      return "Profile";
  }
}

function shouldHeaderBeShown(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : "Event";
  switch (routeName) {
    case "Event":
      return true;
    case "VendorList":
      return false;
    case "Vendor":
      return false;
    case "QRScan":
      return false;
  }
}

const HomeStackNavigator = ({}) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Event"
        component={AppStackNavigator}
        options={({ route }) => ({
          headerShown: shouldHeaderBeShown(route),
          headerTitle: "",
          headerStyle: {
            backgroundColor: Colors.NAVY,
          },
          headerTintColor: Colors.LIGHTGREY,
          headerTintStyle: {
            fontSize: 10,
            fontWeight: 100,
          },
        })}
      />
    </HomeStack.Navigator>
  );
};

const SearchStackNavigator = ({}) => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <SearchStack.Screen
        name="Event"
        component={AppStackNavigator}
        options={({ route }) => ({
          headerShown: shouldHeaderBeShown(route),
          headerTitle: "",
          headerStyle: {
            backgroundColor: Colors.NAVY,
          },
          headerTintColor: Colors.LIGHTGREY,
          headerTintStyle: {
            fontSize: 10,
            fontWeight: 100,
          },
        })}
      />
    </SearchStack.Navigator>
  );
};

const AppStackNavigator = ({}) => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Event"
        component={Event}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="QRScan"
        component={QRScannerScreen}
        options={{
          title: "QR Scanner",
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.NAVY,
          },
          headerTintColor: Colors.LIGHTGREY,
          headerTintStyle: {
            fontSize: 10,
            fontWeight: 100,
          },
        }}
      />
      <AppStack.Screen
        name="VendorList"
        component={VendorList}
        options={{
          title: "Vendor List",
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.NAVY,
          },
          headerTintColor: Colors.LIGHTGREY,
          headerTintStyle: {
            fontSize: 10,
            fontWeight: 100,
          },
        }}
      />
      <AppStack.Screen
        name="Vendor"
        component={Vendor}
        options={{
          title: "Vendor Details",
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.NAVY,
          },
          headerTintColor: Colors.LIGHTGREY,
          headerTintStyle: {
            fontSize: 10,
            fontWeight: 100,
          },
        }}
      />
    </AppStack.Navigator>
  );
};

function App({}) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            title: "",
            headerShown: true,
            headerStyle: {
              backgroundColor: Colors.NAVY,
            },
            headerTintColor: Colors.LIGHTGREY,
            headerTintStyle: {
              fontSize: 10,
              fontWeight: 100,
            },
          }}
        />
        <Stack.Screen
          options={({ route }) => ({
            title: getHeaderTitle(route),
            headerShown: false,
          })}
          name="Home"
          component={HomeTabNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
