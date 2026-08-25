import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ResultScreenProps = {
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
  onBackToHome?: () => void;
  lives: number;
  isGameOver: boolean;
};

export default function ResultScreen({
  score,
  totalQuestions,
  onPlayAgain,
  onBackToHome,
  lives,
  isGameOver,
}: ResultScreenProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const percentage = (score / totalQuestions) * 100;
  const isExcellent = percentage === 100;
  const isGood = percentage >= 70;
  const isOkay = percentage >= 40;

  const getResultColor = () => {
    if (isExcellent) return '#10B981';
    if (isGood) return '#3B82F6';
    if (isOkay) return '#F59E0B';
    return '#EF4444';
  };

  const getResultMessage = () => {
    if (isGameOver) return 'ELIMINADO';
    if (isExcellent) return 'É CAMPEÃO!';
    if (isGood) return 'VAI CORINTHIANS!';
    if (isOkay) return 'BOA CAMPANHA';
    return 'FIM DE JOGO';
  };

  const getEncouragement = () => {
    if (isGameOver) return 'Fim de jogo! O Timão foi eliminado. Tente novamente!';
    return `É CAMPEÃO! Você levantou a taça marcando ${score} gols!`;
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.resultCard,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        <View style={[styles.resultMark, { borderColor: getResultColor() }]}>
          <Text style={[styles.resultMarkText, { color: getResultColor() }]}>{isGameOver ? '0' : score}</Text>
        </View>

        <Text style={[styles.resultMessage, { color: getResultColor() }]}>
          {getResultMessage()}
        </Text>

        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>GOLS MARCADOS</Text>
          <Text style={styles.totalText}>{score} de {totalQuestions}</Text>
          <Text style={styles.livesText}>{lives} {lives === 1 ? 'vida restante' : 'vidas restantes'}</Text>
        </View>

        <View style={styles.percentageContainer}>
          <View
            style={[
              styles.percentageBar,
              { backgroundColor: getResultColor() },
              { width: `${percentage}%` },
            ]}
          />
        </View>
        <Text style={styles.percentageText}>{Math.round(percentage)}%</Text>

        <Text style={styles.encouragementText}>{getEncouragement()}</Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.playAgainButton,
              { backgroundColor: getResultColor() },
            ]}
            onPress={onPlayAgain}
          >
            <Text style={styles.playAgainButtonText}>NOVA PARTIDA</Text>
          </TouchableOpacity>

          {onBackToHome && (
            <TouchableOpacity
              style={styles.homeButton}
              onPress={onBackToHome}
            >
              <Text style={styles.homeButtonText}>VOLTAR AO INÍCIO</Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101112',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultCard: {
    backgroundColor: '#1b1d20',
    borderRadius: 4,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  resultMark: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  resultMarkText: {
    fontSize: 42,
    fontWeight: '900',
    color: '#ffffff',
  },
  resultMessage: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  totalText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '500',
  },
  scoreLabel: {
    color: '#e31c2b',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 6,
  },
  livesText: {
    color: '#a8abb0',
    fontSize: 13,
    marginTop: 8,
  },
  percentageContainer: {
    width: '100%',
    height: 12,
    backgroundColor: '#2b2e32',
    borderRadius: 6,
    marginBottom: 8,
    overflow: 'hidden',
  },
  percentageBar: {
    height: '100%',
    borderRadius: 6,
  },
  percentageText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#a8abb0',
    marginBottom: 20,
  },
  encouragementText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#d7d9dc',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 24,
  },
  buttonsContainer: {
    width: '100%',
    gap: 12,
  },
  playAgainButton: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 4,
    width: '100%',
    alignItems: 'center',
  },
  playAgainButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  homeButton: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#2b2e32',
    borderWidth: 1,
    borderColor: '#45484d',
  },
  homeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
