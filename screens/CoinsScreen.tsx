import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CoinCard from '../components/CoinCard';

interface Coin {
  id: number;
  name: string;
  priceUSD: string;
}

const CoinsScreen = () => {
  const [coinData, setCoinData] = useState<Coin[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Llamado a la API para obtener los datos de las monedas
    fetch('https://api.coinlore.net/api/tickers/')
      .then((response) => response.json())
      .then((data) => {
        const coins: Coin[] = data.data.map((coin: any) => ({
          id: coin.id,
          name: coin.name,
          priceUSD: coin.price_usd,
        }));
        setCoinData(coins);
      })
      .catch((error) => {
        console.error('Error fetching coin data:', error);
      });
  }, []);

  const handleCoinPress = (id: number) => {
    navigation.navigate('CoinDetailScreen', { id: id });
  };

  const renderCoinCard = ({ item }: { item: Coin }) => {
    return (
      <CoinCard
        name={item.name}
        priceUSD={item.priceUSD}
        onPress={() => handleCoinPress(item.id)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={coinData}
        renderItem={renderCoinCard}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CoinsScreen;
