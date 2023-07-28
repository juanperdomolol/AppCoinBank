import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CoinCardProps {
  name: string;
}

const CoinCard: React.FC<CoinCardProps> = ({ name }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      {/* Aquí puedes agregar más elementos y estilos según tus necesidades */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    margin: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CoinCard;
