import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { CoinCardProps } from '../types';



const CoinCard: React.FC<CoinCardProps> = ({ name, priceUSD, percentChange24h, image, onPress }) => {
  const isPositiveChange = parseFloat(percentChange24h) >= 0;
  const formattedPriceUSD = parseFloat(priceUSD).toFixed(3);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.namePriceContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.priceUSD}>{`$ ${formattedPriceUSD}`}</Text>
          </View>
          <View style={styles.last24hContainer}>
            <Text style={styles.last24h}>Last 24h</Text>
            <Text style={[styles.percentChange, isPositiveChange ? styles.positiveChange : styles.negativeChange]}>
              {`${percentChange24h}%`}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Alinear los elementos en una fila horizontal
    padding: 16,
    backgroundColor: '#ffffff', // Fondo blanco
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
    marginBottom: 2,
  },
  imageContainer: {
    marginRight: 16, // Espacio entre la imagen y el texto
  },
  image: {
    width: 40,
    height: 40,
  },
  textContainer: {
    flex: 1, // Ocupar el espacio restante en la fila
  },
  namePriceContainer: {
    flexDirection: 'row', // Alinear los elementos en una fila horizontal
    justifyContent: 'space-between', // Distribuir los elementos de forma equitativa
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  priceUSD: {
    fontSize: 16,
    color: '#272727',
    marginLeft: 10,
  },
  last24hContainer: {
    flexDirection: 'row', // Alinear los elementos en una fila horizontal
    alignItems: 'center',
    marginTop: 4,
  },
  last24h: {
    fontSize: 12,
    color: '#999999', // Color gris
    marginRight: 10,
  },
  percentChange: {
    fontSize: 14,
  },
  positiveChange: {
    color: 'green',
  },
  negativeChange: {
    color: 'red',
  },
});

export default CoinCard;
