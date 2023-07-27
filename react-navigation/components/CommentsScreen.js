import { View, useWindowDimensions, Text, ScrollView } from "react-native";
import RenderHtml from "react-native-render-html";
import { useState, useEffect } from "react";
function CommentsScreen({ route }) {
  const [Comments, setComments] = useState([]);
  const { width } = useWindowDimensions();
  const { id } = route.params;

  useEffect(() => {
    fetch(`https://dev.to/api/comments?a_id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      });
  });
  return (
    <ScrollView>
      <Text style={{ fontSize: 30, fontWeight: 900 }}>Comments</Text>
      {Comments.map((el) => {
        return (
          <View style={{borderWidth:1}}>
            <RenderHtml
              contentWidth={width}
              source={{
                html: el.body_html,
              }}
            />
            
          </View>

        );
      })}
    </ScrollView>
  );
}
export default CommentsScreen;
