import "react-native-gesture-handler";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen";
import DetailScreen from "./components/DetailsScreen";
import CommentsScreen from "./components/CommentsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Settings from "./components/Settings";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import LoginFlow from "./components/LoginFlow";
import Profile from "./components/Profile";
import UpdateUser from "./components/UpdateUser";
const Drawer = createDrawerNavigator();

function Draw() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="App" component={StackScreen} />
      <Drawer.Screen name="Article" component={Settings} />
    </Drawer.Navigator>
  );
}
const Stack = createNativeStackNavigator();
function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tab"
        component={TabScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Comments" component={CommentsScreen} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function TabScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="UpdateUser"
        component={UpdateUser}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
const REACT_APP_CLERK_PUBLISHABLE_KEY =
  "pk_test_Y29udGVudC1jaGlwbXVuay02My5jbGVyay5hY2NvdW50cy5kZXYk";

function App() {
  return (
    <>
      <ClerkProvider publishableKey={REACT_APP_CLERK_PUBLISHABLE_KEY}>
        <PaperProvider>
          <SignedIn>
            <NavigationContainer>
              <Draw></Draw>
            </NavigationContainer>
          </SignedIn>
          <SignedOut>
            <View
              style={{
                flex: 1,
                backgroundColor: "#fff0",
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LoginFlow />
            </View>
          </SignedOut>
        </PaperProvider>
      </ClerkProvider>
    </>
  );
}

export default App;
