const Ship = require('../factories/Ship');

const testShip = Ship(3);

test('hit ship at pos 0', () => {
    testShip.hit(0);
    expect(testShip.showStatusAtPos(0)).toEqual('x');
});

test('sink ship', () => {
    testShip.hit(1);
    testShip.hit(2);
    expect(testShip.isSunk()).toEqual(true);
});

test('get hittable horizontal positions', () => {
    const newShip = Ship(3);
    newShip.setPosition(90);
    const willGetHitPositions = [
        newShip.willGetHitAtPosition(90), 
        newShip.willGetHitAtPosition(91), 
        newShip.willGetHitAtPosition(92),
        newShip.willGetHitAtPosition(93)
    ];
    expect(willGetHitPositions).toEqual([true, true, true, false]);
});

test('get hittable vertical positions', () => {
    const newShip = Ship(3);
    newShip.switchDisplay();
    newShip.setPosition(55);
    const willGetHitPositions = [
        newShip.willGetHitAtPosition(55), 
        newShip.willGetHitAtPosition(65), 
        newShip.willGetHitAtPosition(75),
        newShip.willGetHitAtPosition(85)
    ];
    expect(willGetHitPositions).toEqual([true, true, true, false]);
});

test('get hittable horizontal body positions', () => {
    const newShip = Ship(3);
    newShip.setPosition(90);
    const hitPositions = [
        newShip.getHitPosition(90), 
        newShip.getHitPosition(91), 
        newShip.getHitPosition(92),
        newShip.getHitPosition(93)
    ];
    expect(hitPositions).toEqual([0, 1, 2, -1]);
});

test('get hittable vertical body positions', () => {
    const newShip = Ship(3);
    newShip.switchDisplay();
    newShip.setPosition(13);
    const hitPositions = [
        newShip.getHitPosition(13), 
        newShip.getHitPosition(23), 
        newShip.getHitPosition(33),
        newShip.getHitPosition(43)
    ];
    expect(hitPositions).toEqual([0, 1, 2, -1]);
});
