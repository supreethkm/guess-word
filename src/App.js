import { useEffect, useState } from 'react';
import './App.css';
import * as hgmn from './hangman'

const style ={
  guessInput:{
    textTransform: "capitalize",
    height: "50px",
    width: "50px",
    fontSize: "40px",
    margin: 0,
    padding: 0,
  }
}
function App() {
  const [gussedLetter,setGussedLetter] = useState("");
  const [inputLetter,setInputLetter] = useState("");
  const [alphabets,setAlphabets] = useState(hgmn.alphabets);
  const [remAlphabets,setRemAlphabets] = useState(hgmn.alphabets);
  const [selectedWord,setSelectedWord] = useState("");
  const [remLetr,setRemLetr] = useState([]);
  const [usedLetters,setUsedLetters] = useState([]);
  const [message,setMessage] = useState("");
  const [displayWord,setDisplayWord] = useState();
  const [resetWord,setResetWord] = useState(false);

  


  const displayWordHand = () => {
    const disArray = [];
    for(let letr of selectedWord){
      if(usedLetters.includes(letr)){
        disArray.push(letr);
      } else{
        disArray.push("-");
      }
    }
    setDisplayWord(disArray.join(" "));
  }
  
  const guessWord = ()=>{
    setMessage("");
    if(remAlphabets.includes(gussedLetter)){
      remAlphabets.splice(remAlphabets.indexOf(gussedLetter),1)
      setRemAlphabets(remAlphabets);
      setUsedLetters([...usedLetters, gussedLetter]);
      if(remLetr.has(gussedLetter)){
        remLetr.delete(gussedLetter)
        setRemLetr(new Set(remLetr));
        if(remLetr.size ===0){
          setMessage("You guessed right !! word is " + selectedWord)
        }
      }
    }
    else{
      setMessage("Letter already used !!")
    }
  }

  useEffect(displayWordHand,[remLetr]);
  useEffect(guessWord,[gussedLetter]);

  useEffect(() => {
    setSelectedWord(hgmn.getWord());
  },[resetWord])

  useEffect(() => {
    setRemLetr(new Set(selectedWord));
  },[selectedWord])

  console.log(selectedWord)

  const handleGuessedLetter = (evnt)=>{
    let lettr = evnt.target.value.toUpperCase()
    lettr = lettr[lettr.length - 1]
    console.log(lettr);
    setGussedLetter(lettr);
    setInputLetter(lettr);
  }
  const changeWord = (evnt) => {
    window.location.reload();
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>Used words {usedLetters.join(" ")}</h3>
        <h2>Guess the word</h2>
        <h1>{displayWord}</h1>
        <title for="guessLetter">Guess the letter</title>
        <input id="guessLetter" style={style.guessInput} onChange={handleGuessedLetter}  type="text" value={inputLetter}></input>
        <p>{message}</p>
        <button onClick={changeWord}>Start Again</button>
      </header>
    </div>
  );
}

export default App;
