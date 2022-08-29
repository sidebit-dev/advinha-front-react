// CSS
import './App.css';

// React
import { useCallback, useEffect, useState } from 'react'; 

//Data
import {wordsList} from "./data/words";

//Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"}
];

const guessesQty = 3;

function App() {
  const [gameStage, setGameStage] = useState(stages[2].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  // Primeira jogada
  const [jogada, setJogada] = useState(0);

  const pickedWordAndCategory = useCallback(() => {
    // pick a random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // console.log(category);

    // pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    // console.log(word);

    return { word, category };

  }, [words]);

  // starts the secret word game
  const startGame = useCallback(() => {
    // clear all letters
    clearLetterStates();
 
   // pick word and pick category
    const { word, category } = pickedWordAndCategory();

    // create an array of letters
    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase())

    // console.log(word, category);
    // console.log(wordLetters);

    // fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickedWordAndCategory]);

  // Process the letter input
  const verifyLetter = (letter) => {
    //console.log(letter);
    const normalizedLetter = letter.toLowerCase();

    // check is letter has alread been utilized
    if(guessedLetters.includes(normalizedLetter) || 
    wrongLetters.includes(normalizedLetter)
    ){
      return;
    };

    // push guessed letter or remove a guess
    if(letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses -1);
    }
  };


  // console.log(guessedLetters);
  // console.log(wrongLetters);
  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
     }

   // check if guesses ended
  useEffect(() => {

    if(guesses <= 0) {
      // reset all states
      clearLetterStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // check win condition
  useEffect(() => {

    const uniqueLetters = [...new Set(letters)];

    // win condition
    if(guessedLetters.length === uniqueLetters.length) {
      // add score
      if(jogada === 0){
        setJogada(1);
      } else {
        setScore((actualScore) => actualScore += 100);
      }     

      // restart game with new word
      startGame();
    }

    // console.log(uniqueLetters);

  }, [guessedLetters, letters, startGame, jogada]);

  // Restart the game
  const retry = () => {
    setScore(0);
    setJogada(0);
    setGuesses(guessesQty);

    setGameStage(stages[0].name);    
  };

  return (
    <div className="App">
     {gameStage === 'start' &&  <StartScreen startGame={startGame} />}
     {gameStage === 'game' &&  
     <Game  
     verifyLetter={verifyLetter} 
     pickedWord={pickedWord} 
     pickedCategory={pickedCategory} 
     letters={letters} 
     guessedLetters={guessedLetters} 
     wrongLetters={wrongLetters}
     guesses={guesses}
     score={score}
     />}
     {gameStage === 'end' &&  <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
