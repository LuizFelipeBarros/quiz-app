import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type StartScreenProps = {
  onStartQuiz: () => void;
  totalQuestions: number;
};

export default function StartScreen({
  onStartQuiz,
  totalQuestions,
}: StartScreenProps) {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        <Text style={styles.kicker}>SPORT CLUB CORINTHIANS PAULISTA</Text>
        <View style={styles.crestMark}>
          <Text style={styles.crestText}>SCCP</Text>
        </View>

        <Text style={styles.title}>QUIZ DO TIMÃO</Text>

        {/* Descrição */}
        <Text style={styles.description}>
          Quinze perguntas. Três vidas. Uma só paixão.
        </Text>

        {/* Informações */}
        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Text style={styles.infoNumber}>{totalQuestions}</Text>
            <Text style={styles.infoLabel}>RODADAS</Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoBox}>
            <Text style={styles.infoNumber}>3</Text>
            <Text style={styles.infoLabel}>VIDAS</Text>
          </View>
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>COMO JOGAR</Text>
          <Text style={styles.tipItem}>Responda escolhendo as alternativas A, B, C ou D.</Text>
          <Text style={styles.tipItem}>Cada erro custa uma Chance de Título.</Text>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={onStartQuiz}
          activeOpacity={0.8}
        >
          <Text style={styles.startButtonText}>COMEÇAR QUIZ</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101112',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  content: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  kicker: {
    color: '#a8abb0',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 16,
    textAlign: 'center',
  },
  crestMark: {
    width: 94,
    height: 94,
    borderRadius: 47,
    borderWidth: 3,
    borderColor: '#e31c2b',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  crestText: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: '900',
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#a8abb0',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#1b1d20',
    borderRadius: 4,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  infoBox: {
    alignItems: 'center',
    flex: 1,
  },
  infoNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: '#3b82f6',
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '600',
  },
  infoDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e5e7eb',
  },
  tipsContainer: {
    width: '100%',
    backgroundColor: '#1b1d20',
    borderRadius: 4,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#e31c2b',
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#e31c2b',
    marginBottom: 8,
  },
  tipItem: {
    fontSize: 13,
    color: '#d7d9dc',
    marginBottom: 6,
    lineHeight: 18,
  },
  startButton: {
    backgroundColor: '#e31c2b',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 4,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
});
