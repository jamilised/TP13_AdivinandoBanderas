import React from 'react';
import { View, Text } from 'react-native';
import { useGameContext } from '../../context/GameContext';
import styles from './styles';

export const ScoreBoard: React.FC = () => {
  const { score, playerName, gameMode, feedbackMessage } = useGameContext();

  return (
    <View style={styles.container}>
      <View style={styles.infoRow}>
        <Text style={styles.playerText}>👤 {playerName || 'Jugador'}</Text>
        <Text style={styles.modeBadge}>
          {gameMode === 'flag' ? '🚩 Modo Banderas' : '🏙️ Modo Capitales'}
        </Text>
      </View>
      <View style={styles.scoreRow}>
        <Text style={styles.scoreLabel}>Puntaje:</Text>
        <Text style={[styles.scoreValue, score < 0 && styles.negativeScore]}>{score}</Text>
      </View>
      {feedbackMessage && (
        <Text style={styles.feedbackText}>{feedbackMessage}</Text>
      )}
    </View>
  );
};