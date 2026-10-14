import React from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useGameContext } from '../../context/GameContext';
import { Flag } from '../../components/Flag';
import { GuessForm } from '../../components/GuessForm';
import { ScoreBoard } from '../../components/ScoreBoard';
import { Timer } from '../../components/Timer';
import { Hints } from '../../components/Hints';
import styles from './GameScreen.styles';

export const GameScreen: React.FC = () => {
  const { endGame, resetScore } = useGameContext();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ScoreBoard />
      <Timer />
      <Flag />
      <Hints />
      <GuessForm />

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.resetButton} onPress={resetScore}>
          <Text style={styles.actionText}>Reiniciar Puntaje</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.exitButton} onPress={endGame}>
          <Text style={styles.actionText}>Finalizar Partida</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};