import React, { useState, useEffect } from "react";
import Square from './Square.js'; 
import Ship from '../factories/Ship.js'; 
import Gameboard from '../factories/Gameboard.js'; 

const HeadingBox = (props) => {
    return (
        <div className={'board-heading'}>{props.text}</div>
    )
}

const BoardHolder = (props) => {
    //const [board, setBoard] = useState(Array(100).fill('-'));    
    const [ships, setShips] = useState([]);    

    useEffect(() => {
       if (props.randomizePlayerShips) {
           const playerBoard = Gameboard();
           playerBoard.randomizeShipPlacements();
           props.setBoard(playerBoard.getBoard());
           props.setPlayerBoard(playerBoard);
       }
    }, [props.randomizePlayerShips]);
    

    const dummyFunc = (empty) => null;
    const switchShipOrientation = (e) => {
        const index = Number(e.target.textContent);
        const backup = [...ships]
        const shipIndex = backup.findIndex(ship => ship.willGetHitAtPosition(index));
        if (shipIndex != -1) {
            const shipWithIndex = backup[shipIndex];
            if (shipWithIndex.getPositions().length > 1) {
                const shipArrayWithoutSelectedShip = backup.filter((ship, idx) => idx == shipIndex);
                
                let headPos = shipWithIndex.getHeadPos();
                if (index > 79) headPos -= 30;

                const oldPos = shipWithIndex.getPositions();
                shipWithIndex.switchDisplay();
                shipWithIndex.setPosition(headPos)
                const newPos = shipWithIndex.getPositions(); 

                const boardBackup = [...props.board];
                
                let newPosArr = newPos.slice(2);
                if (index > 79) newPosArr = newPos.slice(0, newPos.length-2);
                const x = newPosArr.every(item => adjacentAreasClear(item));
                if (x) {
                    oldPos.forEach(pos => boardBackup[pos] = '-'); 
                    newPos.forEach(pos => boardBackup[pos] = 'o');
                    props.setBoard(boardBackup);
                    setShips(shipArrayWithoutSelectedShip.concat([shipWithIndex])); 
                }                 
            }                   
        }
    
    };

    const renderSquares = () => {
        let ctr = 0;
        return Array(10).fill('').map((stepOuter, moveOuter) => {
            return Array(10).fill('').map((stepInner, moveInner) => {
                ctr += 1;
                let className = ['square', 'empty'].join(' ');
                let onClickFunc = dummyFunc;
                if (props.board[ctr-1] == 'o') {
                    className = ['square', 'empty', 'ship', 'placed-on-board'].join(' ');  
                    onClickFunc = switchShipOrientation;
                } else if (props.board[ctr-1] == 'x') {
                    className = ['square', 'hit-area', 'placed-on-board'].join(' ');  
                }

                if (props.compBoardView) {

                    className += ' obscured';
                }
                
                return (
                    <Square 
                        classNames={className}
                        onDragOver={dragOver}
                        onDragEnter={dragEnter}
                        onDragLeave={dragLeave}
                        onDrop={dragDrop}
                        onClick={(props.prep) ? onClickFunc : props.onClick}
                        key={ctr-1}
                        value={ctr-1}
                    />              
                );
            });
        });
    };

    const renderTopHeading = () => {
        return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((step, move) => {
            return ( <HeadingBox text={step} key={move} /> );
        });
    };  
    
    const renderSideHeading = () => {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((step, move) => {
            return ( <HeadingBox text={step} key={move} /> );
        });
    };  
       const dragOver = (e) => {
        e.preventDefault();
    };

    const dragEnter = (e) => { 
        e.preventDefault();
        e.target.classList.add('square-hover');
    };

    const dragLeave = (e) => {
        e.target.classList.remove('square-hover');
    };
    
    const adjacentAreasClear = (pos) => { 

        const backup = [...props.board];

        if (pos == 0) {
            return backup[pos+1] == '-' && backup[pos+10] == '-' && backup[pos+11] == '-'; 
        } else if (pos == 99) {
            return backup[pos-1] == '-' && backup[pos-10] == '-' && backup[pos-11] == '-';
        }
        
        if (pos < 11) {
            if (pos == 9) return backup[pos-1] == '-' && backup[pos+10] == '-' && backup[pos+9] == '-' && backup[pos+11] == '-';
            if (pos == 10) return backup[pos+1] == '-' && backup[pos+10] == '-' && backup[pos+9] == '-' && backup[pos+11] == '-'; 
            return backup[pos+1] == '-' && backup[pos-1] == '-' && backup[pos+10] == '-' && backup[pos+9] == '-' && backup[pos+11] == '-';  
        } else if (pos > 88) {
            if (pos == 89) return backup[pos-1] == '-' && backup[pos-10] == '-' && backup[pos-9] == '-' && backup[pos-11] == '-';  
            if (pos == 90) return backup[pos+1] == '-' && backup[pos-10] == '-' && backup[pos-9] == '-' && backup[pos-11] == '-';  
            return backup[pos+1] == '-' && backup[pos-1] == '-' && backup[pos-10] == '-' && backup[pos-9] == '-' && backup[pos-11] == '-';  
        }
        
        const baseCond = (     
            backup[pos+10] == '-' && 
            backup[pos-10] == '-' && 
            backup[pos+11] == '-' &&
            backup[pos+9] == '-' &&
            backup[pos-9] == '-' &&
            backup[pos-11] == '-'    
        );
        
        const leftEdgeCond = backup[pos-1] == '-'
        const rightEdgeCond = backup[pos+1] == '-';     
                   
        
        if ([20, 30, 40, 50, 60, 70, 80].includes(pos)) return baseCond && rightEdgeCond;
        if ([19, 29, 39, 49, 59, 69, 79, 89].includes(pos)) return baseCond && leftEdgeCond;

        return baseCond && leftEdgeCond && rightEdgeCond;
    };

    const getDraggedShipLength = (ship) => ship.children.length;    
    
    const validShipPlacement = (ship, index) => {
        const backup = [...props.board];
        if (backup[index] != '-') return false;

        let shipLength = getDraggedShipLength(ship) - 1;
        const idxBelow = index + 10;  
        //alert(Math.floor((index + shipLength) / 10) + ' ' + Math.floor(idxBelow / 10))
        if (Math.floor((index + shipLength) / 10) == Math.floor(idxBelow / 10) && ((index % 10) != 6)) return false;    
        if (shipLength == 0) shipLength += 1;
        for (let i=1; i<shipLength + 2; i++) {
            if (!adjacentAreasClear(index)) return false;
            index += 1;
        }

        return true;        
    };

    const dragDrop = (e) => {       
        e.target.classList.remove('square-hover');
        if (props.draggedShip) {
            const backup = [...props.board];
            let idx = Number(e.target.textContent);
            const idxCopy = idx;
            
            if (validShipPlacement(props.draggedShip, idx)) {
                const draggedShipChildren = Array.from(props.draggedShip.children);
                draggedShipChildren.forEach(child => {
                    backup[idx] = 'o';
                    idx += 1;
                });
                props.setBoard(backup);
                props.updateShipPlacementNo(getDraggedShipLength(props.draggedShip));
                const newShip = Ship(getDraggedShipLength(props.draggedShip));
                newShip.setPosition(idxCopy);
                setShips(ships.concat([newShip]));
            }    
        }
    };
    
    return (
        <div id="set-board-screen-board-holder">
            <div id="wew">
                <div></div>
                <div id="top-heading-holder">
                    {renderTopHeading()}
                </div>
            </div>
            
            <div id="inner-board">
                <div id="wew2">
                    {renderSideHeading()}
                </div>
                <div id="wew3">
                    {renderSquares()}   
                </div>
            </div>
        </div>
    );
};

export default BoardHolder;