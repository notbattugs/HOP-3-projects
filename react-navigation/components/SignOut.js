import { useAuth } from "@clerk/clerk-expo";
import { SafeAreaView, Text, StyleSheet, View, Button } from "react-native";

const SignOut = () => {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <Button
      title="Sign Out"
      onPress={() => {
        signOut();
      }}
    />
  );
};
export default SignOut;
