
function EndPage({
  list,
  setList,
  winner,
  turn,
  player1,
  player2,
  setPlaying
}) {
  const handleClick = () => {
    setPlaying("start");
    setList([]);
    window.location.reload(false);
  };

  return (
    <div className="end">
      <h2>{!turn ? `${player1} Wins!` : `${player2} Wins!`}</h2>
      <h4>Your Game:</h4>
      {list.map((place) => {
        return (
          <ul>
            {place.charAt(0).toUpperCase() + place.toLowerCase().slice(1)}
          </ul>
        );
      })}
      <button className="home__btn" onClick={handleClick}>
        Home
      </button>
    </div>
  );
}

export default EndPage;
