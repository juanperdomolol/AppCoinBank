import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CoinCard from '../components/CoinCard';
import { useCoinStore } from '../store/coinStore';
import { Coin } from '../types';

const CoinsScreen = () => {
  const { coins, setCoins } = useCoinStore();
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
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
          image: getCoinImgUrl(coin.nameid, true),
        }));
        setCoins(coins);
        setFilteredCoins(coins);
      })
      .catch((error) => {
        console.error('Error fetching coin data:', error);
      });
  }, []);

  const navigation = useNavigation();

  const handleCoinPress = (id: number) => {
    navigation.navigate('CoinDetailScreen', { id: id });
  };

  const renderCoinCard = ({ item }: { item: Coin }) => {
    return (
      <CoinCard
        name={item.name}
        priceUSD={item.priceUSD}
        image={item.image}
        percentChange24h={item.percentChange24h}
        onPress={() => handleCoinPress(item.id)}
      />
    );
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filteredByName = coins.filter((coin) =>
      coin.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCoins(filteredByName);
  };

  const handleSortOrderChange = (order: 'asc' | 'desc') => {
    setSortOrder(order);
    const sortedCoins = [...filteredCoins];
    sortedCoins.sort((a, b) => {
      const valueA = parseFloat(a.priceUSD);
      const valueB = parseFloat(b.priceUSD);
      return order === 'asc' ? valueA - valueB : valueB - valueA;
    });
    setFilteredCoins(sortedCoins);
  };

  const handleClearSearch = () => {
    setSearchText('');
    setFilteredCoins(coins);
  };

  return (
    <View style={styles.container}>
      <View style={styles.filtersContainer}>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name"
              value={searchText}
              onChangeText={handleSearch}
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={handleClearSearch}>
                <Text style={styles.clearButton}>x</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <TouchableOpacity onPress={() => handleSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')} style={styles.sortButtonContainer}>
          <Text style={styles.filterButton}>
            {sortOrder === 'asc' ? 'Sort by Higher price' : 'Sort by Lower price'}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredCoins}
        renderItem={renderCoinCard}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const getCoinImgUrl = (nameid: string, small?: boolean) =>
  `https://www.coinlore.com/img/${small ? '25x25/' : ''}${nameid}.png`;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 10,
  },
  filterButton: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchContainer: {
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    textAlign: 'center',
  },
  clearButton: {
    fontSize: 18,
    color: 'red',
    marginLeft: 5,
  },
  sortButtonContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
});

export default CoinsScreen;
