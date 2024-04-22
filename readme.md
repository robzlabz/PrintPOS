# PrintPOS App

This app is an example of an Expo app with a native plugin that can print to an ESC/POS thermal printer.

## Installation

1. Clone the repository:

```bash
    git clone https://github.com/your-username/PrintPOS.git
    ```

2. Install the dependencies:

```bash
    cd PrintPOS
    yarn install
    ```

3. Make Prebuild APK:

```bash
    yarn build:local
    ```

4. Install the APK on your device:

```bash
    adb install -r <path>
    ```

5. Run Apps

```bash
    yarn start
    ```

## Usage

1. Connect your ESC/POS thermal printer to your device.
2. Open the app on your device.
3. Select the printer from the available devices.
4. Make Test Print

## Contributing

Contributions are welcome! If you have any suggestions or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
