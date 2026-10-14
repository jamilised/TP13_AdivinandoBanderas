import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { Image } from 'expo-image';
import { useGameContext } from '../../context/GameContext';
import styles from './styles';

export const Flag: React.FC = () => {
  const { currentCountry } = useGameContext();

  if (!currentCountry) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Cargando bandera...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: currentCountry.flag }}
        style={styles.image}
        contentFit="contain"
        transition={300}
      />
    </View>
  );
};