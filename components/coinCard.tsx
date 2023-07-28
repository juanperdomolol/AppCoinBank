import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface CoinCardProps {
  name: string;
  priceUSD: string;
  onPress?: () => void;
}

const CoinCard: React.FC<CoinCardProps> = ({ name, priceUSD, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.name}>{name}</Text> 
        <Text style={styles.priceUSD}>{priceUSD}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    margin: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceUSD: {
    fontSize: 16,
  },
});

export default CoinCard;
