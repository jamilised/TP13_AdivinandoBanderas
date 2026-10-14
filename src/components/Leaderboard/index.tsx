import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useGameContext } from '../../context/GameContext';
import styles from './styles';

export const Leaderboard: React.FC = () => {
  const { leaderboard } = useGameContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Tabla de Posiciones</Text>
      {leaderboard.length === 0 ? (
        <Text style={styles.emptyText}>Aún no hay partidas registradas.</Text>
      ) : (
        <FlatList
          data={leaderboard.slice(0, 5)}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.row}>
              <Text style={styles.rank}>#{index + 1}</Text>
              <Text style={styles.name}>{item.playerName}</Text>
              <Text style={styles.mode}>[{item.mode}]</Text>
              <Text style={styles.score}>{item.score} pts</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};