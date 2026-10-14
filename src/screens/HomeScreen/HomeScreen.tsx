import React from 'react';
import { Text, TouchableOpacity, ScrollView } from 'react-native';
import { useGameContext } from '../../context/GameContext';
import { PlayerForm } from '../../components/PlayerForm';
import { ModeSelector } from '../../components/ModeSelector';
import { Leaderboard } from '../../components/Leaderboard';
import styles from './HomeScreen.styles';

export const HomeScreen: React.FC = () => {
  const { playerName, startGame, countries } = useGameContext();

  const isReady = playerName.trim().length > 0 && countries.length > 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌍 Flag & Capital Quiz</Text>
      <Text style={styles.subtitle}>¡Adivina y suma puntos en el ranking!</Text>

      <PlayerForm />
      <ModeSelector />

      <TouchableOpacity
        style={[styles.startButton, !isReady && styles.disabledButton]}
        disabled={!isReady}
        onPress={startGame}
      >
        <Text style={styles.startButtonText}>
          {countries.length === 0 ? 'Cargando datos...' : '¡Jugar Ahora!'}
        </Text>
      </TouchableOpacity>

      <Leaderboard />
    </ScrollView>
  );
};