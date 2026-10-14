import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useGameContext } from '../../context/GameContext';
import styles from './styles';

export const Hints: React.FC = () => {
  const { requestHint, revealedLettersCount, currentCountry, gameMode, timeLeft } = useGameContext();

  const getRevealedText = () => {
    if (!currentCountry) return '';
    const name = currentCountry.name;
    return name
      .split('')
      .map((char, index) => {
        if (char === ' ') return '  ';
        return index < revealedLettersCount ? char : '_';
      })
      .join(' ');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.hintButton, timeLeft <= 2 && styles.disabledButton]}
        onPress={requestHint}
        disabled={timeLeft <= 2}
      >
        <Text style={styles.hintButtonText}>💡 Pedir Pista (-2s)</Text>
      </TouchableOpacity>

      {gameMode === 'flag' && revealedLettersCount > 0 && (
        <Text style={styles.revealedText}>{getRevealedText()}</Text>
      )}
    </View>
  );
};