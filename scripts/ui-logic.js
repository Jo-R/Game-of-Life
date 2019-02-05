import {GameLogic} from './game-logic.js';

class UiLogic {

    constructor(gridElement, boardSize) {
        this.boardSize = boardSize;
		this.gridElement = gridElement;
		this.checkboxes = [];
		this.createBoard();
		this.startGame = this.startGame.bind(this);
		this.stopGame = this.stopGame.bind(this);
		this.getGrid = this.getGrid.bind(this);
		this.next = this.next.bind(this);
		document.getElementById('start').addEventListener('click', this.startGame);
		document.getElementById('stop').addEventListener('click', this.stopGame);
		document.getElementById('stop').disabled = true;

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
	
	getGrid() {
		return this.checkboxes.map(function (row) {
			return row.map(function (checkbox) {
				return +checkbox.checked;
			});
		});
	}

	startGame() {
		let startGrid = this.getGrid();
		this.game = new GameLogic(startGrid, this.boardSize);
		this.timer = setInterval(this.next, 750);
		document.getElementById('start').disabled = true;
		document.getElementById('stop').disabled = false;
	}

	stopGame() {
		clearInterval(this.timer);
		document.getElementById('start').disabled = false;
		document.getElementById('stop').disabled = true;
	}

	next() {
		var newBoard = this.game.next();
		//update checkboxes with game.currentGrid
		for (var y=0; y<this.boardSize; y++) {
			for (var x=0; x<this.boardSize; x++) {
				this.checkboxes[y][x].checked = !!newBoard[y][x];
			}
		}
	}
		
}

export {UiLogic};