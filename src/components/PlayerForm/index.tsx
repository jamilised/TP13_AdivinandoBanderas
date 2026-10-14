import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { useGameContext } from '../../context/GameContext';
import styles from './styles';

export const PlayerForm: React.FC = () => {
  const { playerName, setPlayerName } = useGameContext();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre del Jugador:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu nombre..."
        value={playerName}
        onChangeText={setPlayerName}
        autoCapitalize="words"
      />
    </View>
  );
};