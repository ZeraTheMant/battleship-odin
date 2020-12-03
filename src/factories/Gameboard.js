const Ship = require('./Ship');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const Gameboard = () => {
    let board = new Array(100).fill('-');
    let missedAttacks = [];
    let invalidPos = [];
    let hitShipPos = []
    let num = 20
    const ships = [
        Ship(4), 
        Ship(3), 
        Ship(3), 
        Ship(2), 
        Ship(2), 
        Ship(2),
        Ship(1),
        Ship(1),
        Ship(1),
        Ship(1)
    ];
    
    const validEnemyTarget = (pos) => (!getInvalidAttacks().includes(pos) && (getBoard()[pos] == '-' || getBoard()[pos] == 'o')) ;
    
    const setBoard = (newBoard) => board = newBoard; 
    const getShips = () => ships;
    
    const getBoard = () => board;
    
    const getInvalidAttacks = () => missedAttacks.concat(hitShipPos);
    
    const adjacentAreasClear = (pos) => {
        if (pos == 0) {
            return board[pos+1] == '-' && board[pos+10] == '-' && board[pos+11] == '-';
        } else if (pos == 99) {
            return board[pos-1] == '-' && board[pos-10] == '-' && board[pos-11] == '-';
        }
        
        if (pos < 10) {
            return board[pos+1] == '-' && board[pos-1] == '-' && board[pos+10] == '-' && board[pos+9] == '-' && board[pos+11] == '-';  
        } else if (pos > 89) {
            return board[pos+1] == '-' && board[pos-1] == '-' && board[pos-10] == '-' && board[pos-9] == '-' && board[pos-11] == '-';  
        }
        
        return ( 
            board[pos+1] == '-' && 
            board[pos-1] == '-' && 
            board[pos+10] == '-' && 
            board[pos-10] == '-' && 
            board[pos+11] == '-' &&
            board[pos+9] == '-' &&
            board[pos-9] == '-' &&
            board[pos-11] == '-'
        );
    };
    
    const isValidPos = (ship, potential_pos) => {
        let posCopy = potential_pos;
        const increment = (ship.getHorizontalDisplay()) ? 1 : 10;
        for (let i=0; i< ship.length; i++) {
            if (board[posCopy] != '-') return false;
            if (!adjacentAreasClear(posCopy)) return false;
            posCopy += increment;
        }
        
        return true;
    };
    
    const getValidShipPos = (ship) => {
        const orientation = Math.round(Math.random()); //0 horizontal, 1 vertical
        if (orientation == 1) ship.switchDisplay();
        
        let hasValidPos = false;
        while (!hasValidPos) {
            const randomPos = getRandomInt(100);
            if (!invalidPos.includes(randomPos)) {                
                const validPos = isValidPos(ship, randomPos);
                invalidPos.push(randomPos)
                if (validPos) return randomPos;
            }
        }
    }
    
    const placeShip = (ship, headPos) => {
        ship.setPosition(headPos); 
        let posCopy = headPos;
        const increment = (ship.getHorizontalDisplay()) ? 1 : 10;
        for (let i=0; i< ship.length; i++) {
            board[posCopy] = 'o';
            posCopy += increment;
        }        
    }
    
    const randomizeShipPlacements = () => {
        ships.forEach(ship => {
            const validPos = getValidShipPos(ship);
            placeShip(ship, validPos);
        });
       
        
        /*let str = ''
        let ctr = 0;
        for (let i=0; i<100; i++) {
            str += board[i];
            ctr += 1;
            if (ctr == 10) {
                str += '\n';
                ctr = 0;
            }
        }
        console.log(str)*/
    };
    
    const getAttackedShip = (position) => {
        const attackedShip = ships.filter(ship => ship.willGetHitAtPosition(position));       
        return (attackedShip.length > 0) ? attackedShip[0] : null;
    }
    
    const receiveAttack = (position) => {

        if (board[position] == 'o') decreaseNum();
        board[position] = 'x';
        const ship = getAttackedShip(position);
        if (ship) {

            const hitPos = ship.getHitPosition(position);
            ship.hit(hitPos);
            return true;
            invalidPos.push(position);
            hitShipPos.push(position)
        } else {
            trackMissedAttack(position);
            return false;
        }
    };
    const trackMissedAttack = (position) => missedAttacks.push(position);
    const allShipsHaveBeenSunk = () => num == 0//ships.every(ship => ship.isSunk());
    const decreaseNum = () => num -= 1;
    
    return {

        setBoard,
        getInvalidAttacks,
        validEnemyTarget,
        getBoard,
        getShips,
        allShipsHaveBeenSunk,
        receiveAttack,
        randomizeShipPlacements
    }
}

module.exports = Gameboard;