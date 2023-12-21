import React, { useState } from 'react';
import { Button, Modal, Text, TextInput, View } from 'react-native';
import '../global';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [ADAfruitIOKey, setADAfruitIOKey] = useState('');

  return (
    <View style={{ marginTop: 50 }}>
      <Button title="Open Modal" onPress={() => setModalVisible(true)} />

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 35, alignItems: 'center', borderRadius: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Paste Adafruit IO key here</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10, marginBottom: 20, width: 200, textAlign: 'center' }}
              onChangeText={text => setADAfruitIOKey(text)}
              value={ADAfruitIOKey}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 200 }}>
              <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
              <Button title="OK" color="green" onPress={() => {
                setModalVisible(false);
                // Here you can save the ADAfruitIOKey to your storage or state management library
                // so it can be accessed throughout your app.
                global.AdaFruitIOKey = ADAfruitIOKey;
              }} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
