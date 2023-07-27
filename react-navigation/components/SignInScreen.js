import React from "react";
import { Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View>
      <View>
        <TextInput
          style={{
            height: 50,
            width: 200,
            margin: 12,
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
          }}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email..."
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
      </View>

      <View>
        <TextInput
          style={{
            height: 50,
            width: 200,
            margin: 12,
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
          }}
          value={password}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <Button
        onPress={() => onSignInPress()}
        title=" Sign In"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />

      <Button
        title="Do not have acc?"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}
