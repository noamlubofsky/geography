
function StartPage({ setPlaying, setPlayer1, setPlayer2 }) {
  return (
    <div className="start">
      <div>
        {/* <h3>Player One</h3> */}
        <input
          className="input"
          required
          type="text"
          placeholder="Player One"
          onChange={(e) => setPlayer1(e.target.value)}
        />
      </div>
      <div>
        {/* <h3>Player Two</h3> */}
        <input
          className="input"
          required
          type="text"
          placeholder="Player Two"
          onChange={(e) => setPlayer2(e.target.value)}
        />
      </div>
      <br />
      <button className="home__btn" onClick={() => setPlaying("game")}>
        Play
      </button>
    </div>
  );
}

export default StartPage;
