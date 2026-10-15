import React from 'react';
import { Text, TouchableOpacity, ScrollView, ActivityIndicator, View } from 'react-native';
import { useGameContext } from '../../context/GameContext';
import { PlayerForm } from '../../components/PlayerForm';
import { ModeSelector } from '../../components/ModeSelector';
import { Leaderboard } from '../../components/Leaderboard';
import styles from './HomeScreen.styles';

export const HomeScreen: React.FC = () => {
  const { playerName, startGame, countries, isLoading, error, reloadCountries } = useGameContext();

  const isReady = playerName.trim().length > 0 && countries.length > 0 && !isLoading;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌍 Flag & Capital Quiz</Text>
      <Text style={styles.subtitle}>¡Adivina y suma puntos en el ranking!</Text>

      {isLoading ? (
        <View style={{ marginVertical: 20, alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={{ marginTop: 10, color: '#666' }}>Cargando datos de países...</Text>
        </View>
      ) : error ? (
        <View style={{ marginVertical: 15, alignItems: 'center' }}>
          <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>
          <TouchableOpacity
            style={{ backgroundColor: '#007AFF', padding: 10, borderRadius: 8 }}
            onPress={reloadCountries}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <PlayerForm />
      <ModeSelector />

      <TouchableOpacity
        style={[styles.startButton, !isReady && styles.disabledButton]}
        disabled={!isReady}
        onPress={startGame}
      >
        <Text style={styles.startButtonText}>
          {isLoading ? 'Cargando datos...' : '¡Jugar Ahora!'}
        </Text>
      </TouchableOpacity>

      <Leaderboard />
    </ScrollView>
  );
};