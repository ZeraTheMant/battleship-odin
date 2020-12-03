import React, { useState, useEffect } from "react";
import ArrangeShipsScreen from './components/ArrangeShipsScreen.js'; 
import GameScreen from './components/GameScreen.js'; 
import EndScreen from './components/EndScreen.js'; 
import './styles/App.css';

const App = () => {
    const [gameStart, setGameStart] = useState(false);
    const [player, setPlayer] = useState(null);
    const [computer, setComputer] = useState(null); 
    const [gameOngoing, setGameOngoing] = useState(true);
    const [playerWinner, setPlayerWinner] = useState(false);

    useEffect(() => {
        //alert('fsdfsd')
    }, [gameOngoing]);     

    const boardSetUp = (player_obj, comp) => {
        setPlayer(player_obj);
        setComputer(comp)
    }
    
    return (
        <div className="App">
            <ArrangeShipsScreen
                gameStart={gameStart}
                setGameStart={setGameStart}
                boardSetUp={boardSetUp}
                prep={false}
            />
            
            <GameScreen
                gameStart={gameStart}
                player={player}
                computer={computer}
                prep={false}
                gameOngoing={gameOngoing}
                setGameOngoing={setGameOngoing}
                setPlayerWinner={setPlayerWinner}
            />
            
            <EndScreen
                playerWinner={playerWinner}
                gameOngoing={gameOngoing}
            />
        </div>
    );
}

export default App;
