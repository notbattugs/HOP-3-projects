import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Card, TextInput } from "react-native-paper";
export default function App() {
  return (
    <View style={styles.container}>
      <View style={{ width: "100%", height: "60%" }}>
        <ScrollView>
          <Card style={{ backgroundColor: "#2b3440" }}>
            <Card.Content>
              <Text variant="bodyMedium" style={{ color: "#d8dde4" }}>
                Hi , Everyone
              </Text>
            </Card.Content>
          </Card>
        </ScrollView>
      </View>
      <View
        style={{
          width: "100%",
          height: "20%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          label="Password"
          secureTextEntry
          right={<TextInput.Icon icon="send" />}
          style={{ width: "80%" }}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 20,
  },
});
