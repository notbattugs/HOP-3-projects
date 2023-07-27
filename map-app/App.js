import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, Button } from "react-native";
// import { configureAbly, useChannel } from "@ably-labs/react-hooks";
import MapView, { Marker } from "react-native-maps";
import React, { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";

configureAbly({
  key: "oHONOg.n86Pyg:qVYljC8cf6kY95olMgGlNTX5az_h6qkSnaPtX69i01g",
  clientId: Date.now() + "",
});
export default function App() {
  const [location, setLocation] = useState(null);

  // const [channel] = useChannel("public-chat", (message) => {
  //   setMessages((prev) => [...prev, message]);
  // });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      console.log({ status });

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      Location.watchPositionAsync({}, (location) => {
        setLocation(location);
        MapRef.current.animateToRegion({
          latitude: 47.9233177,
          longitude: 106.9347862,
          latitudeDelta: 0.05,
          longitudeDeltea: 0.05,
        });
      });
    })();
  }, []);
  console.log({ location });
  const MapRef = useRef();

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={MapRef}
        mapType="hybrid"
        showsCompass
        showsTraffic
        provider="google"
        style={{ width: "100%", height: "100%" }}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          >
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: "blue",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 44 }}>Me</Text>
            </View>
          </Marker>
        )}
      </MapView>
      <View
        style={{
          position: "absolute",
          top: 40,
          backgroundColor: "white",
          borderRadius: 50,
        }}
      >
        <Button
          title="center"
          onPress={() => {
            MapRef.current.animateToRegion({
              latitude: 47.9233177,
              longitude: 106.9347862,
              latitudeDelta: 0.05,
              longitudeDeltea: 0.05,
            });
          }}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
});
