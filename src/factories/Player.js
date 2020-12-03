const Gameboard = require('./Gameboard');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}   

const attacker = () => ({
    attack: (enemyBoard, pos) => {
        if (enemyBoard.validEnemyTarget(pos)) return enemyBoard.receiveAttack(pos);
        return false;
    }
});

const aiTargetGenerator = () => ({
    generateAITarget: (hitPrevious, enemyBoard, compLastHitTarget) => {
        const getBoardIndexes = (pos) => {
            if (pos == 0) return [pos + 1, pos + 10];
            if (pos < 10) return [pos + 1, pos - 1, pos + 10];
            if (pos == 99)return [pos - 1, pos - 10];
            if (pos > 89) return [pos + 1, pos - 1, pos - 10];
                
            return [pos + 1, pos - 1, pos + 10, pos - 10];
        }
        let randomSquare = getRandomInt(100);
    
        while (enemyBoard.getBoard()[randomSquare] == 'x') randomSquare = getRandomInt(100);  
   
        if (hitPrevious) {
            const morePossibilities = getBoardIndexes(compLastHitTarget);
            const possible_targets = morePossibilities.filter(possibility => {
                enemyBoard.validEnemyTarget(possibility)
            });
            if (possible_targets.length > 0) {
                possible_targets.forEach(item => {
                    if (!enemyBoard.getInvalidAttacks().includes(item)) return item;
                });
            }
        }
       
        return randomSquare;
    }
});

const Player = (name, board) => {
    //const board = Gameboard(gameBoard);
    let lastHitIndex = 0;
    return Object.assign(
        {},
        {lastHitIndex},
        {board},
        {name},
        attacker()
    );
}

const Computer = (name, board) => {
    let hitPrevious = false;
    return Object.assign(
        {},
        {hitPrevious},
        Player(name, board),
        aiTargetGenerator()
    );
}

module.exports = [Player, Computer];