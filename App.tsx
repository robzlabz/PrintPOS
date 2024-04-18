import { Button, StyleSheet, Text, View } from 'react-native';
import { usePrintersDiscovery } from 'react-native-esc-pos-printer';
import { PrintersList } from './components/PrinterList';

export default function App() {
  const { start, printerError, isDiscovering, printers } = usePrintersDiscovery();

  return (
    <View style={styles.container}>
      <View style={styles.contentCotainer}>
        {/* <ScreenTitle title={'Discovery'} /> */}
      </View>
      <PrintersList
        onPress={(printer) => {
          if (printer) {
            // navigation.navigate('SimplePrint', {printer});
          }
        }}
        printers={printers}
      />
      <View style={styles.contentCotainer}>
        <Button
          disabled={isDiscovering}
          title="Search"
          onPress={() => start()}
        />
        {printerError ? (
          <Text style={styles.errorText}>{printerError.message}</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcf9f9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentCotainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 20,
  },
});