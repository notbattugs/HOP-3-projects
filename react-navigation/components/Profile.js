import { useUser } from "@clerk/clerk-react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Image,
  Button,
} from "react-native";
import { useAuth } from "@clerk/clerk-expo";
export default function Profile({ navigation }) {
  const { isSignedIn, user, isLoaded } = useUser();
  const { signOut } = useAuth();
  if (!isLoaded) {
    return <Text>isLoaded</Text>;
  }

  if (isSignedIn) {
    return (
      <>
        <View>
          <View
            style={{
              widht: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "initial",
            }}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "40%",
              }}
            >
              <View style={{ height: 1, width: 10 }}></View>
              <Image
                source={{ uri: user.imageUrl }}
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
              <Text style={{ fontSize: 20 }}>
                Email: {user.primaryEmailAddress.emailAddress}
              </Text>
              <Text style={{ fontSize: 20 }}>username: {user.username}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("UpdateUser")}
              >
                <Text style={{ fontSize: 30 }}>📝</Text>
              </TouchableOpacity>
            </View>
            <Button
              title="Sign Out"
              onPress={() => {
                signOut();
              }}
            />
          </View>
        </View>
      </>
    );
  }

  return <Text>Not signed in</Text>;
}
