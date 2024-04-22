import { useEffect, useState } from "react";
import { NativeModules } from "react-native";
const { BluetoothManager } = NativeModules;

export const useBluetoothEnabled = () => {
    const [bleOpened, setBleOpened] = useState(false);

    const checkBluetoothEnabled = async () => {
        try {
            const enabled = await BluetoothManager.isBluetoothEnabled();
            setBleOpened(Boolean(enabled));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        checkBluetoothEnabled();
    }, []);

    return { bleOpened, checkBluetoothEnabled };
}