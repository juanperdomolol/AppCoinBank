import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface CoinCardProps {
  name: string;
  priceUSD: string;
  image: string;
  onPress?: () => void;
}

const CoinCard: React.FC<CoinCardProps> = ({ name, priceUSD, image, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image source={{ uri: image }} style={styles.image} />
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
    alignItems: 'center',
  },
  image: {
    width: 25,
    height: 25,
    marginBottom: 8,
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
