# Quiz do Timao

Aplicativo mobile de perguntas e respostas sobre o Sport Club Corinthians Paulista, desenvolvido com React Native, Expo e TypeScript.

(print)

## Sobre o jogo

O jogador enfrenta uma rodada com 15 perguntas escolhidas aleatoriamente a partir de um banco com 40 perguntas sobre a historia, os idolos e as conquistas do Corinthians.

### Regras

- A partida comeca com 3 Vidas, tambem chamadas de Chances de Titulo.
- Cada resposta correta marca 1 Gol Marcado.
- Cada resposta errada remove 1 vida.
- A partida termina imediatamente quando as 3 vidas acabam.
- Ao responder as 15 perguntas com pelo menos 1 vida, o jogador vence.
- Uma nova partida embaralha novamente o banco de perguntas e seleciona outra rodada.

### Identidade do Corinthians

- Acerto: **GOL DO TIMAO! VAI CORINTHIANS!**
- Erro: **FALTA FEIA! Resposta errada. Perdeu 1 vida!**
- Eliminacao: **Fim de jogo! O Timao foi eliminado. Tente novamente!**
- Vitoria: **E CAMPEAO! Voce levantou a taca marcando X gols!**
- Comandos exibidos nas alternativas: `!chutar A`, `!chutar B`, `!chutar C` e `!chutar D`.

## Funcionalidades

- Tela inicial com resumo da rodada e das vidas.
- Selecao aleatoria de 15 perguntas por partida.
- Barra de progresso da rodada.
- Indicador de vidas restantes.
- Feedback visual para respostas corretas e incorretas.
- Tela final com gols marcados, percentual e resultado da campanha.
- Layout responsivo com rolagem para perguntas longas em celulares.
- Animacoes de entrada e transicao entre perguntas.

## Tecnologias

- React Native 0.81
- Expo SDK 54
- Expo Router
- TypeScript
- React Native Animated API

## Como executar

### Requisitos

- Node.js 20.19 ou superior
- npm
- Expo Go no celular, ou um emulador Android/iOS

### Instalacao

```bash
npm install
```

### Iniciar o projeto

```bash
npx expo start
```

Depois, escaneie o QR code com o Expo Go ou use uma das opcoes do terminal:

```bash
npx expo start --android
npx expo start --ios
npx expo start --web
```

### Verificacoes

```bash
npx tsc --noEmit
npm run lint
```

O lint tambem verifica arquivos demonstrativos do projeto. Erros nesses arquivos podem aparecer mesmo quando o quiz estiver funcionando normalmente.

## Estrutura principal

```text
quiz-app/
├── app/
│   ├── _layout.tsx          # Configuracao do Expo Router
│   └── index.tsx            # Estado e regras da partida
├── components/
│   ├── StartScreen.tsx      # Tela inicial
│   ├── QuizScreen.tsx       # Perguntas, alternativas e feedback
│   ├── ResultScreen.tsx     # Vitoria ou eliminacao
│   └── ExemploSemUseState.tsx
├── questions.json           # Banco de perguntas
├── app.json                 # Configuracao do Expo
└── package.json             # Dependencias e scripts
```

## Como adicionar perguntas

Edite `questions.json` mantendo o formato abaixo. O campo `correctAnswer` deve ser exatamente igual a uma das opcoes:

```json
{
  "question": "Qual e o mascote do Corinthians?",
  "options": ["O Mosqueteiro", "O Galo", "O Leao", "O Gato"],
  "correctAnswer": "O Mosqueteiro"
}
```

O banco deve conter pelo menos 15 perguntas para que uma rodada completa possa ser criada.

## PrintScreen

![Uploading image.png…]()


## Paleta visual

- Fundo: `#101112`
- Superficie: `#1B1D20`
- Vermelho principal: `#E31C2B`
- Texto claro: `#FFFFFF`
- Texto secundario: `#A8ABB0`
- Acerto: `#4ADE80`
- Erro: `#FF6873`

## Licenca

Este projeto esta sob a licenca MIT.


## Criador

criado por Luiz Felipe de Lima Barros
