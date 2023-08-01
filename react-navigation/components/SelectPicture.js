import * as MediaLibrary from "expo-media-library";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";

export default function SelectPicture() {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [photos, setPhotos] = useState([]);
  //   const { uri } = await Camera.takePictureAsync();
  //   const asset = await MediaLibrary.createAssetAsync(uri);
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
  return (
    <>
      <View>
        <ScrollView style={{ height: "100%", width: 400 }}>
          {photos &&
            photos.map((photo) => {
              <Image
                source={{ uri: photo.uri }}
                style={{ background: "#ccc", width: 100, height: 100 }}
              />;
            })}
        </ScrollView>
      </View>
    </>
  );
}
