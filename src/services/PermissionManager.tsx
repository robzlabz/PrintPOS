import { PermissionsAndroid, Rationale } from "react-native";

export default class PermissionManager {
    static requestBluetoothPermission = async (): Promise<boolean> => {
        const permissions: Rationale = {
            title: 'App bluetooth request permission to access bluetooth',
            message: 'App bluetooth need access to bluetooth for bluetooth printer connection process',
            buttonNeutral: 'Later',
            buttonNegative: 'No',
            buttonPositive: 'Yes',
        };

        const bluetoothConnectGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            permissions,
        );

        if (bluetoothConnectGranted != PermissionsAndroid.RESULTS.GRANTED) {
            console.error('Bluetooth connect permission denied');
            return false;
        }

        const bluetoothScanGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            permissions,
        );

        if (bluetoothScanGranted != PermissionsAndroid.RESULTS.GRANTED) {
            console.error('Bluetooth scan permission denied');
            return false;
        }

        const locationGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            permissions,
        );

        if (locationGranted != PermissionsAndroid.RESULTS.GRANTED) {
            console.error('Location permission denied');
            return false;
        }

        return true;
    }
}