import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CoinCard from '../components/coinCard';

const CoinsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coins Screen</Text>
      <CoinCard name={'Coin'}></CoinCard>
      <CoinCard name={'DogCoin'}></CoinCard>
      <CoinCard name={'LoroCoin'}></CoinCard>

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
});

export default CoinsScreen;
