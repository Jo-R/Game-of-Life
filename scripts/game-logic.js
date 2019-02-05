class GameLogic {

    //taking one param for size assuming heigth and width always same
    constructor(initialGrid, size) {
        this.currentGrid = initialGrid;
        this.size = size;
    }

    //since representing by 1 and 0 can just sum the neightbour cells to work out how many are alive
    //shamelessley stolen from Lea Verou pluralsight course because using reduce here is nifty!
    aliveNeighbours(array, x, y) {
		var prevRow = array[y-1] || [];
		var nextRow = array[y+1] || [];
		
		return [
			prevRow[x-1], prevRow[x], prevRow[x+1],
			array[y][x-1], array[y][x+1],
			nextRow[x-1], nextRow[x], nextRow[x+1]
		].reduce(function (prev, cur) {
			return prev + +!!cur;
		}, 0);
    }
    
    //takes currentGrid and outpus a new grid based on the rules
    next() {
        //make deep copy of current grid
        let updatedGrid = this.currentGrid.map(el => el.slice());
         //do the checks on currentGrid and update the new one
        for (var y = 0; y < this.size-1; y++) {
            for (var x = 0; x < this.size-1; x++) {
                //get t/f for if cell alive
                let isAlive = !!+this.currentGrid[y][x];
                //get alive neighbour count
                let neighbourCount = this.aliveNeighbours(this.currentGrid, x, y);
                 //Any live cell with fewer than two live neighbors dies, as if by underpopulation.
                 //Any live cell with two or three live neighbors lives on to the next generation.
                 //Any live cell with more than three live neighbors dies, as if by overpopulation.
                 if (isAlive) {
                    if (neighbourCount < 2 || neighbourCount > 3) {
                        updatedGrid[y][x] = 0;
                    }
                 }
                 //Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
                 if (!isAlive) {
                     if (neighbourCount === 3) {
                        updatedGrid[y][x] = 1;
                     }
                 }
            }
        }
        //now set the updated grid to current
        this.currentGrid = updatedGrid;
        return this.currentGrid;
    }

}

export {GameLogic};