// Grid class for storing graph

export default class Grid {
	constructor(weighted, st, ed){
		this.grid = this.initGrid(weighted, st, ed);
	}

	initNode(row, col, weighted, st, ed){
		var weight = "0";
		if(weighted){
			weight = Math.floor(Math.random() * 9)+1;
		}

		return {
			col,
			row,
			isStart: (row===st[0] && col===st[1]),
			isEnd: (row===ed[0] && col===ed[1]),
			isVis: false,
			isWall: false,
			dist: Infinity,
			weight: weight,
			prev: null
		};
	}

	initGrid(weighted, st, ed){
		const grid = [];
		for(var row=0; row<20; row++){
			const curRow = [];
			for(var col=0; col<44; col++){
				curRow.push(this.initNode(row, col, weighted, st, ed));
			}
			grid.push(curRow);
		}
		return grid;
	}

	toggleStart(row, col){
		this.grid[row][col].isStart = !this.grid[row][col].isStart;
	}

	toggleEnd(row, col){
		this.grid[row][col].isEnd = !this.grid[row][col].isEnd;
	}

	toggleWall(row, col){
		this.grid[row][col].isWall = !this.grid[row][col].isWall;
	}
}