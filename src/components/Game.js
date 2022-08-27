import './Game.css';

const Game = ({verifyLetter}) => {
  return (
    <div className='game'>
        <p className='points'>
            <span>Pontuação: 000</span>
        </p>
        <h1>Advinhe a palavra:</h1>
        <h3 className='tip'>
            Dica sobre a palavra: <span>Dica...</span>
        </h3>
        <div className='wordContainer'>
            <span className='letter'>A</span>
            <span className='blankSquere'></span>
        </div>
        <div className='letterContainer'>
            <p>Tente advinhar uma letra da palavra:</p>
            <form>
                <input type="text" name="letter" maxlength="1" requered />
                <button>Jogar!</button>
            </form>
        </div>
        <div className='wrongLettersContainer'>
            <p>Letras já utilizadas:</p>
            <span>a, </span>
            <span>b, </span>
        </div>
    </div>
  );
};

export default Game