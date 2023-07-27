import { View, Text, Image } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

export default function UpdateUser() {
  const { user } = useUser();
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const updateUser = async () => {
    await user.update({
      username: username,
    });
    await user.setProfileImage({
      file,
    });
  };

  console.log(JSON.stringify(user, null, 4));

  return (
    <View style={{ flex: 1, alignItems: "center", paddingTop: 30 }}>
      <Button onPress={pickImage}>📷</Button>
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: 150,
            height: 150,
            borderRadius: 100,
            shadowColor: "#171717",
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
          }}
        />
      )}

      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 22, fontWeight: 500, marginTop: 15 }}>
          {user.username}
        </Text>

        <Text style={{ fontSize: 16, fontWeight: 400, color: "grey" }}>
          {user.primaryEmailAddress.emailAddress}
        </Text>
      </View>

      <View>
        <TextInput
          style={{ width: 320, marginTop: 70 }}
          mode="outlined"
          placeholder="Username"
          onChangeText={(username) => setUsername(username)}
        />

        <Button
          style={{
            height: 42,
            borderRadius: 15,
            marginTop: 40,
            width: 100,
            alignItems: "center",
          }}
          mode="contained"
          onPress={updateUser}
        >
          <Text>Update</Text>
        </Button>
      </View>
    </View>
  );
}
