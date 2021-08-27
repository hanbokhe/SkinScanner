import React, { useState, useEffect } from 'react';
import { Text, Modal, View, StyleSheet, Button, Pressable, SafeAreaView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useFonts } from 'expo-font';

export default App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [serial, setSerial] = useState(0);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    setModalVisible(true);
    setScanned(true);
  }, [serial])

  const handleBarCodeScanned = ({ type, data }) => {
    setSerial(data);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const showModal = () => {
    if(serial != '0') {
      return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.top}>{serial}</Text>
            <Text style={styles.top}>{serial.toString() === '0785364130081' ? 'Mario Badescu Drying Lotion' : 'Erborian Yuza Double Lotion'}</Text>
            <Text style={styles.modalText}>{serial.toString() === '0785364130081' ? 'Contains Sulfur & Salicylic Acid' : 'Contains Citrus Junos Fruit Extract (Yuzu) & Sodium Hyaluronate'}</Text>
            <Text style={styles.modalText}>{serial.toString() === '0785364130081' ? 'Good for Acne' : 'Good for Anti-Aging & Hydration'}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>)
      }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.top}>Scan A Barcode</Text>
      </View>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.preview}
      />
      { scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} /> }
      { modalVisible ? showModal() : null }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  preview: {
    zIndex: 1,
    width: 400,
    height: 400,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    margin: 5,
    height: 40,
    width: 40,
  },
  top: {
    fontFamily: 'Helvetica-Light',
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
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
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

