import { isValid } from "../Utils";

const isWeighted = true;
const dirX = [+0, +0, +1, -1];
const dirY = [+1, -1, +0, +0];

const PriorityQueue = require('priorityqueuejs');

const priorityQueue = new PriorityQueue((a, b) => {
	return b.distance-a.distance;
});

const Dijkstra = () => {
	const dijkstra = (grid, start, end) => {
		const visitedOrder = [];
		start.distance = 0; start.weight = 0;
		priorityQueue.enq(start);

		while(!priorityQueue.isEmpty()){
			const curNode = priorityQueue.deq();
			if(curNode.distance === Infinity) return visitedOrder;
			visitedOrder.push(curNode);
			if(curNode.row === end.row && curNode.col===end.col) return visitedOrder;
			const { row, col } = curNode;
			for(let i=0; i<4; i++){
				let x = row+dirX[i],y = col+dirY[i];
				if(isValid(grid, x, y) && curNode.distance+grid[x][y].weight<grid[x][y].distance){
					grid[x][y].distance = curNode.distance+grid[x][y].weight;
					grid[x][y].prev = curNode;
					priorityQueue.enq(grid[x][y]);
				}
			}
		}
		return visitedOrder;
	}
	return { dijkstra };
}

export default Dijkstra;