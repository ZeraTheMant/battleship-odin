import React, { useState, useEffect } from "react";
import BoardHolder from './BoardHolder.js'; 
import Game from '../factories/Game.js'; 

const GameScreen = (props) => {
    const [playerTurn, setPlayerTurn] = useState(true);    
    useEffect(() => {
        if (!playerTurn && props.gameOngoing) {
            const hitTarget = Game.performTurn(props.player, 0);
            props.computer.hitPrevious = hitTarget;
            const playerBoard = props.player.board;
            if (playerBoard.allShipsHaveBeenSunk()) props.setGameOngoing(false);  
            Game.setCurrentPlayer(props.player);
            setPlayerTurn(true);           
        }        
    }, [playerTurn]);   
    
    const clickSquare = (e) => {
        if (playerTurn && props.gameOngoing) {
            Game.setCurrentPlayer(props.player);
            const target = e.target.textContent;
            const enemyBoard = props.computer.board;

            if (enemyBoard.validEnemyTarget(target)) {
                const hitTarget = Game.performTurn(props.computer, target); 

                if (enemyBoard.allShipsHaveBeenSunk()) {
                    props.setGameOngoing(false);     
                    props.setPlayerWinner(true);
                }           
                Game.setCurrentPlayer(props.computer);
                setPlayerTurn(false);
            } else {
                alert("Please select a valid target.");
            }
        }
    };
    
    const renderGameScreen = () => {
        //alert(props.computer)
        if (props.gameStart) {
            return (
                <div id="game-screen-div">
                    <BoardHolder
                        board={props.player.board.getBoard()}
                        onClick={clickSquare}
                    />      

                    <BoardHolder
                        board={props.computer.board.getBoard()}
                        onClick={clickSquare}
                        compBoardView={true}
                    />                     
                </div>            
            )
        }
    }
    
    return (
        <div>
            {renderGameScreen()}   
        </div>
    );
}

export default GameScreen;