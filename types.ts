
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export interface Coin {
  id: number;
  name: string;
  priceUSD: string;
}

export interface CoinDetail {
  id: number;
  symbol: string;
  name: string;
  priceUSD: string;
  percentChange24h: string;
  percentChange1h: string;
  percentChange7d: string;
}

export type RootStackParamList = {
  Coins: undefined;
  CoinDetailScreen: { id: number };
  Exchange: undefined;
  Profile: undefined;
};

// tipos de navegación para las pantallas en la pila (stack)
export type CoinsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Coins'>;
export type CoinDetailScreenRouteProp = RouteProp<RootStackParamList, 'CoinDetailScreen'>;
export type ExchangeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Exchange'>;
export type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;
