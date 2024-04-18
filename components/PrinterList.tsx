import React from 'react';

import { FlatList, StyleSheet, View } from 'react-native';
import { PrinterItem } from './PrinterItem';

export const PrintersList = ({ printers, onPress }) => {
    const renderItem = ({ item }) => {
        return <PrinterItem printer={item} onPress={onPress} />;
    };

    return (
        <View style={styles.container}>
            <FlatList data={printers} renderItem={renderItem} />
        </View>
    );
};

export const styles = StyleSheet.create({
    container: {
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 26,
        width: 300,
        minHeight: 350,
        overflow: 'hidden',
        paddingVertical: 20,
    },
});