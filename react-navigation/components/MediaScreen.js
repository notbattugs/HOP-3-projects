import * as MediaLibrary from "expo-media-library";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  Touchable,
} from "react-native";
import { Image } from "expo-image";

export default function MediaScreen() {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  async function loadInitialPhotos() {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: MediaLibrary.MediaType.photo,
      sortBy: ["creationTime"],
      first: 20,
    });
    setPhotos(media.assets);
  }

  useEffect(() => {
    if (permissionResponse && permissionResponse.granted) {
      loadInitialPhotos();
    }
  }, [permissionResponse]);

  if (!permissionResponse) {
    return <View />;
  }
  const { granted, canAskAgain } = permissionResponse;

  if (!granted && canAskAgain) {
    return (
      <View>
        <TouchableOpacity onPress={requestPermission}>
          <Text>requestPermission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!granted && !canAskAgain) {
    return (
      <View>
        <TouchableOpacity onPress={requestPermission}>
          <Text>You did not give permission to see photos</Text>
        </TouchableOpacity>
      </View>
    );
  }
  async function loadMore() {
    let media = await MediaLibrary.getAssetsAsync({
      // after:,
      mediaType: MediaLibrary.MediaType.photo,
      sortBy: ["creationTime"],
      first: 20,
    });
    setPhotos(media.assets);
  }
  return (
    <>
      <View>
        <View
        // style={{
        //   display: "grid",
        //   gridTemplateColumns: " repeat(8,33%)",
        //   gridTemplateRows: "repeat(8, 33%)",
        //   gridgap: "1%",
        // }}
        >
          <FlatList
            onEndReached={loadMore}
            data={photos}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item.uri }}
                style={{
                  background: "#ccc",
                  width: "33%",
                  height: 100,

                  objectFit: "cover",
                }}
              />
            )}
            keyExtractor={(item) => item.id}
            style={{
              display: "grid",
              gridTemplateColumns: " repeat(8,33%)",
              gridTemplateRows: "repeat(8, 33%)",
              gridgap: "1%",
            }}
          />
        </View>
      </View>
    </>
  );
}
function ImageItem({ photo, index }) {
  const Marigin = index % 3 === 1 ? imageGap : 0;
  return (
    <TouchableOpacity>
      <View
        style={{
          width: "33%",
          height: "33%",
          marginBottom: imageGap,
          marginHorizontal,
          position: "relative",
        }}
      >
        <Image source={{ uri: photo }} />
      </View>
    </TouchableOpacity>
  );
}
