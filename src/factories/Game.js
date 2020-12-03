const Game = (() => {
    let currentPlayer = {name: 'x'};
    let turn = 1;
    
    const setCurrentPlayer = (player) => currentPlayer = player;
    const getCurrentPlayer = () => currentPlayer;
    
    const performTurn = (enemy, pos) => {
        const enemyBoard = enemy.board;
        const player = getCurrentPlayer();
        let target = pos;
   
        if (player.name == 'Computer') {
            target = player.generateAITarget(player.hitPrevious, enemyBoard, player.lastHitTarget);
        }
        
        const res = player.attack(enemyBoard, target);
        if (player.name == 'Computer') {
            if (res) player.lastHitTarget = target;
        }
        
        return res;
    }
    
    return {
        performTurn,
        setCurrentPlayer,
        getCurrentPlayer
    }
})();

export default Game