import {GameLogic} from './game-logic.js';
import { UiLogic } from './ui-logic.js';

const testGrid = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
]



const createUI = new UiLogic(document.getElementById('grid'), 6);


