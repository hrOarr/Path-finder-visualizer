class InitGrid {
	initGrid(grid, clearWall, st, ed){
		for(var row=0; row<20; row++){
			for(var col=0; col<44; col++){
				let curNode = grid.grid[row][col];
				curNode.isVis = false;
				curNode.prev = null;
				curNode.dist = Infinity;

				document.getElementById(`node-${curNode.row}-${curNode.col}`).className ="node";

				if(clearWall){
					curNode.isWall = false;
				}
				else if(curNode.isWall){
					document.getElementById(`node-${curNode.row}-${curNode.col}`).className = "node node-wall";
				}

				if(row === st[0] && col === st[1]){
					document.getElementById(`node-${st[0]}-${st[1]}`).className = "node node-start";
					curNode.isStart = true;
				}

				if(row === ed[0] && col === ed[1]){
					document.getElementById(`node-${ed[0]}-${ed[1]}`).className = "node node-end";
					curNode.isEnd = true;
				}
			}
		}

		return grid;
	}
}

export default InitGrid;