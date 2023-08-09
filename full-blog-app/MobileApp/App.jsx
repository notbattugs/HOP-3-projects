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
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Image } from 'expo-image';
import { Entypo, AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import PostComponent from './components/PostComp';
const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [btn, setBtn] = useState();
  const [text, setText] = useState('');
  const [name, setName] = useState('');

  const Create = async () => {
    console.log({ text, name });
    if (text) {
      axios
        .post('http://192.168.4.48:3000/api/create-posts', {
          text: text,
          name: name,
        })
        .then((res) => {
          axios
            .get('http://192.168.4.48:3000/api/get-posts')
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

  const [posts, setPosts] = useState();
  useEffect(() => {
    getPosts();
  }, []);

  function getPosts() {
    fetch('http://192.168.4.48:3000/api/get-posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.documents);
      });
  }

  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#cccccc',
        overflow: 'scroll-x',
      }}
    >
      <ScrollView>
        {posts?.map((post) => {
          return (
            <PostComponent
              post={post}
              onUpdate={() => getPosts()}
              key={post._id}
            />
          );
        })}
      </ScrollView>
      <StatusBar style="auto" />
      <TouchableOpacity activeOpacity={0.2}>
        <View
          style={{
            width: 60,
            height: 60,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: 'green',
            position: 'absolute',
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
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
          style={{ width: '100%', height: 500 }}
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
                  onPress={() => Create() + alert('added')}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
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
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    border: '1px solid black',
  },
});

export default App;
