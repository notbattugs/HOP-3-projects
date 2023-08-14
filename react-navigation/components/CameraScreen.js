import { Camera, CameraType } from "expo-camera";

import { useRef, useState } from "react";

import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import * as MediaLibrary from "expo-media-library";

export default function CameraScreen() {
  const [type, setType] = useState(CameraType.back);

  const [blackBgr, setBlackBgr] = useState(false);

  const [permission, requestPermission] = Camera.useCameraPermissions();

  const [permissionResponse, RequestPermission] = MediaLibrary.usePermissions();

  const [fadein, setFadeIn] = useState(false);
  const fadeAnim = useRef(new Animated.Value(100)).current;

  const fadeIn = () => {
    setFadeIn(true);
    Animated.timing(fadeAnim, {
      toValue: 200,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  const fadeOut = () => {
    setFadeIn(false);
    Animated.timing(fadeAnim, {
      toValue: 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

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
            backgroundColor: "rgba(255,255,255,0.4)",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            opacity: blackBgr ? 1 : 0,
          }}
        ></View>

        <View style={styles.buttonContainer}>
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
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Ionicons name="camera-reverse" size={50} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: "flex-end",
              alignItems: "center",
              width: "auto",
              height: "100%",
              marginBottom: 10,
            }}
            onPress={() => (fadeAnim ? fadeOut() : fadeIn())}
            activeOpacity={0.8}
          >
            <Animated.View
              style={{
                borderRadius: 20,
                backgroundColor: "rgba(255,255,255,0.4)",
                width: fadeAnim,
                padding: 20,
                margin: 20,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 28, color: "white" }}>4:3</Text>
            </Animated.View>
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
    width: "100%",
    height: 200,
    flex: 1,
    flexDirection: "row",
    // backgroundColor: "rgba(0.5,0.5,0.5,0.5)",
    backgroundColor: "black",
    marginTop: 675,
    justifyContent: "center",
    alignItems: "center",
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
