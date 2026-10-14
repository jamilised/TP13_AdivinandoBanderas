import React from 'react';
import { View, Text } from 'react-native';
import { useGameContext } from '../../context/GameContext';
import styles from './styles';

export const Timer: React.FC = () => {
  const { timeLeft } = useGameContext();

  const isLowTime = timeLeft <= 5;

  return (
    <View style={[styles.badge, isLowTime && styles.lowTimeBadge]}>
      <Text style={[styles.timerText, isLowTime && styles.lowTimeText]}>
        ⏱️ {timeLeft}s
      </Text>
    </View>
  );
};