import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { useCoinStore } from '../store/coinStore';

type CoinDetailScreenRouteProp = RouteProp<RootStackParamList, 'CoinDetailScreen'>;

interface CoinDetailScreenProps {
  route: CoinDetailScreenRouteProp;
}

interface CoinDetail {
  id: number;
  symbol: string;
  name: string;
  priceUSD: string;
  percentChange24h: string;
  percentChange1h: string;
  percentChange7d: string;
}


const CoinDetailScreen: React.FC<CoinDetailScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const { setSelectedCoin } = useCoinStore();
  
  const handleNavigateToExchangeScreen = () => {
    if (coinDetail) {
      setSelectedCoin(coinDetail); // Guarda la moneda seleccionada en el estado de Zustand
    }
    navigation.navigate('Exchange');
  };
  const { id } = route.params;
  const [coinDetail, setCoinDetail] = useState<CoinDetail | null>(null);

  useEffect(() => {
    fetch(`https://api.coinlore.net/api/ticker/?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const coin: CoinDetail = {
          id: data[0].id,
          symbol: data[0].symbol,
          name: data[0].name,
          priceUSD: data[0].price_usd,
          percentChange24h: data[0].percent_change_24h,
          percentChange1h: data[0].percent_change_1h,
          percentChange7d: data[0].percent_change_7d,
        };
        setCoinDetail(coin);
      })
      .catch((error) => {
        console.error('Error fetching coin detail:', error);
      });
  }, [id]);

  if (!coinDetail) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coin Detail Screen</Text>
      <Text>ID: {coinDetail.id}</Text>
      <Text>Symbol: {coinDetail.symbol}</Text>
      <Text>Name: {coinDetail.name}</Text>
      <Text>Price (USD): ${coinDetail.priceUSD}</Text>
      <Text>Percent Change (24h): {coinDetail.percentChange24h}%</Text>
      <Text>Percent Change (1h): {coinDetail.percentChange1h}%</Text>
      <Text>Percent Change (7d): {coinDetail.percentChange7d}%</Text>
      <TouchableOpacity onPress={handleNavigateToExchangeScreen} style={styles.convertButton}>
        <Text style={styles.convertButtonText}>Convert Money</Text>
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
});

export default CoinDetailScreen;
