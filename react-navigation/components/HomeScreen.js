import { useState, useEffect } from "react";
import { Card, PaperProvider, Button } from "react-native-paper";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  useWindowDimensions,
  Text,
  ScrollView,
} from "react-native";

function HomeScreen({ navigation }) {
  const [articles, setArcticles] = useState([]);
  useEffect(() => {
    fetch("https://dev.to/api/articles?username=whitep4nth3r")
      .then((res) => res.json())
      .then((data) => setArcticles(data));
  });

  if (!articles)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );

  return (
    <ScrollView
      style={{ width: "100%", height: "100%", gap: 10, marginTop: 20 }}
    >
      <View style={{ width: "100%", height: "100%", gap: 10, marginTop: 20 }}>
        {articles.map((el, i) => {
          return (
            <Card
              onPress={() =>
                navigation.navigate("Detail", {
                  id: el.id,
                })
              }
            >
              <Card.Cover source={{ uri: `${el.social_image}` }} />
              <Card.Title title={el.title} />
            </Card>
          );
        })}
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
