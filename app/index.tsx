import { useState } from 'react';
import QuizScreen from '../components/QuizScreen';
import ResultScreen from '../components/ResultScreen';
import StartScreen from '../components/StartScreen';
import questions from '../questions.json';

const ROUND_SIZE = 15;
const MAX_LIVES = 3;

type Question = (typeof questions)[number];

function createRound(): Question[] {
  return [...questions]
    .sort(() => Math.random() - 0.5)
    .slice(0, ROUND_SIZE);
}

export default function HomePage() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [roundQuestions, setRoundQuestions] = useState<Question[]>(createRound);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const currentQuestion = roundQuestions[currentQuestionIndex];

  const handleStartQuiz = () => {
    setRoundQuestions(createRound());
    setCurrentQuestionIndex(0);
    setScore(0);
    setLives(MAX_LIVES);
    setSelectedOption(null);
    setIsOptionsDisabled(false);
    setIsQuizFinished(false);
    setIsQuizStarted(true);
  };

  const handleOptionPress = (option: string) => {
    if (option === currentQuestion.correctAnswer) {
      setScore((currentScore) => currentScore + 1);
    } else {
      setLives((currentLives) => currentLives - 1);
    }
    setSelectedOption(option);
    setIsOptionsDisabled(true);

    if (option !== currentQuestion.correctAnswer && lives === 1) {
      setIsQuizFinished(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < roundQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsOptionsDisabled(false);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handlePlayAgain = () => {
    setRoundQuestions(createRound());
    setIsQuizFinished(false);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsOptionsDisabled(false);
    setScore(0);
    setLives(MAX_LIVES);
    setIsQuizStarted(true);
  };

  const handleBackToHome = () => {
    setIsQuizStarted(false);
    setIsQuizFinished(false);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsOptionsDisabled(false);
    setScore(0);
    setLives(MAX_LIVES);
  };

  if (!isQuizStarted) {
    return (
      <StartScreen
        onStartQuiz={handleStartQuiz}
        totalQuestions={ROUND_SIZE}
      />
    );
  }

  return isQuizFinished ? (
    <ResultScreen
      score={score}
      totalQuestions={roundQuestions.length}
      lives={lives}
      isGameOver={lives === 0}
      onPlayAgain={handlePlayAgain}
      onBackToHome={handleBackToHome}
    />
  ) : (
    <QuizScreen
      currentQuestion={currentQuestion}
      selectedOption={selectedOption}
      isOptionsDisabled={isOptionsDisabled}
      onOptionPress={handleOptionPress}
      onNextQuestion={handleNextQuestion}
      currentQuestionIndex={currentQuestionIndex}
      totalQuestions={roundQuestions.length}
      lives={lives}
    />
  );
}