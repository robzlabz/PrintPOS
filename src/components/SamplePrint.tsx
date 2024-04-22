import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';
import PosServices from '../services/PosServices';
import { logo } from './dummy-logo';

const SamplePrint = () => {
    return (
        <View>
            <Text>Sample Print Instruction</Text>
            <View style={styles.btn}>
                <Button
                    onPress={async () => {
                        await BluetoothEscposPrinter.printBarCode(
                            '123456789012',
                            BluetoothEscposPrinter.BARCODETYPE.JAN13,
                            3,
                            120,
                            0,
                            2,
                        );
                        await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
                    }}
                    title="Print BarCode"
                />
            </View>
            <View style={styles.btn}>
                <Button
                    onPress={async () => {
                        await BluetoothEscposPrinter.printQRCode(
                            'https://github.com',
                            280,
                            BluetoothEscposPrinter.ERROR_CORRECTION.L,
                        ); //.then(()=>{alert('done')},(err)=>{alert(err)});
                        await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
                    }}
                    title="Print QRCode"
                />
            </View>

            <View style={styles.btn}>
                <Button
                    onPress={async () => {
                        await BluetoothEscposPrinter.printerUnderLine(2);
                        await BluetoothEscposPrinter.printText('Prawito Hudoro\r\n', {
                            encoding: 'GBK',
                            codepage: 0,
                            widthtimes: 0,
                            heigthtimes: 0,
                            fonttype: 1,
                        });
                        await BluetoothEscposPrinter.printerUnderLine(0);
                        await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
                    }}
                    title="Print UnderLine"
                />
            </View>

            <View style={styles.btn}>
                <Button
                    title="Print Struk Belanja"
                    onPress={async () => {
                        let columnWidths = [4, 14, 14];
                        try {
                            await PosServices.printLine();
                            await BluetoothEscposPrinter.printPic(logo, { width: 250, left: 150 });
                            await PosServices.setAlign(BluetoothEscposPrinter.ALIGN.CENTER);
                            await PosServices.printCenter('Jl. Brigjen Saptadji Hadiprawira No.93');
                            await PosServices.printCenter('https://mb888.web.id');
                            await PosServices.printLeftRight('Kasir', 'Em Ajik 3 Lak Sono');
                            await PosServices.printLeftRight('Tanggal', PosServices.currentDate() + ' ' + PosServices.currentTime());
                            await PosServices.printLine();
                            await PosServices.printBigText('Product');
                            await PosServices.printLine();
                            await PosServices.printItemDetail('1x', 'Cumi-Cumi', 'Rp.200.000');
                            await PosServices.printItemDetail('1x', 'Tongkol Kering', 'Rp.300.000');
                            await PosServices.printItemDetail('1x', 'Ikan Tuna', 'Rp.400.000');
                            await PosServices.printLine();
                            await PosServices.printLeftRight('Subtotal', 'Rp.900.000');
                            await PosServices.printLeftRight('Packaging', 'Rp.6.000');
                            await PosServices.printLeftRight('Delivery', 'Rp.0');
                            await PosServices.printLine();
                            await PosServices.printLeftRight('Total', 'Rp.906.000');
                            await PosServices.printLine();
                            await PosServices.printCenter('Terima Kasih');
                            await PosServices.printNewLine();
                            await PosServices.printQRCode('https://mb888.web.id');
                            await PosServices.printNewLine(3);
                        } catch (e) {
                            alert(e.message || 'ERROR');
                        }
                    }}
                />
            </View>
        </View>
    );
};

export default SamplePrint;

const styles = StyleSheet.create({
    btn: {
        marginBottom: 8,
    },
});