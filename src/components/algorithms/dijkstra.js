
class Dijkstra{
	static weighted = true;

	dijkstra(grid, st, ed){
		const visNodesOrder = [];
		st.dist = 0; st.weight = 0;

		const AllNodes = [];
		AllNodes.push(st);
		const dirX = [+0, +0, +1, -1];
		const dirY = [+1, -1, +0, +0];

		while(AllNodes.length>0){
			this.sort(AllNodes);
			const curNode = AllNodes.shift(); // get closer node

			if(curNode.dist === Infinity) return visNodesOrder;
			curNode.isVis = true;
			visNodesOrder.push(curNode);
			if(curNode.row === ed.row && curNode.col===ed.col) return visNodesOrder;
			const { row, col } = curNode;
			for(var i=0; i<4; i++){
				let x = row+dirX[i],y = col+dirY[i];
				if(row===4&&col===4)console.log(x,y)
				if(this.valid(grid,x,y) && curNode.dist+grid[x][y].weight<grid[x][y].dist){
					grid[x][y].dist = curNode.dist+grid[x][y].weight;
					grid[x][y].prev = curNode;
					AllNodes.push(grid[x][y]);
				}
			}
		}

		return visNodesOrder;
	}

	sort(Nodes){
		Nodes.sort((A, B) => A.dist - B.dist);
	}

	valid(grid, x, y){
		return (x >=0 && x <= 19 && y >= 0 && y <= 49 && !grid[x][y].isVis && !grid[x][y].isWall);
	}

	shortestPath(stNode, edNode){
		let curNode = edNode;
		const Path = [];
		while(curNode != null && curNode != stNode){
			Path.unshift(curNode);
			curNode = curNode.prev;
		}
		Path.unshift(stNode);
		return Path;
	}

}

export default Dijkstra;