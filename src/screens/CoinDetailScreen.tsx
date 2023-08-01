import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { useCoinStore } from '../store/coinStore';
import { LineChart } from 'react-native-chart-kit';
import BackButton from '../components/BackButton';

type CoinDetailScreenRouteProp = RouteProp<RootStackParamList, 'CoinDetailScreen'>;

interface CoinDetailScreenProps {
  route: CoinDetailScreenRouteProp;
}

interface CoinDetail {
  id: number;
  symbol: string;
  name: string;
  nameid: string; // Corregir aquí el nombre del atributo 'nameid'
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
  const [loading, setLoading] = useState(true); // Estado para controlar si se está cargando o no

  useEffect(() => {
    fetch(`https://api.coinlore.net/api/ticker/?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const coin: CoinDetail = {
          id: data[0].id,
          symbol: data[0].symbol,
          name: data[0].name,
          nameid: data[0].nameid, // Corregir aquí el nombre del atributo 'nameid'
          priceUSD: data[0].price_usd,
          percentChange24h: data[0].percent_change_24h,
          percentChange1h: data[0].percent_change_1h,
          percentChange7d: data[0].percent_change_7d,
        };
        setCoinDetail(coin);
        setLoading(false); // Establecer el estado de carga a falso cuando los datos se han cargado
      })
      .catch((error) => {
        setLoading(false); // Establecer el estado de carga a falso en caso de error también
      });
  }, [id]);

  const getChartData = () => {
    const data = [
      {
        name: '7d',
        percentChange: parseFloat(coinDetail?.percentChange7d || '0'),
      },
      {
        name: '24h',
        percentChange: parseFloat(coinDetail?.percentChange24h || '0'),
      },
      {
        name: '1h',
        percentChange: parseFloat(coinDetail?.percentChange1h || '0'),
      },
    ];

    return {
      labels: data.map((item) => item.name),
      datasets: [
        {
          data: data.map((item) => item.percentChange),
        },
      ],
    };
  };

  if (loading) {
    // Mostrar el skeleton mientras se cargan los datos
    return (
      <View style={styles.container}>
        <View style={styles.skeletonCard}>
          <View style={styles.titleContainer}>
            <View style={styles.titleImage} />
            <View style={styles.titleSkeleton} />
          </View>
          <View style={styles.skeletonText} />
          <View style={styles.skeletonText} />
          <View style={styles.skeletonText} />
          <View style={styles.chartSkeleton} />
          <TouchableOpacity disabled style={[styles.convertButton, styles.skeletonButton]}>
            <Text style={[styles.convertButtonText, styles.skeletonButtonText]}>Convert Money</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackButton/>
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Image
            source={{ uri: `https://www.coinlore.com/img/25x25/${coinDetail?.nameid}.png` }}
            style={styles.titleImage}
          />
          <Text style={styles.coinName}>{coinDetail?.name}</Text>
        </View>
        <Text>Symbol: {coinDetail?.symbol}</Text>
        <Text>Price (USD): ${coinDetail?.priceUSD}</Text>

        {/* Gráfico de líneas */}
        <LineChart
          data={getChartData()}
          width={300}
          height={400}
          chartConfig={{
            backgroundGradientFrom: '#66CDAA',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 3, // Mostrar hasta 3 decimales
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, //blue color lines
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          bezier
          style={styles.chart}
        />

        <TouchableOpacity onPress={handleNavigateToExchangeScreen} style={styles.convertButton}>
          <Text style={styles.convertButtonText}>Convert Money</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    margin: 20,
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
  chart: {
    marginTop: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  coinName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  // Skeleton styles
  skeletonCard: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 16,
    margin: 20,
    alignItems: 'center',
  },
  titleSkeleton: {
    backgroundColor: '#d3d3d3',
    width: 100,
    height: 24,
    borderRadius: 4,
  },
  skeletonText: {
    backgroundColor: '#d3d3d3',
    width: 200,
    height: 18,
    borderRadius: 4,
    marginVertical: 4,
  },
  chartSkeleton: {
    backgroundColor: '#d3d3d3',
    width: 300,
    height: 400,
    borderRadius: 8,
    marginTop: 20,
  },
  skeletonButton: {
    backgroundColor: '#d3d3d3',
  },
  skeletonButtonText: {
    color: '#f2f2f2',
  },
});

export default CoinDetailScreen;
