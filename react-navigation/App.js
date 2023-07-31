// import "react-native-gesture-handler";
// import { View, Text } from "react-native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import HomeScreen from "./components/HomeScreen";
// import DetailScreen from "./components/DetailsScreen";
// import CommentsScreen from "./components/CommentsScreen";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import Settings from "./components/Settings";
// import { PaperProvider } from "react-native-paper";
// import { NavigationContainer } from "@react-navigation/native";
// import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
// import LoginFlow from "./components/LoginFlow";
// import Profile from "./components/Profile";
// import UpdateUser from "./components/UpdateUser";
// const Drawer = createDrawerNavigator();

// function Draw() {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="App" component={StackScreen} />
//       <Drawer.Screen name="Article" component={Settings} />
//     </Drawer.Navigator>
//   );
// }
// const Stack = createNativeStackNavigator();
// function StackScreen() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Tab"
//         component={TabScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen name="Detail" component={DetailScreen} />
//       <Stack.Screen name="Comments" component={CommentsScreen} />
//     </Stack.Navigator>
//   );
// }

// const Tab = createBottomTabNavigator();
// function TabScreen() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{ headerShown: false }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{ headerShown: false }}
//       />
//       <Tab.Screen
//         name="UpdateUser"
//         component={UpdateUser}
//         options={{ headerShown: false }}
//       />
//     </Tab.Navigator>
//   );
// }
// const REACT_APP_CLERK_PUBLISHABLE_KEY =
//   "pk_test_Y29udGVudC1jaGlwbXVuay02My5jbGVyay5hY2NvdW50cy5kZXYk";

// function App() {
//   return (
//     <>
//       <ClerkProvider publishableKey={REACT_APP_CLERK_PUBLISHABLE_KEY}>
//         <PaperProvider>
//           <SignedIn>
//             <NavigationContainer>
//               <Draw></Draw>
//             </NavigationContainer>
//           </SignedIn>
//           <SignedOut>
//             <View
//               style={{
//                 flex: 1,
//                 backgroundColor: "#fff0",
//                 width: "100%",
//                 height: "100%",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <LoginFlow />
//             </View>
//           </SignedOut>
//         </PaperProvider>
//       </ClerkProvider>
//     </>
//   );
// }

// export default App;
import { Camera, CameraType } from "expo-camera";

import { useRef, useState } from "react";

import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import * as MediaLibrary from "expo-media-library";

export default function App() {
  const [type, setType] = useState(CameraType.back);

  const [blackBgr, setBlackBgr] = useState(false);

  const [permission, requestPermission] = Camera.useCameraPermissions();

  const [permissionResponse, RequestPermission] = MediaLibrary.usePermissions();

  const cameraRef = useRef();

  if (!permission) {
    // Camera permissions are still loading

    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet

    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>

        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  async function takePicture() {
    setBlackBgr(true);

    setTimeout(() => {
      setBlackBgr(false);
    }, 300);

    const result = await cameraRef.current.takePictureAsync();

    MediaLibrary.saveToLibraryAsync(result.uri);
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={{ flex: 1, position: "relative" }}
        type={type}
      >
        <View
          style={{
            position: "absolute",
            backgroundColor: "black",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            opacity: blackBgr ? 1 : 0,
          }}
        ></View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                backgroundColor: "white",
              }}
            ></View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
  },

  camera: {
    flex: 1,
  },

  buttonContainer: {
    flex: 1,

    flexDirection: "row",

    backgroundColor: "transparent",

    margin: 64,
  },

  button: {
    flex: 1,

    alignSelf: "flex-end",

    alignItems: "center",
  },

  text: {
    fontSize: 24,

    fontWeight: "bold",

    color: "white",
  },
});
