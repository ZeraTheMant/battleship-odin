const Gameboard = require('../factories/Gameboard');

//const testShip = Ship(3);

test('all ships sunk', () => {
    const board = Gameboard();
    board.randomizeShipPlacements();
    board.getShips().forEach(ship => {
        for (let i=0; i<ship.length; i++) {
            ship.hit(i);
        }
    });
    expect(board.allShipsHaveBeenSunk()).toBe(true);
});

test('horizontal ship receives attacks', () => {
    const board = Gameboard();
    const ship = board.getShips()[0];
    ship.setPosition(12);
    board.receiveAttack(13);
    expect(ship.showStatusAtPos(1)).toBe('x');
});

test('vertical ship receives attacks', () => {
    const board = Gameboard();
    const ship = board.getShips()[0];
    ship.switchDisplay();
    ship.setPosition(27);
    const didHitTarget = board.receiveAttack(47);
    expect(ship.showStatusAtPos(2)).toBe('x');
});

test('vertical ship receives attacks returns true', () => {
    const board = Gameboard();
    const ship = board.getShips()[0];
    ship.switchDisplay();
    ship.setPosition(27);
    const didHitTarget = board.receiveAttack(47);
    expect(didHitTarget).toBe(true);
});

