import React from 'react';
import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import ItemList from './ItemList';
import SamplePrint from './SamplePrint';
import BluetoothService from './src/services/BluetoothService';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  containerList: { flex: 1, flexDirection: 'column' },
  bluetoothStatusContainer: { justifyContent: 'flex-end', alignSelf: 'flex-end' },
  bluetoothStatus: {
    backgroundColor: '#A8A9AA',
    padding: 8,
    borderRadius: 2,
    color: 'white',
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  bluetoothInfo: { textAlign: 'center', fontSize: 16, color: '#FFC806', marginBottom: 20 },
  sectionTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 12 },
  printerInfo: { textAlign: 'center', fontSize: 16, color: '#E9493F', marginBottom: 20 },
});

const App = () => {

  const { bleOpened } = BluetoothService.useBluetoothEnabled();
  const { devices, pairedDevices, connect, unpair, connectedDevice, loading, scan } = BluetoothService.useBluetoothDevices();

  console.log({ connectedDevice })

  return (
    <ScrollView style={styles.container}>
      <View style={styles.bluetoothStatusContainer}>
        <Text style={bleOpened ? { backgroundColor: '#47BF34' } : { backgroundColor: '#A8A9AA' }}>
          Bluetooth {bleOpened ? 'Aktif' : 'Non Aktif'}
        </Text>
      </View>
      {!bleOpened && <Text style={styles.bluetoothInfo}>Mohon aktifkan bluetooth anda</Text>}
      <Text style={styles.sectionTitle}>Printer yang terhubung ke aplikasi:</Text>
      {connectedDevice && (
        <ItemList
          label={connectedDevice?.name}
          value={connectedDevice?.address}
          onPress={() => unpair(connectedDevice)}
          actionText="Putus"
          color="#E9493F"
          connected={connectedDevice}
        />
      )}
      {!connectedDevice && (
        <Text style={styles.printerInfo}>Belum ada printer yang terhubung</Text>
      )}
      <Text style={styles.sectionTitle}>Bluetooth yang terhubung ke HP ini:</Text>
      {loading ? <ActivityIndicator animating={true} /> : null}
      <View style={styles.containerList}>
        {pairedDevices.map((item, index) => {
          return (
            <ItemList
              key={index}
              onPress={() => connect(item)}
              label={item.name}
              value={item.address}
              connected={item.address === connectedDevice?.address}
              actionText="Connect"
              color="#00BCD4"
            />
          );
        })}
      </View>
      {/* <View style={styles.containerList}>
        {devices.map((item, index) => {
          return (
            <ItemList
              key={index}
              onPress={() => connect(item)}
              label={item.name}
              value={item.address}
              connected={item.address === connectedDevice?.address}
              actionText="Connect"
              color="#00BCD4"
            />
          );
        })}
      </View> */}
      <SamplePrint />
      <Button
        onPress={() => scan()}
        title="Scan Bluetooth"
      />
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

export default App;