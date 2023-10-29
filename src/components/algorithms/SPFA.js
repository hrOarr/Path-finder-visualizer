import {isValid} from "../Utils";

const dirX = [+0, +0, +1, -1];
const dirY = [+1, -1, +0, +0];

const SPFA = () => {
    const spfa = (grid, start, end) => {
        const visitedOrder = [];
        start.distance = 0; start.weight = 0;

        const queue = [];
        queue.push(start);

        while(queue.length>0){
            const curNode = queue.shift();

            curNode.isVisualized = false;
            visitedOrder.push(curNode);
            if(curNode.row === end.row && curNode.col===end.col) return visitedOrder;
            const { row, col } = curNode;
            for(let i=0; i<4; i++){
                let x = row+dirX[i],y = col+dirY[i];
                if(isValid(grid,x,y) && curNode.distance+grid[x][y].weight<grid[x][y].distance){
                    grid[x][y].distance = curNode.distance+grid[x][y].weight;
                    grid[x][y].prev = curNode;
                    if(!grid[x][y].isVisualized){
                        queue.push(grid[x][y]);
                        grid[x][y].isVisualized = true;
                    }
                }
            }
        }
        return visitedOrder;
    }

    return {spfa};
}

export default SPFA;