import {
  Text,
  View,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Image } from "expo-image";
import { Entypo, AntDesign } from "@expo/vector-icons";
import axios from "axios";

const PostComponent = ({post, onUpdate}) => {
    const [updatedText, setUpdatedText] = useState("");
    const [modVisible, setModVisible] = useState(false);
    const [menu, setMenu] = useState();

  const Remove = (id) => {
    console.log("id", id);
    axios
      .delete("http://192.168.4.48:3000/api/delete-posts?id=" + id)
      .then((res) => {
        onUpdate();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Update = (id) => {
    console.log("id", id);
    axios
      .put("http://192.168.4.48:3000/api/update-posts?id=" + id, {
        text: updatedText,
      })
      .then((res) => {
        onUpdate();
        setModVisible(false)
      })
      .catch((err) => {
        console.log(err);
      });
      setUpdatedText("");
  };
  return (
    <View
      style={{
        width: "100%",
        height: 150,
        marginTop: 10,
        backgroundColor: "white",
        flex: 1,
        flexDirection: "",
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "row",
          height: "60%",
        }}
      >
        <Image
          source={{
            uri: "https://robohash.org/203.98.77.187.png",
          }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 15,
            backgroundColor: "#cccccc",
          }}
        />
        <View>
          <Text>{post.Name}</Text>
          <Text style={{ color: "#a9a9a9" }}>6 минутын өмнө</Text>
        </View>
        <View style={{ width: "20%", height: "auto" }}></View>

        <View style={{ position: "relative" }}>
          <TouchableOpacity onPress={() => setMenu(!menu)}>
            <Entypo name="dots-three-vertical" size={24} color="#cccccc" />
          </TouchableOpacity>
          <View
            style={{
              display: menu ? "flex" : "none",
              position: "absolute",
              width: 100,
              right: 0,
              top: 30,
              borderWidth: 1,
              backgroundColor: "#ffffff",
              height: 80,
            }}
          >
            <TouchableOpacity activeOpacity={0.2}>
              <View
                style={{
                  width: "auto",
                  height: "auto",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  backgroundColor: "green",
                  position: "absolute",
                  right: 10,
                  bottom: 50,
                }}
              >
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => [setModVisible(true)]}
                >
                  <Text>📝</Text>
                </Pressable>
              </View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModVisible(!modVisible);
                }}
                style={{ width: "100%", height: 500 }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <TextInput
                      style={{
                        height: 50,
                        width: 200,
                        margin: 12,
                        borderWidth: 1,
                        borderRadius: 10,
                        padding: 10,
                      }}
                      placeholder="Text"
                      onChangeText={(el) => setUpdatedText(el)}
                      value={updatedText}
                    />
                    <TouchableOpacity activeOpacity={0}>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => Update(post._id)}
                      >
                        <Text style={styles.textStyle}>Update</Text>
                      </Pressable>
                    </TouchableOpacity>
                    <Button
                      title="Close"
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModVisible(!modVisible)}
                    ></Button>
                  </View>
                </View>
              </Modal>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Remove(post._id) + alert("Removed")}
              style={{
                padding: 10,
                borderWidth: 1,
                width: "100%",
                height: "60%",
                backgroundColor: "#ccc",
              }}
            >
              <Text>🗑</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          width: 60,
          height: 60,
          paddingLeft: "8%",
          paddingRight: "8%",
          flex: 1,
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "center",
          height: "40%",
          width: "100%",
        }}
      >
        <Text style={{ fontSize: 20 }}>{post.Text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    flex: 1,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    border: "1px solid black",
  },
});

export default PostComponent;
