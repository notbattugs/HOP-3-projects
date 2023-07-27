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
import PostComponent from "./components/PostComp";
const App = () => {
  // const PostComponent = (props) => {
  //   const [id, setId] = useState("");
  //   const Remove = (id) => {
  //     console.log("id", id);
  //     axios
  //       .delete("http://192.168.4.48:3000/api/delete-posts?id=" + id)
  //       .then((res) => {
  //         axios
  //           .get("http://192.168.4.48:3000/api/get-posts")
  //           .then((res) => {
  //             setPosts(res.data.documents);
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  //   const [text, setText] = useState("");
  // console.log(text);
  //   const [modVisible, setModVisible] = useState(false);
  //   const Update = (id) => {
      
  //     console.log("text", text);
  //     console.log("id", id);
  //     axios
  //       .put("http://192.168.4.48:3000/api/update-posts?id=" + id, {
  //         text: text,
  //       })
  //       .then((res) => {
  //         axios
  //           .get("http://192.168.4.48:3000/api/get-posts")
  //           .then((res) => {
  //             setPosts(res.data.documents);
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  //   const [menu, setMenu] = useState();
  //   return (
  //     <View
  //       style={{
  //         width: "100%",
  //         height: 150,
  //         marginTop: 10,
  //         backgroundColor: "white",
  //         flex: 1,
  //         flexDirection: "",
  //       }}
  //     >
  //       <View
  //         style={{
  //           flex: 1,
  //           justifyContent: "space-evenly",
  //           alignItems: "center",
  //           flexDirection: "row",
  //           height: "60%",
  //         }}
  //       >
  //         <Image
  //           source={{
  //             uri: "https://robohash.org/203.98.77.187.png",
  //           }}
  //           style={{
  //             width: 50,
  //             height: 50,
  //             borderRadius: 15,
  //             backgroundColor: "#cccccc",
  //           }}
  //         />
  //         <View>
  //           <Text>{props.name}</Text>
  //           <Text style={{ color: "#a9a9a9" }}>6 минутын өмнө</Text>
  //         </View>
  //         <View style={{ width: "20%", height: "auto" }}></View>

  //         <View style={{ position: "relative" }}>
  //           <TouchableOpacity onPress={() => setMenu(!menu)}>
  //             <Entypo name="dots-three-vertical" size={24} color="#cccccc" />
  //           </TouchableOpacity>
  //           <View
  //             style={{
  //               display: menu ? "flex" : "none",
  //               position: "absolute",
  //               width: 100,
  //               right: 0,
  //               top: 30,
  //               borderWidth: 1,
  //               backgroundColor: "#ffffff",
  //               height: 80,
  //             }}
  //           >
  //             <TouchableOpacity activeOpacity={0.2}>
  //               <View
  //                 style={{
  //                   width: "auto",
  //                   height: "auto",
  //                   flex: 1,
  //                   justifyContent: "center",
  //                   alignItems: "center",
  //                   borderRadius: 10,
  //                   backgroundColor: "#ccc",
  //                   position: "absolute",
  //                   right: 10,
  //                   bottom: 40,
  //                 }}
  //               >
  //                 <Pressable
  //                   style={[styles.button, styles.buttonOpen]}
  //                   onPress={() => [setModVisible(true)]}
  //                 >
  //                   <Text>Edit</Text>
  //                 </Pressable>
  //               </View>
  //               <Modal
  //                 animationType="slide"
  //                 transparent={true}
  //                 visible={modVisible}
  //                 onRequestClose={() => {
  //                   Alert.alert("Modal has been closed.");
  //                   setModVisible(!modVisible);
  //                 }}
  //                 style={{ width: "100%", height: 500 }}
  //               >
  //                 <View style={styles.centeredView}>
  //                   <View style={styles.modalView}>
  //                     <TextInput
  //                       style={{
  //                         height: 50,
  //                         width: 200,
  //                         margin: 12,
  //                         borderWidth: 1,
  //                         borderRadius: 10,
  //                         padding: 10,
  //                       }}
  //                       placeholder="Text"
  //                       onChangeText={(el) => setText(el)}
  //                       value={text}
  //                     />
  //                     <TouchableOpacity activeOpacity={0}>
  //                       <Pressable
  //                         style={[styles.button, styles.buttonClose]}
  //                         onPress={() => Update(props.id) + alert("added")}
  //                       >
  //                         <Text style={styles.textStyle}>Update</Text>
  //                       </Pressable>
  //                     </TouchableOpacity>
  //                     <Button
  //                       title="Close"
  //                       style={[styles.button, styles.buttonClose]}
  //                       onPress={() => setModVisible(!modVisible)}
  //                     ></Button>
  //                   </View>
  //                 </View>
  //               </Modal>
  //             </TouchableOpacity>

  //             <TouchableOpacity
  //               onPress={() => Remove(props.id) + alert("Removed")}
  //               style={{
  //                 padding: 10,
  //                 borderWidth: 1,
  //                 width: "100%",
  //                 height: "60%",
  //                 backgroundColor: "#ccc",
  //               }}
  //             >
  //               <Text>🗑</Text>
  //             </TouchableOpacity>
  //           </View>
  //         </View>
  //       </View>
  //       <View
  //         style={{
  //           width: 60,
  //           height: 60,
  //           paddingLeft: "8%",
  //           paddingRight: "8%",
  //           flex: 1,
  //           flexDirection: "row",
  //           justifyContent: "start",
  //           alignItems: "center",
  //           height: "40%",
  //           width: "100%",
  //         }}
  //       >
  //         <Text style={{ fontSize: 20 }}>{props.text}</Text>
  //       </View>
  //     </View>
  //   );
  // };

  const [modalVisible, setModalVisible] = useState(false);
  const [btn, setBtn] = useState();
  const [text, setText] = useState("");
  const [name, setName] = useState("");

  const Create = async () => {
    console.log({ text, name });
    if (text) {
      axios
        .post("http://192.168.4.48:3000/api/create-posts", {
          text: text,
          name: name,
        })
        .then((res) => {
          axios
            .get("http://192.168.4.48:3000/api/get-posts")
            .then((res) => {
              setPosts(res.data.documents);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  // const [id,setId]= useState("")
  //   const Remove = async (id) =>{

  //     console.log({text, name});
  //     if(text){
  //       axios
  //       .delete(Url + "/delete-posts?id="+{id})
  //       .then((res)=>{
  //         axios
  //         .get(Url+"/get-posts")
  //         .then((res)=>{
  //           setPosts(res.data.documents);
  //         })
  //         .catch((err)=>{
  //           console.log(err)
  //         })
  //       })
  //       .catch((err)=>{
  //         console.log(err);
  //       })
  //     }
  //   }

  const [posts, setPosts] = useState();
  useEffect(() => {
    getPosts()
  }, []);

  function getPosts () {
    fetch("http://192.168.4.48:3000/api/get-posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.documents);
      });
  }
  
  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#cccccc",
        overflow: "scroll-x",
      }}
    >
      <ScrollView>
        {posts?.map((post) => {
          return <PostComponent post={post} onUpdate={() => getPosts()} key={post._id}/>;
        })}
      </ScrollView>
      <StatusBar style="auto" />
      <TouchableOpacity activeOpacity={0.2}>
        <View
          style={{
            width: 60,
            height: 60,
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
            onPress={() => [setModalVisible(true)]}
          >
            <AntDesign name="plus" size={24} color="white" />
          </Pressable>
        </View>
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
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
                placeholder="Name"
                onChangeText={(el) => setName(el)}
                value={name}
              />

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
                onChangeText={(el) => setText(el)}
                value={text}
              />
              <TouchableOpacity activeOpacity={0.1}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => Create() + alert("added")}
                >
                  <Text style={styles.textStyle}>
                    <AntDesign name="plus" size={24} color="white" />
                  </Text>
                </Pressable>
              </TouchableOpacity>
              <Button
                title="Close"
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              ></Button>
            </View>
          </View>
        </Modal>
      </TouchableOpacity>
    </SafeAreaView>
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


export default App;
