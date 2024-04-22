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

        await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            permissions,
        );

        await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            permissions,
        );

        const locationGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            permissions,
        );

        if (locationGranted != PermissionsAndroid.RESULTS.GRANTED) {
            console.error('Location permission denied', locationGranted);
            return false;
        }

        return true;
    }
}