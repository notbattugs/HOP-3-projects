import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  Touchable,
  Dimensions,
} from "react-native";

import { Image } from "expo-image";

const windowWidth = Dimensions.get("window").width;

const imageWidth = windowWidth * 0.33;
const imageGap = windowWidth * 0.005;
export default function MediaScreen() {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  async function loadInitialPhotos() {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: MediaLibrary.MediaType.photo,
      sortBy: ["creationTime"],
      first: 21,
    });
    setPhotos(media.assets);
  }
  async function loadMore() {
    let media = await MediaLibrary.getAssetsAsync({
      after: photos[photos.length - 1].id,
      mediaType: MediaLibrary.MediaType.photo,
      sortBy: ["creationTime"],
      first: 21,
    });
    setPhotos([...photos, ...media.assets]);
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

  async function HandleUpload() {
    const photo = selectedPhotos[0];
    const info = await MediaLibrary.getAssetInfoAsync(photo);
    // console.log(JSON.stringify(info, null, 2));

    const data = new FormData();

    data.append("file", { uri: info.localUri, name: info.filename });
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "dysht01ld");

    fetch("https://api.cloudinary.com/v1_1/dysht01ld/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log({ data });
        console.log("data", data.secure_url);
      })
      .catch((err) => {
        console.log("Error");
      });
  }
  return (
    <>
      <View>
        <View>
          <View
            style={{
              width: "100%",
              height: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {selectedPhotos.length > 0 && (
              <TouchableOpacity
                style={{
                  backgroundColor: "blue",
                  flex: 10,
                  width: 200,
                  height: 50,
                  borderRadius: 5,
                  position: "absolute",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 10000000,
                  top: 20,
                }}
                onPress={HandleUpload}
              >
                <Text style={{ color: "white" }}>Send</Text>
              </TouchableOpacity>
            )}
          </View>
          <FlatList
            onEndReached={loadMore}
            data={photos}
            numColumns={3}
            renderItem={({ item, index }) => (
              <ImageItem
                onselect={() => {
                  setSelectedPhotos([...selectedPhotos, item]);
                }}
                source={{ uri: item.uri }}
                selected={
                  selectedPhotos.findIndex(
                    (selected) => selected.id === item.id
                  ) + 1
                }
                onRemove={() =>
                  setSelectedPhotos(
                    selectedPhotos.filter((selected) => selected.id !== item.id)
                  )
                }
                photo={item}
                index={index}
                style={{
                  width: "33%",
                  height: 130,
                }}
              />
            )}
            keyExtractor={(item) => item.uri}
          />
        </View>
      </View>
    </>
  );
}
function ImageItem({ photo, index, onselect, selected, onRemove }) {
  const marginHorizontal = index % 3 === 1 ? imageGap : 0;
  return (
    <TouchableOpacity onPress={() => (selected ? onRemove() : onselect())}>
      <View
        style={{
          width: "33%",
          height: 130,
          marginBottom: 1,
          marginHorizontal,
          position: "relative",
        }}
      >
        <Image
          source={{ uri: photo.uri }}
          style={{
            background: "#ccc",
            width: imageWidth,
            height: imageWidth,
          }}
        />
        {!!selected && (
          <View
            style={{
              width: imageWidth,
              height: imageWidth,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255,255,255,0.6)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "blue",
                width: 30,
                height: 30,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }}>{selected}</Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
