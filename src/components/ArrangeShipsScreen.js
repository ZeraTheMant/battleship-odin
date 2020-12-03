import React, { useState, useEffect, useRef } from "react";
import playerObj from '../factories/Player.js'; 
import ShipContainer from './ShipContainer.js'; 
import BoardHolder from './BoardHolder.js'; 
import Gameboard from '../factories/Gameboard.js'; 

const ArrangeShipsScreen = (props) => {
    const [fourBlockShipsNo, setFourBlocksShipsNo] = useState(1);
    const [threeBlockShipsNo, setThreeBlocksShipsNo] = useState(2);
    const [twoBlockShipsNo, setTwoBlocksShipsNo] = useState(3);
    const [oneBlockShipsNo, setOneBlocksShipsNo] = useState(4);
    const [draggedShip, setDraggedShip] = useState(null);
    const [randomizePlayerShips, setRandomizePlayerShips] = useState(false);
    const [readyToStart, setReadyToStart] = useState(false);
    const [playerBoard, setPlayerBoard] = useState([]);
    const [board, setBoard] = useState(Array(100).fill('-'));  
              
    const draggedShipSetup = (ship) => setDraggedShip(ship);
    const updateShipPlacementNo = (num) => {
        if (num == 4) setFourBlocksShipsNo(fourBlockShipsNo - 1);
        if (num == 3) setThreeBlocksShipsNo(threeBlockShipsNo - 1);
        if (num == 2) setTwoBlocksShipsNo(twoBlockShipsNo - 1);
        if (num == 1) setOneBlocksShipsNo(oneBlockShipsNo - 1);
    };
    
    const shipsAllSetUp = () => {
        return fourBlockShipsNo == 0 && threeBlockShipsNo == 0 && twoBlockShipsNo == 0 && oneBlockShipsNo == 0;
    }
    
    const gameStartSetup = () => {
        if (shipsAllSetUp()) {
            const Player = playerObj[0];
            const Computer = playerObj[1];

            let myBoard = playerBoard;
            if (!randomizePlayerShips) {
                const pBoard = Gameboard();
                pBoard.setBoard(board);
                myBoard = pBoard;
                
            }
            const human_player = Player('Reuben', myBoard)
            const compBoard = Gameboard();
            compBoard.randomizeShipPlacements();

            const comp = Computer('Computer', compBoard);

            props.boardSetUp(human_player, comp)
            props.setGameStart(true);   
        } else {
            alert('Please lay out all your ships first.');
        }
    }
    
    const playerSelectedRandomize = () => {
        if (!draggedShip) {
            setRandomizePlayerShips(true); 
            setFourBlocksShipsNo(0);
            setThreeBlocksShipsNo(0);
            setTwoBlocksShipsNo(0);
            setOneBlocksShipsNo(0);           
        }
    };
    

    const renderArrangeShipsScreen = () => {
        if (!props.gameStart) {
            return (
                <div id="set-board-wrapper">
                    <div id="set-board-screen" className="halved">
                        <div>
                            <p>Drag and drop the ships to the board</p>
                            <p>Click on a ship to switch direction</p>
                            <div id="set-board-screen-left">
                                <BoardHolder
                                    board={board}
                                    setBoard={setBoard}
                                    setPlayerBoard={setPlayerBoard}
                                    draggedShip={draggedShip}
                                    updateShipPlacementNo={updateShipPlacementNo}
                                    randomizePlayerShips={randomizePlayerShips}
                                    prep={true}
                                />  
                            </div>
                        </div>
                        
                        <div>
                            <div>
                                <h1 id="arrange-heading">Arrange Your Board</h1>
                            </div>
                            
                            <div id="ship-info-container">
                                <div>
                                    <ShipContainer
                                        num={fourBlockShipsNo}
                                        blocks={4}
                                        class_name={'four-block-ship'}
                                        draggedShipSetup={draggedShipSetup}
                                        randomizePlayerShips={randomizePlayerShips}
                                    />
                                    
                                    <ShipContainer
                                        num={threeBlockShipsNo}
                                        blocks={3}
                                        class_name={'three-block-ship'}
                                        draggedShipSetup={draggedShipSetup}
                                        randomizePlayerShips={randomizePlayerShips}
                                    />
                                    
                                    <ShipContainer
                                        num={twoBlockShipsNo}
                                        blocks={2}
                                        class_name={'two-block-ship'}
                                        draggedShipSetup={draggedShipSetup}
                                        randomizePlayerShips={randomizePlayerShips}
                                    />

                                    <ShipContainer
                                        num={oneBlockShipsNo}
                                        blocks={1}
                                        class_name={'one-block-ship'}
                                        draggedShipSetup={draggedShipSetup}
                                        randomizePlayerShips={randomizePlayerShips}
                                    />                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <ul>
                            <li onClick={playerSelectedRandomize}>Randomize</li>
                            <li onClick={gameStartSetup}>Start</li>
                        </ul>
                    </div>
                </div>
            );
        }
    };
    
    return (
        <div>
            {renderArrangeShipsScreen()}
        </div>
    )
};

export default ArrangeShipsScreen;