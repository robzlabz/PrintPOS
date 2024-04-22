import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import type { DeviceInfo } from 'react-native-esc-pos-printer';

interface PrinterItemProps {
    printer: DeviceInfo;
    onPress: (printer: DeviceInfo) => void;
}

export const PrinterItem = ({ printer, onPress }: PrinterItemProps) => {
    return (
        <Pressable onPress={() => onPress(printer)} style={styles.container}>
            <Text style={styles.title}>{printer.deviceName}</Text>
            <Text style={styles.subtitle}>target: {printer.target}</Text>
        </Pressable>
    );
};

export const styles = StyleSheet.create({
    container: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginLeft: 20,
        paddingVertical: 10,
        marginRight: 5,
    },

    title: {
        fontSize: 16,
    },

    subtitle: {
        fontSize: 12,
        fontWeight: '400',
        color: '#8e8e93',
    },
});