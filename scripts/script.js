import {GameLogic} from './game-logic.js';

const testGrid = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
]

const game = new GameLogic(testGrid, 6);

game.logger();
game.next();
game.next();
game.next();
