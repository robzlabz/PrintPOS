import React from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import ItemList from '../components/ItemList';
import SamplePrint from '../components/SamplePrint';
import { useBluetoothDevices } from '../hooks/useBluetoothDevices';
import { useBluetoothEnabled } from '../hooks/useBluetoothEnabled';

const HomePage = () => {

    const { bleOpened, checkBluetoothEnabled } = useBluetoothEnabled();
    const { pairedDevices, connect, unpair, connectedDevice, loading, scan } = useBluetoothDevices();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.bluetoothStatusContainer}>
                <Text onPress={checkBluetoothEnabled} style={bleOpened ? { backgroundColor: '#47BF34' } : { backgroundColor: '#A8A9AA' }}>
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
                    connected={false}
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
            <SamplePrint />
            <Button
                onPress={() => scan()}
                title="Scan Bluetooth"
            />
            <View style={{ height: 100 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    containerList: { flex: 1, flexDirection: 'column' },
    bluetoothStatusContainer: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        padding: 8,
    },
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

export default HomePage;
