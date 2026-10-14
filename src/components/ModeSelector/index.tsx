import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useGameContext } from '../../context/GameContext';
import styles from './styles';

export const ModeSelector: React.FC = () => {
  const { gameMode, setGameMode } = useGameContext();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Modo de Juego:</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, gameMode === 'flag' && styles.activeButton]}
          onPress={() => setGameMode('flag')}
        >
          <Text style={[styles.text, gameMode === 'flag' && styles.activeText]}>🚩 Banderas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, gameMode === 'capital' && styles.activeButton]}
          onPress={() => setGameMode('capital')}
        >
          <Text style={[styles.text, gameMode === 'capital' && styles.activeText]}>🏙️ Capitales</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};