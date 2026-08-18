import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react'; // Importamos o useState
import questions from '../questions.json';

export default function QuizScreen() {
  // Criamos um estado para guardar o índice da pergunta atual, começando em 0
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Usamos a variável de estado para buscar a pergunta correta no array
  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionPress = (selectedOption: string) => {
    console.log('Opção selecionada:', selectedOption);
  };

  return (
    <View style={styles.container}>
      {/* Container para a Pergunta */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>

      {/* Container para as Alternativas */}
      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option) => (
          <TouchableOpacity key={option} style={styles.option}>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// Os estilos que criamos no capítulo anterior continuam os mesmos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 16,
  },
  questionContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
    marginBottom: 20,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  option: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  optionText: {
    fontSize: 18,
  },
});