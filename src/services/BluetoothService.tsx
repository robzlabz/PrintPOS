import { NativeModules } from 'react-native';
import PermissionManager from "./PermissionManager";
const { BluetoothManager } = NativeModules;

export interface BluetoothDevice {
    name: string | null;
    address: string;
}

export default class BluetoothService {
    static scanDevices = async (): Promise<BluetoothDevice[]> => {
        try {
            PermissionManager.requestBluetoothPermission();
        } catch (err) {
            console.error(err);
            return [];
        }

        try {
            const devices = await BluetoothManager.scanDevices();
            const jsonParse = JSON.parse(devices);
            const pairedDevices = jsonParse.paired.map((device: any) => {
                return ({
                    name: device.name,
                    address: device.address,
                });
            });
            const foundDevice = jsonParse.found.map((device: any) => {
                return ({
                    name: device.name ?? 'Unknown',
                    address: device.address,
                });
            });
            return [...pairedDevices, ...foundDevice];
        } catch (err) {
            console.error(err);
            return [];
        }

    }

    static connect = async (device: BluetoothDevice): Promise<boolean> => {
        try {
            PermissionManager.requestBluetoothPermission();
            const isConnected = await BluetoothManager.connect(device.address);
            console.log({ isConnected })
            return typeof isConnected == 'string';
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    static unPair = async (device: BluetoothDevice): Promise<boolean> => {
        try {
            const isUnpaired = await BluetoothManager.unpaire(device.address);
            return isUnpaired;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
}