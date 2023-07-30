import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCoinStore } from '../store/coinStore'; // Asegúrate de importar el store correcto
import ExchangeComponent from '../components/ExchangeComponent';
import CoinSearch from '../components/CoinSearch';

const ExchangeScreen = () => {
  const { selectedCoin, coins } = useCoinStore(); // Utiliza el hook useCoinStore para acceder al estado

  // mostrar información de la moneda seleccionada en la consola
  const showSelectedCoinInfo = () => {
    if (selectedCoin) {
      console.log('Información de la moneda seleccionada:', selectedCoin);
    } else {
      console.log('No hay moneda seleccionada');
    }
  };

  // mostrar información de la moneda seleccionada en la consola
  showSelectedCoinInfo();

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
    alignItems: 'center',
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
