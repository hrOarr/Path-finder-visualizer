const visSpeed = 1000;
const pathSpeed = 1000;

const Animation = () => {

    const animate = (visitedOrder, Path, st, ed) => {
        const len = visitedOrder.length;
        for (let i = 0; i <= len; i++) {
            if (i === len) {
                setTimeout(() => {
                    shortestPath(Path);
                }, visSpeed * i);
                return;
            }

            if (st === visitedOrder[i] || ed === visitedOrder[i])
                continue;

            setTimeout(() => {
                let node = visitedOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = "node node-vis";
            }, visSpeed * i);
        }
    }

    const shortestPath = (Path) => {
        const len = Path.length;
        if (len === 2) return;
        for (let i = 0; i < len; i++) {
            if(i === 0 || i === len-1) continue;
            setTimeout(() => {
                let node = Path[i];
                // console.log(node)
                document.getElementById(`node-${node.row}-${node.col}`).className = "node node-shortest-path";
            }, pathSpeed * i);
        }
    }

    return {animate, shortestPath};
}

export default Animation;