import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCoinStore } from '../store/coinStore'; 
import ExchangeComponent from '../components/ExchangeComponent';
import CoinSearch from '../components/CoinSearch';

const ExchangeScreen = () => {
  const { selectedCoin } = useCoinStore(); 


  return (
    <View style={styles.container}>
      {selectedCoin ? 
        <ExchangeComponent/>
       : 
        <CoinSearch/>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default ExchangeScreen;
