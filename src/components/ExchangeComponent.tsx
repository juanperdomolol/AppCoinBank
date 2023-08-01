import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useCoinStore } from '../store/coinStore';
interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

const ExchangeComponent: React.FC = () => {
  const { selectedCoin } = useCoinStore();
  const [dollars, setDollars] = useState<string>('');
  const [convertedAmount, setConvertedAmount] = useState<string>('');

  const convertDollarsToSelectedCoin = () => {
    if (selectedCoin && dollars !== '') {
      const amountInDollars = parseFloat(dollars);
      const priceUSD = parseFloat(selectedCoin.priceUSD);
      const equivalentAmount = amountInDollars * priceUSD;
      setConvertedAmount(equivalentAmount.toFixed(2));
    } else {
      setConvertedAmount('');
    }
  };

  const handleDeleteSelectedCoin = () => {
    useCoinStore.setState({ selectedCoin: null });
    setDollars('');
    setConvertedAmount('');
  };

  return (
    <View style={styles.container}>
      <Card>
        <Text style={styles.text}>{selectedCoin.name}</Text>
        {selectedCoin && (
          <Image
            source={{ uri: `https://www.coinlore.com/img/${selectedCoin.nameid}.png` }}
            style={styles.image}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Dollar Amount"
          keyboardType="numeric"
          value={dollars}
          onChangeText={(value) => setDollars(value)}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.convertButton} onPress={convertDollarsToSelectedCoin}>
            <Text style={styles.convertButtonText}>Convert</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteSelectedCoin}>
            <Text style={styles.deleteButtonText}>Remove Coin</Text>
          </TouchableOpacity>
        </View>
        {convertedAmount !== '' && (
          <Text style={styles.resultText}>Equivalent in {selectedCoin.symbol}: {convertedAmount}</Text>
        )}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin:40,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  input: {
    width: 200,
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  convertButton: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#2196F3',
    borderRadius: 8,
  },
  convertButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deleteButton: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#FF0000',
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultText: {
    fontSize: 16,
    marginTop: 20,
  },
});

export default ExchangeComponent;
