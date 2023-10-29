const shortestPath = (startNode, endNode) => {
    let curNode = endNode;
    const Path = [];
    while(curNode != null && curNode !== startNode){
        Path.unshift(curNode);
        curNode = curNode.prev;
    }
    Path.unshift(startNode);
    return Path;
}

const isValid = (grid, x, y) => {
    return (x >=0 && x < grid.length && y >= 0 && y < grid[0].length && !grid[x][y].isVisualized && !grid[x][y].isWall);
}

export {shortestPath, isValid};