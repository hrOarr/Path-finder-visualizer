import { isValid } from "../Utils";

const dirX = [+0, +0, +1, -1];
const dirY = [+1, -1, +0, +0];
let isWeighted = false;

const BFS = () => {
    const bfs = (grid, start, end) => {
        const visitedOrder = [];
        start.distance = 0; start.weight = 0;
        start.isVisualized = true;

        const queuedNodes = [];
        queuedNodes.push(start);

        while(queuedNodes.length>0){
            const curNode = queuedNodes.shift(); // get closer node
            visitedOrder.push(curNode);
            if(curNode.row === end.row && curNode.col === end.col) return visitedOrder;
            const { row, col } = curNode;
            for(let i=0; i<4; i++){
                let x = row+dirX[i],y = col+dirY[i];
                if(isValid(grid, x, y)){
                    grid[x][y].prev = curNode;
                    grid[x][y].isVisualized = true;
                    queuedNodes.push(grid[x][y]);
                }
            }
        }
        return visitedOrder;
    }
    return { bfs };
};

export default BFS;