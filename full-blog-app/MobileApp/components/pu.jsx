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
          <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
        style={{width:"100%",height:500}}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <TextInput
        style={{height: 50,
          width:200,
          margin: 12,
          borderWidth: 1,
          borderRadius:10,
          padding: 10,}}
        placeholder='Name'
      />
    
      <TextInput
        style={{height: 50,
          width:200,
          margin: 12,
          borderWidth: 1,
          borderRadius:10,
          padding: 10,}}
        placeholder='Text'
      />
           {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              // onPress={() => setModalVisible(!modalVisible)}
              >
              <Text style={styles.textStyle}>Add Post</Text>
            </Pressable> */}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
                 <AntDesign name="plus" size={24} color="white" />

      </Pressable>
        </View>