import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CoinsScreen from './src/screens/CoinsScreen';
import CoinDetailScreen from './src/screens/CoinDetailScreen';
import ExchangeScreen from './src/screens/ExchangeScreen';
import ProfileScreen from './src/screens/ProfileScreen';

import exchange from './assets/exchange.png';
import bitcoin from './assets/bitcoin.png';
import ProfileIcon from './src/icons/ProfileIcon';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CoinsStack() {
  return (
    <Stack.Navigator  screenOptions={{
      // headerShown: false,
      headerStyle:{
        backgroundColor: '#ef6372'
      },
      
  }}>
      <Stack.Screen name="CoinScreen" component={CoinsScreen} />
      <Stack.Screen name="CoinDetailScreen" component={CoinDetailScreen} />
    </Stack.Navigator>
  );
}

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Coins" component={CoinsStack}
         options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) =>
          <Image  
          style={{ tintColor : color, width: size, height:size}} 
          source={bitcoin}  />,
        }}  />
        <Tab.Screen name="Exchange" component={ExchangeScreen}
        options={{
          tabBarIcon: ({ color, size }) =>
           <Image  
              style={{ tintColor : color, width: size, height:size}} 
              source={exchange} />,
          headerShown: false

        }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{
          tabBarIcon: ({ color, size }) => <ProfileIcon color={color} size={size} />,
          // drawerLabel: "Profile"
          headerShown: false
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
