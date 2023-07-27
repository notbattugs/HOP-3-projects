import { View, useWindowDimensions, Text, ScrollView } from "react-native";
import RenderHtml from "react-native-render-html";
import { useState, useEffect } from "react";
import { Button } from "react-native-paper";

function DetailScreen({ navigation, route }) {
  const { id } = route.params;
  const [articles, setArcticles] = useState([]);
  const { width } = useWindowDimensions();

  useEffect(() => {
    fetch(`https://dev.to/api/articles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setArcticles(data);
      });
  });
  return (
    <ScrollView>
      <Text style={{ fontSize: 30, fontWeight: 900 }}>{articles.title}</Text>
      <Button
        icon="comment"
        mode="contained"
        onPress={() => navigation.navigate("Comments",{
            id: id,
          })}
        style={{width:200}}
      >
        {articles.comments_count}
      </Button>
      <RenderHtml
        contentWidth={width}
        source={{
          html: articles.body_html,
        }}
      />
     
    </ScrollView>
  );
}
export default DetailScreen;
