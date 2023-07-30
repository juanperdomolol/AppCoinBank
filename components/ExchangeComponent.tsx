import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useCoinStore } from '../store/coinStore'; // Asegúrate de importar el store correcto

const ExchangeComponent: React.FC = () => {
  const { selectedCoin } = useCoinStore(); // acceder al estado
  const [dollars, setDollars] = useState<string>(''); // almacenar la cantidad de dolares ingresada
  const [convertedAmount, setConvertedAmount] = useState<string>(''); // almacenar el valor convertido

  // realiza la conversion de dolares a la moneda seleccionada
  const convertDollarsToSelectedCoin = () => {
    if (selectedCoin && dollars !== '') {
      const amountInDollars = parseFloat(dollars);
      const priceUSD = parseFloat(selectedCoin.priceUSD);
      const equivalentAmount = amountInDollars * priceUSD;
      setConvertedAmount(equivalentAmount.toFixed(2)); // Redondea el resultado a 2 decimales
    } else {
      setConvertedAmount('');
    }
  };

  // elimina la moneda seleccionada
  const handleDeleteSelectedCoin = () => {
    useCoinStore.setState({ selectedCoin: null });
    setDollars('');
    setConvertedAmount('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Moneda Seleccionada: {selectedCoin.name}</Text>
      <TextInput
        style={styles.input}
        placeholder="Cantidad de Dólares"
        keyboardType="numeric"
        value={dollars}
        onChangeText={(value) => setDollars(value)}
      />
      <TouchableOpacity style={styles.convertButton} onPress={convertDollarsToSelectedCoin}>
        <Text style={styles.convertButtonText}>Convertir</Text>
      </TouchableOpacity>
      {convertedAmount !== '' && (
        <Text style={styles.resultText}>Equivalente en {selectedCoin.symbol}: {convertedAmount}</Text>
      )}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteSelectedCoin}>
        <Text style={styles.deleteButtonText}>Eliminar Moneda</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  convertButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#2196F3', // Puedes cambiar el color a tu gusto
    borderRadius: 8,
  },
  convertButtonText: {
    color: '#FFFFFF', // Texto en color blanco para mejor contraste
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 16,
    marginTop: 20,
  },
  deleteButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#FF0000', // Puedes cambiar el color a tu gusto
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#FFFFFF', // Texto en color blanco para mejor contraste
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExchangeComponent;
