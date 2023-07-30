import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CoinCard from '../components/CoinCard';
import { useCoinStore } from '../store/coinStore'; // Asegúrate de importar el store correcto
import { Coin } from '../types';

const CoinsScreen = () => {
  const { coins, setCoins } = useCoinStore(); // Utiliza el hook useCoinStore para acceder al estado y a la función setCoins

  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]); // Estado para almacenar las monedas filtradas
  const [searchText, setSearchText] = useState<string>(''); // Estado para almacenar el texto del buscador

  useEffect(() => {
    // Llamado a la API para obtener los datos de las monedas
    fetch('https://api.coinlore.net/api/tickers/')
      .then((response) => response.json())
      .then((data) => {
        const coins: Coin[] = data.data.map((coin: any) => ({
          id: coin.id,
          symbol: coin.symbol,
          name: coin.name,
          priceUSD: coin.price_usd,
          percentChange24h: coin.percent_change_24h,
          percentChange1h: coin.percent_change_1h,
          percentChange7d: coin.percent_change_7d,
          image: getCoinImgUrl(coin.nameid, true), // Llamado a la API para obtener la imagen
        }));
        setCoins(coins); // Actualiza el estado del store con los datos de las monedas
        setFilteredCoins(coins); // Almacenar las monedas originales una vez que se obtienen
      })
      .catch((error) => {
        console.error('Error fetching coin data:', error);
      });
  }, [setCoins]);

  const navigation = useNavigation();

  const handleCoinPress = (id: number) => {
    navigation.navigate('CoinDetailScreen', { id: id });
  };

  const renderCoinCard = ({ item }: { item: Coin }) => {
    return (
      <CoinCard
        name={item.name}
        priceUSD={item.priceUSD}
        image={item.image} // Mostrar la imagen junto con los datos de la moneda
        onPress={() => handleCoinPress(item.id)}
      />
    );
  };

  const handleFilterByValue = (ascending: boolean) => {
    const sortedCoins = [...filteredCoins];
    sortedCoins.sort((a, b) => {
      const valueA = parseFloat(a.priceUSD);
      const valueB = parseFloat(b.priceUSD);
      return ascending ? valueA - valueB : valueB - valueA;
    });
    setFilteredCoins(sortedCoins);
  };

  const handleFilterByName = () => {
    const filteredByName = coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCoins(filteredByName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.filtersContainer}>
        <Button title="Mayor valor" onPress={() => handleFilterByValue(false)} />
        <Button title="Menor valor" onPress={() => handleFilterByValue(true)} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre"
          value={searchText}
          onChangeText={setSearchText}
        />
        <Button title="Buscar" onPress={handleFilterByName} />
      </View>
      <FlatList
        data={filteredCoins} // Utiliza las monedas filtradas
        renderItem={renderCoinCard}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

// obtener la URL de la imagen de la moneda
const getCoinImgUrl = (nameid: string, small?: boolean) =>
  `https://www.coinlore.com/img/${small ? '25x25/' : ''}${nameid}.png`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingBottom: 2,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CoinsScreen;
