import {create} from 'zustand';
import { Coin } from '../types';

interface CoinStoreState {
  coins: Coin[];
  selectedCoin: Coin | null;
  setCoins: (coins: Coin[]) => void;
  setSelectedCoin: (coin: Coin) => void;
}

export const useCoinStore = create<CoinStoreState>((set) => ({
  coins: [],
  selectedCoin: null,
  setCoins: (coins: Coin[]) => set({ coins }),
  setSelectedCoin: (coin: Coin) => set({ selectedCoin: coin }),
}));

export default useCoinStore;
