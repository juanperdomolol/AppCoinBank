import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import LottieView from 'lottie-react-native';

interface ProfileScreenProps {}

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const githubUrl: string = 'https://github.com/juanperdomolol';
  const linkedinUrl: string = 'https://www.linkedin.com/in/juan-valent%C3%ADn-perdomo-bonilla-254793152/';

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err: any) => console.error('Error al abrir el enlace:', err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hello, I'm Juan Valentin Perdomo Bonilla</Text>
      <Text style={styles.description}>
        I'm a developer passionate about creating mobile applications using React Native with TypeScript.
        For this app, I utilized Zustand as the state management solution and added delightful animations using Lottie.
        The primary purpose of this app is to facilitate cryptocurrency conversion, enabling users to track
        cryptocurrency performance, explore details, and perform currency conversions.
      </Text>
      <LottieView
        source={require('../assets/developerLottie.json')}
        autoPlay
        loop
        style={styles.lottieAnimation}
      />
      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => openLink(githubUrl)} style={styles.linkButton}>
          <Image source={require('../assets/github.png')} style={styles.icon} />
          <Text style={styles.linkText}>GitHub</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink(linkedinUrl)} style={styles.linkButton}>
          <Image source={require('../assets/linkedin.png')} style={styles.icon} />
          <Text style={styles.linkText}>LinkedIn</Text>
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
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  lottieAnimation: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  icon: {
    width: 40,
    height: 40,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Fondo blanco para el botón
    borderRadius: 20, // Bordes redondeados
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 8,
  },
  linkText: {
    marginLeft: 8,
  },
});

export default ProfileScreen;
