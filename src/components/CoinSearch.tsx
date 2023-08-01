import React, { useState } from 'react';
import { View, Image, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useCoinStore } from '../store/coinStore';
import { Coin } from '../types';
import LottieView from 'lottie-react-native';

const CoinSearch: React.FC = () => {
  const { coins, setSelectedCoin } = useCoinStore();
  const [searchText, setSearchText] = useState<string>('');
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);

  const handleSearch = (text: string) => {
    const lowerText = text.toLowerCase();
    const filteredCoins = coins.filter((coin) =>
      coin.name.toLowerCase().includes(lowerText)
    );
    setFilteredCoins(filteredCoins);
    setSearchText(text);
  };

  const handleSelectCoin = (id: number) => {
    const selectedCoin = coins.find((coin) => coin.id === id);
    if (selectedCoin) {
      setSelectedCoin(selectedCoin);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search coin..."
        value={searchText}
        onChangeText={handleSearch}
        placeholderTextColor="black" // Text color for the placeholder
      />
      {searchText === '' && filteredCoins.length === 0 ? (
        <LottieView
          source={require('../assets/searchLottie.json')}
          autoPlay
          loop
          style={styles.lottieAnimation}
        />
      ) : (
        <FlatList
          data={filteredCoins}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.coinItem}
              onPress={() => handleSelectCoin(item.id)}
            >
              <Image
                source={{ uri: `https://www.coinlore.com/img/25x25/${item.nameid}.png` }}
                style={styles.image}
              />
              <View style={styles.coinDetails}>
                <Text>{item.name}</Text>
                <Text>{item.symbol}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={() => (
            <View style={styles.noResultsContainer}>
              <Text style={styles.notFoundText}>Sorry, no matching coins found.</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    margin: 20,
  },
  input: {
    height: 40,
    width: '100%', // Full width
    borderWidth: 1,
    borderColor: 'black', // Dark border color
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  coinItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
    backgroundColor: 'white', // Background color for the "card"
    borderRadius: 8,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  lottieAnimation: {
    width: 300,
    height: 600,
    alignSelf: 'center',
    marginBottom: 16,
  },
  image: {
    width: 40,
    height: 40,
    marginLeft: 30,
    marginRight: 30,
  },
  coinDetails: {
    flex: 1,
    alignItems: 'center',
  },
  noResultsContainer: {
    flex: 1,
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 16,
    color: 'black', // Text color for the "Not Found" message
    marginTop: 16,
  },
});

export default CoinSearch;
