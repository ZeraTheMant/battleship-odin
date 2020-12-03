const objs = require('../factories/Player');

const Player = objs[0];
const Computer = objs[1];

test('hit comp at pos 67', () => {
    const a = Player('a');
    const b = Computer('b')
    b.board.randomizeShipPlacements();
    const hitTarget = a.attack(b.board, 67);
    expect(b.board.getBoard()[67]).toBe('x');
});

test('hit player at random pos', () => {
    const a = Player('a');
    const b = Computer('x');
    a.board.randomizeShipPlacements();
    const target = b.generateAITarget(b.hitPrevious, a.board);
    b.hitPrevious = b.attack(a.board, target);
    expect(a.board.getBoard()[target]).toBe('x');
});


