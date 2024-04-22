import { BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';

export default class PosServices {
    static printText = async (text: string): Promise<boolean> => {
        await BluetoothEscposPrinter.printText(text, {});
        return true;
    }

    static printBigText = async (text: string): Promise<boolean> => {
        await BluetoothEscposPrinter.printText(text, { widthtimes: 1 });
        return true;
    }

    static printNewLine = async (line: number = 3): Promise<boolean> => {
        await BluetoothEscposPrinter.printText('\r\n'.repeat(line), {});
        return true;
    }

    static printCenter = async (text: string): Promise<boolean> => {
        await BluetoothEscposPrinter.printColumn(
            [32],
            [BluetoothEscposPrinter.ALIGN.CENTER],
            [text],
            {},
        );
        return true;
    }

    static printLeftRight = async (leftText: string, rightText: string): Promise<boolean> => {
        await BluetoothEscposPrinter.printColumn(
            [16, 16],
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
            [leftText, rightText],
            {},
        );
        return true;
    }

    static printLine = async (char: string = '-', length: number = 32): Promise<boolean> => {
        await BluetoothEscposPrinter.printText(char.repeat(length), {});
        return true;
    }

    static printItemDetail = async (qty: string, item: string, price: string): Promise<boolean> => {
        await BluetoothEscposPrinter.printColumn(
            [4, 16, 12],
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
            [qty, item, price],
            {},
        );
        return true;
    }

    static printQRCode = async (data: string, size: number = 280): Promise<boolean> => {
        await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
        await BluetoothEscposPrinter.printQRCode(data, size, BluetoothEscposPrinter.ERROR_CORRECTION.L);
        return true;
    }

    /*
    * align: BluetoothEscposPrinter.ALIGN.LEFT | BluetoothEscposPrinter.ALIGN.CENTER | BluetoothEscposPrinter.ALIGN.RIGHT
    */
    static setAlign = async (align: number = BluetoothEscposPrinter.ALIGN.CENTER): Promise<boolean> => {
        await BluetoothEscposPrinter.setAlign(align);
        return true;
    }

    static currentDate = (): string => {
        const date = new Date();
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    static currentTime = (): string => {
        const date = new Date();
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }
}