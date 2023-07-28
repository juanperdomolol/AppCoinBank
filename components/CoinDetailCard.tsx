import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CoinDetail } from '../types';

interface CoinDetailCardProps {
  coinDetail: CoinDetail;
}

const CoinDetailCard: React.FC<CoinDetailCardProps> = ({ coinDetail }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* <Text style={styles.label}>24h:</Text> */}
        <Text style={styles.value}>{coinDetail.percentChange24h}%</Text>
      </View>
      <View style={styles.row}>
        {/* <Text style={styles.label}>1h:</Text> */}
        <Text style={styles.value}>{coinDetail.percentChange1h}%</Text>
      </View>
      <View style={styles.row}>
        {/* <Text style={styles.label}>7d:</Text> */}
        <Text style={styles.value}>{coinDetail.percentChange7d}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CoinDetailCard;
