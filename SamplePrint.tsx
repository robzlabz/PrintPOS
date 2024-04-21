import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';

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
                            await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
                            // await BluetoothEscposPrinter.printPic(logo, { width: 250, left: 150 });
                            await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
                            await BluetoothEscposPrinter.printColumn(
                                [48],
                                [BluetoothEscposPrinter.ALIGN.CENTER],
                                ['Jl. Brigjen Saptadji Hadiprawira No.93'],
                                {},
                            );
                            await BluetoothEscposPrinter.printColumn(
                                [32],
                                [BluetoothEscposPrinter.ALIGN.CENTER],
                                ['https://xfood.id'],
                                {},
                            );
                            await BluetoothEscposPrinter.printColumn(
                                [16, 16],
                                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                                ['Customer', 'Prawito Hudoro'],
                                {},
                            );
                            await BluetoothEscposPrinter.printColumn(
                                [16, 16],
                                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                                ['Packaging', 'Iya'],
                                {},
                            );
                            await BluetoothEscposPrinter.printColumn(
                                [16, 16],
                                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                                ['Delivery', 'Ambil Sendiri'],
                                {},
                            );
                            await BluetoothEscposPrinter.printText(
                                '================================',
                                {},
                            );
                            await BluetoothEscposPrinter.printText('Products\r\n', { widthtimes: 1 });
                            await BluetoothEscposPrinter.printText(
                                '================================',
                                {},
                            );
                            await BluetoothEscposPrinter.printColumn(
                                columnWidths,
                                [
                                    BluetoothEscposPrinter.ALIGN.LEFT,
                                    BluetoothEscposPrinter.ALIGN.LEFT,
                                    BluetoothEscposPrinter.ALIGN.RIGHT,
                                ],
                                ['1x', 'Cumi-Cumi', 'Rp.200.000'],
                                {},
                            );
                            await BluetoothEscposPrinter.printColumn(
                                columnWidths,
                                [
                                    BluetoothEscposPrinter.ALIGN.LEFT,
                                    BluetoothEscposPrinter.ALIGN.LEFT,
                                    BluetoothEscposPrinter.ALIGN.RIGHT,
                                ],
                                ['1x', 'Tongkol Kering', 'Rp.300.000'],
                                {},
                            );
                            await BluetoothEscposPrinter.printColumn(
                                columnWidths,
                                [
                                    BluetoothEscposPrinter.ALIGN.LEFT,
                                    BluetoothEscposPrinter.ALIGN.LEFT,
                                    BluetoothEscposPrinter.ALIGN.RIGHT,
                                ],
                                ['1x', 'Ikan Tuna', 'Rp.400.000'],
                                {},
                            );
                            await BluetoothEscposPrinter.printText(
                                '================================',
                                {},
                            );
                            await BluetoothEscposPrinter.printColumn(
                                [16, 16],
                                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                                ['Subtotal', 'Rp.900.000'],
                                {},
                            );
                            await BluetoothEscposPrinter.printColumn(
                                [16, 16],
                                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                                ['Packaging', 'Rp.6.000'],
                                {},
                            );
                            await BluetoothEscposPrinter.printColumn(
                                [16, 16],
                                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                                ['Delivery', 'Rp.0'],
                                {},
                            );
                            await BluetoothEscposPrinter.printText(
                                '================================',
                                {},
                            );
                            await BluetoothEscposPrinter.printColumn(
                                [16, 16],
                                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                                ['Total', 'Rp.906.000'],
                                {},
                            );
                            await BluetoothEscposPrinter.printText('\r\n\r\n', {});
                            await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
                            await BluetoothEscposPrinter.printQRCode(
                                'DP0837849839',
                                280,
                                BluetoothEscposPrinter.ERROR_CORRECTION.L,
                            );
                            await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
                            await BluetoothEscposPrinter.printColumn(
                                [32],
                                [BluetoothEscposPrinter.ALIGN.CENTER],
                                ['DP0837849839'],
                                { widthtimes: 2 },
                            );
                            await BluetoothEscposPrinter.printText(
                                '================================',
                                {},
                            );
                            const currentDate = new Date();
                            const formattedDate = currentDate.toLocaleString('en-US', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                timeZoneName: 'short',
                            });
                            await BluetoothEscposPrinter.printColumn(
                                [32],
                                [BluetoothEscposPrinter.ALIGN.CENTER],
                                [formattedDate],
                                {},
                            );
                            await BluetoothEscposPrinter.printText(
                                '================================',
                                {},
                            );
                            await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
                            await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
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