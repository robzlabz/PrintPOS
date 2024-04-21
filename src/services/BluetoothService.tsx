import { useCallback, useEffect, useState } from "react";
import { DeviceEventEmitter, NativeModules, Platform, ToastAndroid } from 'react-native';
import PermissionManager from "./PermissionManager";
const { BluetoothManager } = NativeModules;

export interface BluetoothDevice {
    name: string | null;
    address: string;
}

export default class BluetoothService {

    static useBluetoothDevices = () => {
        const [devices, setDevices] = useState<BluetoothDevice[]>([]);
        const [pairedDevices, setPairedDevices] = useState<BluetoothDevice[]>([]);
        const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);
        const [loading, setLoading] = useState(false);

        const connect = async (device: BluetoothDevice) => {
            setLoading(true);
            try {
                const isConnected = await BluetoothService.connect(device);
                setConnectedDevice(isConnected ? device : null);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        const scan = async () => {
            setLoading(true);
            try {
                const devices = await BluetoothService.scanDevices();
                setDevices(devices);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        const unpair = async (device: BluetoothDevice) => {
            setLoading(true);
            try {
                const isUnpaired = await BluetoothService.unPair(device);
                // Handle the unpairing status if needed
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        const deviceAlreadPaired = useCallback(
            rsp => {
                var ds = null;
                if (typeof rsp.devices === 'object') {
                    ds = rsp.devices;
                } else {
                    try {
                        ds = JSON.parse(rsp.devices);
                    } catch (e) { }
                }
                if (ds && ds.length) {
                    let pared = pairedDevices;
                    if (pared.length < 1) {
                        pared = pared.concat(ds || []);
                    }
                    setPairedDevices(pared);
                }
            },
            [pairedDevices],
        );

        const deviceFoundEvent = useCallback(
            rsp => {
                var r = null;
                try {
                    if (typeof rsp.device === 'object') {
                        r = rsp.device;
                    } else {
                        r = JSON.parse(rsp.device);
                    }
                } catch (e) {
                    // ignore error
                }

                if (r) {
                    let found = devices || [];
                    if (found.findIndex) {
                        let duplicated = found.findIndex(function (x) {
                            return x.address == r.address;
                        });
                        if (duplicated == -1) {
                            found.push(r);
                            setDevices(found);
                        }
                    }
                }
            },
            [devices],
        );

        useEffect(() => {
            const scanDevices = async () => {
                setLoading(true);
                try {
                    PermissionManager.requestBluetoothPermission();
                    const devices = await BluetoothService.scanDevices();
                    setDevices(devices);
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };

            scanDevices();
        }, []);

        useEffect(() => {
            if (Platform.OS == 'ios') {
                throw new Error('Not implemented for iOS');
            }

            DeviceEventEmitter.addListener(BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED, rsp => {
                console.log('already paired', rsp);
                deviceAlreadPaired(rsp);
            });

            DeviceEventEmitter.addListener(BluetoothManager.EVENT_DEVICE_FOUND, rsp => {
                console.log('menemukan device event', rsp);
                deviceFoundEvent(rsp);
            });

            DeviceEventEmitter.addListener(BluetoothManager.EVENT_CONNECTION_LOST, () => {
                console.log('connection lost');
                setConnectedDevice(null);
            });

            DeviceEventEmitter.addListener(BluetoothManager.EVENT_CONNECTED, (rsp) => {
                console.log('ada yang sudah konek', rsp);
            });

            DeviceEventEmitter.addListener(BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT, () => {
                console.log('Bluetooth not support');
                ToastAndroid.show('Device Not Support Bluetooth !', ToastAndroid.LONG);
            });

        }, [pairedDevices]);

        return { connectedDevice, devices, pairedDevices, connect, unpair, loading, scan };
    }

    static useBluetoothEnabled = () => {
        const [bleOpened, setBleOpened] = useState(false);

        useEffect(() => {
            const checkBluetoothEnabled = async () => {
                try {
                    const enabled = await BluetoothManager.isBluetoothEnabled();
                    setBleOpened(Boolean(enabled));
                } catch (err) {
                    console.error(err);
                }
            };

            checkBluetoothEnabled();
        }, []);

        return { bleOpened };
    }

    static scanDevices = async (): Promise<BluetoothDevice[]> => {
        console.log('masuk scan devices');
        try {
            PermissionManager.requestBluetoothPermission();
        } catch (err) {
            console.error(err);
            return [];
        }

        // try {
        const devices = await BluetoothManager.scanDevices();
        const jsonParse = JSON.parse(devices);
        const pairedDevices = jsonParse.paired.map((device: any) => {
            console.log({ device })
            return ({
                name: device.name,
                address: device.address,
            });
        });
        const foundDevice = jsonParse.found.map((device: any) => {
            console.log({ device })
            return ({
                name: device.name ?? 'Unknown',
                address: device.address,
            });
        });

        console.log({ pairedDevices, foundDevice })

        return [...pairedDevices, ...foundDevice];

        // } catch (err) {
        //     console.error(err);
        //     return [];
        // }

    }

    static connect = async (device: BluetoothDevice): Promise<boolean> => {
        try {
            PermissionManager.requestBluetoothPermission();
            const isConnected = await BluetoothManager.connect(device.address);
            console.log({ isConnected })
            return isConnected;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    static unPair = async (device: BluetoothDevice): Promise<boolean> => {
        try {
            const isUnpaired = await BluetoothManager.unPair(device.address);
            return isUnpaired;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
}