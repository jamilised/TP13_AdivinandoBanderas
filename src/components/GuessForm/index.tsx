import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useGameContext } from '../../context/GameContext';
import styles from './styles';

export const GuessForm: React.FC = () => {
  const { gameMode, capitalOptions, disabledOptions, guessFlag, guessCapital } = useGameContext();
  const [inputText, setInputText] = useState('');

  const handleSubmitFlag = () => {
    if (!inputText.trim()) return;
    guessFlag(inputText);
    setInputText('');
  };

  if (gameMode === 'capital') {
    return (
      <View style={styles.optionsContainer}>
        <Text style={styles.subTitle}>¿Cuál es la capital de este país?</Text>
        {capitalOptions.map((option, index) => {
          const isDisabled = disabledOptions.includes(option);
          return (
            <TouchableOpacity
              key={index}
              style={[styles.optionButton, isDisabled && styles.disabledButton]}
              disabled={isDisabled}
              onPress={() => guessCapital(option)}
            >
              <Text style={[styles.optionText, isDisabled && styles.disabledText]}>
                {isDisabled ? '❌ Descartada' : option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Escribe el nombre del país..."
        placeholderTextColor="#999"
        value={inputText}
        onChangeText={setInputText}
        autoCapitalize="words"
        autoCorrect={false}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmitFlag}>
        <Text style={styles.buttonText}>Arriesgar</Text>
      </TouchableOpacity>
    </View>
  );
};