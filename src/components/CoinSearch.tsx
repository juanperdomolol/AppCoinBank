import React, { useState } from 'react';
import { View,Image, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useCoinStore } from '../store/coinStore'; // Asegúrate de importar el store correcto
import { Coin } from '../types';
import LottieView from 'lottie-react-native';

const CoinSearch: React.FC = () => {
  const { coins,setSelectedCoin  } = useCoinStore(); // Utiliza el hook useCoinStore para acceder al estado de las monedas
  const [searchText, setSearchText] = useState<string>(''); // Estado para almacenar el texto de búsqueda
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]); // Estado para almacenar las monedas filtradas

  const handleSearch = (text: string) => {
    const lowerText = text.toLowerCase();
    const filteredCoins = coins.filter((coin) =>
      coin.name.toLowerCase().includes(lowerText)
    );
    setFilteredCoins(filteredCoins);
    setSearchText(text);
  };

  // mostrar la información de  moneda seleccionada
  const handleSelectCoin = (id: number) => {
    const selectedCoin = coins.find((coin) => coin.id === id);
    if (selectedCoin) {
      setSelectedCoin(selectedCoin)
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar moneda..."
        value={searchText}
        onChangeText={handleSearch}
      />
       {filteredCoins.length === 0 && (
        <LottieView
          source={require('../assets/searchLottie.json')}
          autoPlay
          loop
          style={styles.lottieAnimation}
        />
      )}
      <FlatList
        data={filteredCoins}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.coinItem}
            onPress={() => handleSelectCoin(item.id)}
          >
            <Image source={{uri: `https://www.coinlore.com/img/25x25/${item.nameid}.png` }} style={styles.image} />
            <Text>{item.name}</Text>
            <Text>{item.symbol}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  coinItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginBottom: 8,
  },
  lottieAnimation: {
    width: 300,
    height: 600,
    alignSelf: 'center',
  },
  image:{
    width: 40,
    height: 40,
    marginRight: 10,
  },
});

export default CoinSearch;
