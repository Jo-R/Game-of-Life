import {GameLogic} from './game-logic.js';

class UiLogic {

    constructor(gridElement, boardSize) {
        this.boardSize = boardSize;
		this.gridElement = gridElement;
		this.checkboxes = [];
		this.createBoard();
		this.startGame = this.startGame.bind(this);
		document.getElementById('start').addEventListener('click', this.startGame);

	}

    createBoard() {
		let fragment = document.createDocumentFragment();
		this.gridElement.innerHTML = '';
		
		for (var y=0; y<this.boardSize; y++) {
			var row = document.createElement('tr');
			this.checkboxes[y] = [];
			
			for (var x=0; x<this.boardSize; x++) {
				var cell = document.createElement('td');
				var checkbox = document.createElement('input');
				checkbox.type = 'checkbox';
				this.checkboxes[y][x] = checkbox;
				checkbox.coords = [y, x];
				
				cell.appendChild(checkbox);
				row.appendChild(cell);
			}
			
			fragment.appendChild(row);
        }

        this.gridElement.appendChild(fragment);

	}
	
	startGame() {
		//map over this.checkboxes and get grid of 1s and 0s
		let startGrid = this.checkboxes.map(function (row) {
			return row.map(function (checkbox) {
				return +checkbox.checked;
			});
		});
		const game = new GameLogic(startGrid, this.boardSize);
		var newBoard = game.next();
		//update checkboxes with game.currentGrid
		for (var y=0; y<this.boardSize; y++) {
			for (var x=0; x<this.boardSize; x++) {
				this.checkboxes[y][x].checked = !!newBoard[y][x];
			}
		}
	}
		
}

export {UiLogic};