import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  // if (hasPermission === null) {
  //   return <Text>Requesting for camera permission</Text>;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>SkinScanner</Text>
      </View>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.preview}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
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
    height: 800,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    margin: 5,
    height: 40,
    width: 40,
  },
  bottomOverlay: {
    position: "absolute",
    top: 100,
    width: "100%",
    flex: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topOverlay: {
    position: "absolute",
    top: 100,
    zIndex: 5,
    height: 100,
    fontSize: 12,
  },
});

export default App;
