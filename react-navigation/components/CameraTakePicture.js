import { Camera, CameraType } from "expo-camera";

import { useRef, useState } from "react";

import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import * as MediaLibrary from "expo-media-library";

export default function takePicture() {
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
    height: 50,
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
