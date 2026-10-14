import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Country, GameMode, PlayerScore } from '../types/game';
import { fetchCountriesWithCapitals } from '../services/api';

const LEADERBOARD_KEY = '@flag_game_leaderboard';
const INITIAL_TIMER = 15;

interface GameContextType {
  countries: Country[];
  currentCountry: Country | null;
  score: number;
  playerName: string;
  gameMode: GameMode;
  timeLeft: number;
  isPlaying: boolean;
  capitalOptions: string[];
  disabledOptions: string[];
  revealedLettersCount: number;
  leaderboard: PlayerScore[];
  feedbackMessage: string | null;
  setPlayerName: (name: string) => void;
  setGameMode: (mode: GameMode) => void;
  startGame: () => void;
  endGame: () => void;
  guessFlag: (guess: string) => boolean;
  guessCapital: (selectedCapital: string) => boolean;
  requestHint: () => void;
  resetScore: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [score, setScore] = useState<number>(0);
  const [playerName, setPlayerName] = useState<string>('');
  const [gameMode, setGameMode] = useState<GameMode>('flag');
  const [timeLeft, setTimeLeft] = useState<number>(INITIAL_TIMER);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [capitalOptions, setCapitalOptions] = useState<string[]>([]);
  const [disabledOptions, setDisabledOptions] = useState<string[]>([]);
  const [revealedLettersCount, setRevealedLettersCount] = useState<number>(0);
  const [leaderboard, setLeaderboard] = useState<PlayerScore[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Carga inicial de datos y leaderboard almacenado
  useEffect(() => {
    const initData = async () => {
      const data = await fetchCountriesWithCapitals();
      setCountries(data);
      loadLeaderboard();
    };
    initData();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const saved = await AsyncStorage.getItem(LEADERBOARD_KEY);
      if (saved) setLeaderboard(JSON.parse(saved));
    } catch (e) {
      console.error('Error cargando leaderboard', e);
    }
  };

  const saveScoreToLeaderboard = async (finalScore: number) => {
    if (!playerName.trim()) return;
    const newEntry: PlayerScore = {
      id: Date.now().toString(),
      playerName: playerName.trim(),
      score: finalScore,
      mode: gameMode,
      date: new Date().toLocaleDateString(),
    };
    const updated = [...leaderboard, newEntry].sort((a, b) => b.score - a.score);
    setLeaderboard(updated);
    try {
      await AsyncStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error guardando en leaderboard', e);
    }
  };

  // Generar 3 opciones para el modo capitales
  const generateCapitalOptions = useCallback((targetCountry: Country, allCountries: Country[]) => {
    const wrongCapitals = allCountries
      .filter((c) => c.name !== targetCountry.name && c.capital)
      .map((c) => c.capital as string);

    const shuffledWrong = wrongCapitals.sort(() => 0.5 - Math.random());
    const options = [targetCountry.capital as string, shuffledWrong[0], shuffledWrong[1]];
    setCapitalOptions(options.sort(() => 0.5 - Math.random()));
    setDisabledOptions([]);
  }, []);

  // Seleccionar un nuevo país al azar
  const nextCountry = useCallback((countryList = countries) => {
    if (countryList.length === 0) return;
    const randomIndex = Math.floor(Math.random() * countryList.length);
    const selected = countryList[randomIndex];
    setCurrentCountry(selected);
    setTimeLeft(INITIAL_TIMER);
    setRevealedLettersCount(0);
    setDisabledOptions([]);

    if (gameMode === 'capital') {
      generateCapitalOptions(selected, countryList);
    }
  }, [countries, gameMode, generateCapitalOptions]);

  const startGame = () => {
    if (!playerName.trim()) return;
    setScore(0);
    setIsPlaying(true);
    nextCountry();
  };

  const endGame = () => {
    setIsPlaying(false);
    saveScoreToLeaderboard(score);
  };

  const resetScore = () => {
    setScore(0);
    nextCountry();
  };

  // Timer regresivo
  useEffect(() => {
    if (!isPlaying || !currentCountry) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setScore((s) => s - 1);
          setFeedbackMessage('¡Tiempo agotado! -1 pt');
          setTimeout(() => setFeedbackMessage(null), 1500);
          nextCountry();
          return INITIAL_TIMER;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentCountry, nextCountry]);

  // Adivinar Bandera
  const guessFlag = (guess: string): boolean => {
    if (!currentCountry) return false;
    const isCorrect = guess.trim().toLowerCase() === currentCountry.name.toLowerCase();

    if (isCorrect) {
      const earned = 10 + timeLeft;
      setScore((prev) => prev + earned);
      setFeedbackMessage(`¡Correcto! +${earned} pts`);
      setTimeout(() => setFeedbackMessage(null), 1500);
      nextCountry();
      return true;
    } else {
      setScore((prev) => prev - 1);
      setFeedbackMessage('Respuesta incorrecta (-1 pt)');
      setTimeout(() => setFeedbackMessage(null), 1200);
      return false;
    }
  };

  // Adivinar Capital
  const guessCapital = (selectedCapital: string): boolean => {
    if (!currentCountry) return false;
    const isCorrect = selectedCapital === currentCountry.capital;

    if (isCorrect) {
      const earned = 10 + timeLeft;
      setScore((prev) => prev + earned);
      setFeedbackMessage(`¡Capital Correcta! +${earned} pts`);
      setTimeout(() => setFeedbackMessage(null), 1500);
      nextCountry();
      return true;
    } else {
      setScore((prev) => prev - 1);
      setFeedbackMessage('Capital incorrecta (-1 pt)');
      setTimeout(() => setFeedbackMessage(null), 1200);
      return false;
    }
  };

  // Pistas: Descuenta 2s de timer
  const requestHint = () => {
    if (timeLeft <= 2) return;
    setTimeLeft((prev) => Math.max(1, prev - 2));

    if (gameMode === 'flag') {
      if (currentCountry && revealedLettersCount < currentCountry.name.length) {
        setRevealedLettersCount((prev) => prev + 1);
      }
    } else {
      if (currentCountry) {
        const incorrects = capitalOptions.filter(
          (opt) => opt !== currentCountry.capital && !disabledOptions.includes(opt)
        );
        if (incorrects.length > 0) {
          setDisabledOptions((prev) => [...prev, incorrects[0]]);
        }
      }
    }
  };

  return (
    <GameContext.Provider
      value={{
        countries,
        currentCountry,
        score,
        playerName,
        gameMode,
        timeLeft,
        isPlaying,
        capitalOptions,
        disabledOptions,
        revealedLettersCount,
        leaderboard,
        feedbackMessage,
        setPlayerName,
        setGameMode,
        startGame,
        endGame,
        guessFlag,
        guessCapital,
        requestHint,
        resetScore,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext debe usarse dentro de un GameProvider');
  }
  return context;
};