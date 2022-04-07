import React, { useEffect, useRef, useState } from "react";

function Game({
  countries,
  setCountries,
  player1,
  player2,
  setPlaying,
  list,
  setList,
  setWinner,
  turn,
  setTurn
}) {
  const [guess, setGuess] = useState("");
  const [correct, setCorrect] = useState(null);
  const [letter, setLetter] = useState("A");
  const [tries, setTries] = useState(3);
  const [location, setLocation] = useState("");
  const [counter, setCounter] = useState(60);
  const [suddenDeath, setSuddenDeath] = useState(false);

  useEffect(() => {
    if (counter > 0) {
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    } else if (counter < 1 && correct) {
      setCounter(60);
      setTurn(!turn);
      setTries(3);
      setGuess("");
      setCorrect(null);
    } else if (counter < 1) {
      setCounter(60);
      setTurn(!turn);
      setTries(3);
      setGuess("");
      setSuddenDeath(!suddenDeath);
      setCorrect(null);
    }
  }, [counter, turn, suddenDeath, setTurn, correct]);

  function getFocus() {
    document.getElementById("myTextField").focus();
  }

  const handleGuess = (e) => {
    e.preventDefault();
    if (correct) {
      if (suddenDeath) {
        // alert(!turn ? `${player1} Wins!` : `${player2} Wins!`);
        setPlaying("end");
        setWinner(!turn ? { player1 } : { player2 });
        // window.location.reload(false);
      }
      // setCorrect(null);
      setCounter(0);
      // setTurn(!turn)
      setList([...list, guess]);
      getFocus();
      setGuess("");
      setLocation(guess.charAt(0).toUpperCase() + guess.toLowerCase().slice(1));
      // setCountries(countries.splice(countries.indexOf(guess.charAt(0).toUpperCase() + guess.slice(1), 1)))
      let index = countries.indexOf(
        guess.charAt(0).toUpperCase() + guess.slice(1)
      );
      console.log(countries.splice(index, 1));
      setLetter(guess[guess.length - 1]);
    } else {
      if (tries > 1) {
        setTries(tries - 1);
      } else {
        setCounter(60);
        setTurn(!turn);
        setTries(3);
        setGuess("");
        setSuddenDeath(!suddenDeath);
      }
    }
  };

  const handleChange = (e) => {
    setGuess(e.target.value);
    if (
      countries.some(
        (country) => country.toLowerCase() === e.target.value.toLowerCase()
      ) &&
      e.target.value.toLowerCase().startsWith(letter.toLowerCase())
    ) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  };

  // const livesclass = () => {
  //   if (tries === 3) {
  //     return "threelives";
  //   } else if (tries === 2) {
  //     return "twolives";
  //   } else {
  //     return "onelife";
  //   }
  // };

  const inputRef = useRef();

  return (
    <div className="start">
      {!turn ? (
        <h2>
          {player1}'s {!suddenDeath ? "Turn" : "Chance to Win"}
        </h2>
      ) : (
        <h2>
          {player2}'s {!suddenDeath ? "Turn" : "Chance to Win"}
        </h2>
      )}
      {location === "" ? (
        <h3>Start with a location starting with 'A'</h3>
      ) : (
        <h3>Previous Location: {location}</h3>
      )}
      {/* <h4>{tries} Attempts Remaning</h4> */}
      <form onSubmit={handleGuess}>
        <input
          id="myTextField"
          required
          value={guess}
          type="text"
          placeholder={letter.toUpperCase()}
          onChange={handleChange}
          className="locationinput"
          ref={inputRef}
          // className={correct ? 'correct' : 'incorrect'}
        />
        <br />
        <div className={suddenDeath ? "bottom3" : "bottom2"}>
          <button className="pushy__btn" type="submit">
            Submit
          </button>
          <div className="lives">♡{tries}</div>
          {/* {suddenDeath ? <div className="sd">SD</div> : null} */}
        </div>
      </form>
      <br />
      <div className="counter">
        <div className={counter > 10 || counter < 1 ? "timer" : "redtimer"}>
          {counter > 9 || counter < 1 ? counter : "0" + counter}
        </div>
      </div>
    </div>
  );
}

export default Game;
