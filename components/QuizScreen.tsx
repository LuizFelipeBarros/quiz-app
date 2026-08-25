import { useEffect, useRef } from 'react';
import { Animated, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const isSmallScreen = Dimensions.get('window').height < 700;

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type QuizScreenProps = {
  currentQuestion: Question;
  selectedOption: string | null;
  isOptionsDisabled: boolean;
  onOptionPress: (option: string) => void;
  onNextQuestion: () => void;
  currentQuestionIndex?: number;
  totalQuestions?: number;
  lives: number;
};

export default function QuizScreen({
  currentQuestion,
  selectedOption,
  isOptionsDisabled,
  onOptionPress,
  onNextQuestion,
  currentQuestionIndex = 0,
  totalQuestions = 1,
  lives,
}: QuizScreenProps) {
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 6,
      useNativeDriver: true,
    }).start();
  }, [currentQuestionIndex]);

  const getOptionStyle = (option: string) => {
    if (selectedOption) {
      const isCorrect = option === currentQuestion.correctAnswer;
      if (isCorrect) {
        return styles.correctOption;
      }
      if (option === selectedOption && !isCorrect) {
        return styles.incorrectOption;
      }
    }
    return {};
  };

  const getOptionTextStyle = (option: string) => {
    if (selectedOption) {
      if (option === currentQuestion.correctAnswer || option === selectedOption) {
        return styles.optionTextSelected;
      }
    }
    return styles.optionText;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>DESAFIO DA FIEL</Text>
          <Text style={styles.brand}>CORINTHIANS</Text>
        </View>
        <View style={styles.livesBadge}>
          <Text style={styles.livesLabel}>VIDAS</Text>
          <Text style={styles.livesValue}>{lives}/3</Text>
        </View>
        </View>

        <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {currentQuestionIndex + 1} de {totalQuestions}
        </Text>
        </View>

        <Animated.View
        style={[
          styles.questionContainer,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={styles.questionNumber}>QUESTÃO {String(currentQuestionIndex + 1).padStart(2, '0')}</Text>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </Animated.View>

        <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.option,
              getOptionStyle(option),
              isOptionsDisabled && styles.optionDisabled,
            ]}
            onPress={() => onOptionPress(option)}
            disabled={isOptionsDisabled}
            activeOpacity={0.7}
          >
            <View style={styles.optionBadge}>
              <Text style={styles.optionBadgeText}>
                {String.fromCharCode(65 + index)}
              </Text>
            </View>
            <View style={styles.optionCopy}>
              <Text style={styles.commandText}>{String.fromCharCode(65 + index)}</Text>
              <Text style={getOptionTextStyle(option)}>{option}</Text>
            </View>
          </TouchableOpacity>
        ))}
        </View>

        {selectedOption && (
          <View>
          <Text style={[
            styles.feedback,
            selectedOption === currentQuestion.correctAnswer ? styles.successText : styles.errorText,
          ]}>
            {selectedOption === currentQuestion.correctAnswer
              ? 'VAI CORINTHIANS!'
              : 'QUE ERRO! Resposta errada. Perdeu 1 vida!'}
          </Text>
          <TouchableOpacity style={styles.nextButton} onPress={onNextQuestion} activeOpacity={0.8}>
            <Text style={styles.nextButtonText}>Próxima jogada</Text>
          </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101112',
  },
  contentContainer: {
    padding: isSmallScreen ? 14 : 20,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: isSmallScreen ? 18 : 28,
  },
  eyebrow: {
    color: '#e31c2b',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  brand: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: '900',
    letterSpacing: 0,
  },
  livesBadge: {
    backgroundColor: '#1b1d20',
    borderLeftWidth: 3,
    borderLeftColor: '#e31c2b',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  livesLabel: {
    color: '#a8abb0',
    fontSize: 10,
    fontWeight: '800',
  },
  livesValue: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: '900',
  },
  progressContainer: {
    marginBottom: isSmallScreen ? 16 : 24,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#2b2e32',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#e31c2b',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    color: '#a8abb0',
    fontWeight: '600',
  },
  questionContainer: {
    backgroundColor: '#1b1d20',
    borderRadius: 4,
    padding: isSmallScreen ? 18 : 24,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#e31c2b',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  questionText: {
    fontSize: isSmallScreen ? 19 : 22,
    fontWeight: '700',
    textAlign: 'center',
    color: '#ffffff',
    lineHeight: isSmallScreen ? 26 : 30,
  },
  questionNumber: {
    color: '#a8abb0',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  optionsContainer: {
    justifyContent: 'flex-start',
    gap: 10,
    marginBottom: isSmallScreen ? 12 : 16,
  },
  option: {
    backgroundColor: '#1b1d20',
    padding: isSmallScreen ? 12 : 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2b2e32',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  optionDisabled: {
    opacity: 0.6,
  },
  optionBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2b2e32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  optionText: {
    fontSize: isSmallScreen ? 14 : 16,
    fontWeight: '500',
    color: '#ffffff',
    flex: 1,
  },
  optionTextSelected: {
    fontSize: isSmallScreen ? 14 : 16,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
  },
  optionCopy: {
    flex: 1,
  },
  commandText: {
    color: '#e31c2b',
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 3,
  },
  correctOption: {
    borderColor: '#10b981',
    backgroundColor: '#10b981',
    borderWidth: 2,
  },
  incorrectOption: {
    borderColor: '#ef4444',
    backgroundColor: '#ef4444',
    borderWidth: 2,
  },
  nextButton: {
    backgroundColor: '#e31c2b',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  feedback: {
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12,
  },
  successText: {
    color: '#4ade80',
  },
  errorText: {
    color: '#ff6873',
  },
});