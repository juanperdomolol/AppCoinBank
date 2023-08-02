import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const BackButton: React.FC = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={handleGoBack} style={styles.buttonContainer}>
      <LottieView
        source={require('../assets/backLottie.json')}
        style={styles.buttonLottie}
        autoPlay
        loop={false}
      />
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 20, 
        left: 20, 
      },
  buttonContainer: {
    padding: 10,
  },
  buttonLottie: {
    width: 30,
    height: 30,
  },
});

export default BackButton;
