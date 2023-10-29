const Grid = () => {
    const createNode = (row, col, isWeighted, start, end) => {
        let weight = "1";
        if (isWeighted) {
            weight = Math.floor(Math.random() * 9) + 1;
        }
        return {
            col,
            row,
            isStart: row === start[0] && col === start[1],
            isEnd: row === end[0] && col === end[1],
            isVisualized: false,
            isWall: false,
            distance: Infinity,
            weight: weight,
            prev: null,
        };
    };

    const createGrid = (isWeighted, start, end) => {
        const grid = [];
        for (let row = 0; row < 20; row++) {
            const curRow = [];
            for (let col = 0; col < 30; col++) {
                curRow.push(createNode(row, col, isWeighted, start, end));
            }
            grid.push(curRow);
        }
        return grid;
    };

    const initiateGrid = (grid, clearWall, start, end) => {
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 30; col++) {
                let curNode = grid[row][col];
                curNode.isVisualized = false;
                curNode.prev = null;
                curNode.distance = Infinity;

                document.getElementById(`node-${curNode.row}-${curNode.col}`).className = "node";

                if (clearWall) {
                    curNode.isWall = false;
                } else if (curNode.isWall) {
                    document.getElementById(`node-${curNode.row}-${curNode.col}`).className = "node node-wall";
                }

                if (row === start[0] && col === start[1]) {
                    document.getElementById(`node-${start[0]}-${start[1]}`).className = "node node-start";
                    curNode.isStart = true;
                }

                if (row === end[0] && col === end[1]) {
                    document.getElementById(`node-${end[0]}-${end[1]}`).className = "node node-end";
                    curNode.isEnd = true;
                }
            }
        }
        return grid;
    }

    const toggleStart = (grid, row, col) => {
        grid[row][col].isStart = !grid[row][col].isStart;
        return grid;
    };

    const toggleEnd = (grid, row, col) => {
        grid[row][col].isEnd = !grid[row][col].isEnd;
        return grid;
    };

    const toggleWall = (grid, row, col) => {
        grid[row][col].isWall = !grid[row][col].isWall;
        return grid;
    };

    return {createGrid, initiateGrid, toggleStart, toggleEnd, toggleWall};
}
export default Grid;