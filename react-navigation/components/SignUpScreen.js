import * as React from "react";
import { TextInput, View, Button } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";

export default function SignUpScreen({ onSignIn }) {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        username,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View>
      {!pendingVerification && (
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
              onChangeText={(email) => setEmailAddress(email)}
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
              autoCapitalize="none"
              value={username}
              placeholder="Username"
              onChangeText={(username) => setUsername(username)}
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
              placeholder="Password"
              placeholderTextColor="#000"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>

          <Button
            style={{
              borderWidth: 1,
              borderRadius: 20,
              padding: 10,
              elevation: 2,
            }}
            onPress={onSignUpPress}
            title=" Sign Up"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <Button
            style={{
              borderWidth: 1,
              borderRadius: 20,
              padding: 10,
              elevation: 2,
            }}
            onPress={onSignIn}
            title="I have an account."
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      )}
      {pendingVerification && (
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
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)}
            />
          </View>
          <Button
            style={{
              borderWidth: 1,
              borderRadius: 20,
              padding: 10,
              elevation: 2,
            }}
            title="Verify Email"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
            onPress={onPressVerify}
          />
        </View>
      )}
    </View>
  );
}
