import {GameLogic} from './game-logic.js';

class UiLogic {

    constructor(gridElement, boardSize) {
        this.boardSize = boardSize;
		this.gridElement = gridElement;
		this.checkboxes = [];
		this.createBoard();
		//get button elements since are referenced a fair bit
		this.startBtn = document.getElementById('start');
		this.stopBtn = document.getElementById('stop');
		this.clearBtn = document.getElementById('clear');
		this.resetBtn = document.getElementById('reset');
		//bind event methods and attach to buttons
		this.startGame = this.startGame.bind(this);
		this.stopGame = this.stopGame.bind(this);
		this.createBoard = this.createBoard.bind(this);
		this.clearBoard = this.clearBoard.bind(this);
		this.next = this.next.bind(this); //used in timer so needs binding
		this.startBtn.addEventListener('click', this.startGame);
		this.stopBtn.addEventListener('click', this.stopGame);
		this.stopBtn.disabled = true;
		this.clearBtn.addEventListener('click', this.clearBoard);
		this.resetBtn.addEventListener('click', this.createBoard);
		this.resetBtn.disabled = true;
	}

    createBoard() {
		//using fragment minmises actual DOM interaction
		let fragment = document.createDocumentFragment();
		this.gridElement.innerHTML = '';
		//create checkboxes for size of board
		for (var y = 0; y < this.boardSize; y++) {
			var row = document.createElement('tr');
			this.checkboxes[y] = [];
			
			for (var x = 0; x < this.boardSize; x++) {
				var cell = document.createElement('td');
				var checkbox = document.createElement('input');
				checkbox.type = 'checkbox';
				this.checkboxes[y][x] = checkbox;
				checkbox.coords = [y, x];
				if (this.initialState != undefined && this.initialState[y][x]) {
					this.checkboxes[y][x].checked = true;
				}
				
				cell.appendChild(checkbox);
				row.appendChild(cell);
			}
			fragment.appendChild(row);
        }
        this.gridElement.appendChild(fragment);
	}

	clearBoard() {
		this.initialState = undefined;
		this.createBoard();
	}
	
	getGrid() {
		return this.checkboxes.map(function (row) {
			return row.map(function (checkbox) {
				return +checkbox.checked;
			});
		});
	}

	startGame() {
		this.initialState = this.getGrid();
		this.game = new GameLogic(this.initialState, this.boardSize);
		this.timer = setInterval(this.next, 750);
		this.startBtn.disabled = true;
		this.clearBtn.disabled = true;
		this.stopBtn.disabled = false;
	}

	stopGame() {
		clearInterval(this.timer);
		this.startBtn.disabled = false;
		this.clearBtn.disabled = false;
		this.stopBtn.disabled = true;
		this.resetBtn.disabled = false;
	}

	next() {
		var newBoard = this.game.next();
		//update UI with new
		for (var y = 0; y < this.boardSize; y++) {
			for (var x = 0; x < this.boardSize; x++) {
				this.checkboxes[y][x].checked = !!newBoard[y][x];
			}
		}
	}
}

export {UiLogic};	