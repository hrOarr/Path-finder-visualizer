import {Button, Form, Card} from 'react-bootstrap';
import {useEffect, useState} from "react";
import './GraphAlgorithms.css';
import GridBoard from "../components/GridBoard";
import BFS from "../components/algorithms/BFS";
import Grid from "../components/Grid";
import DFS from "../components/algorithms/DFS";
import Dijkstra from "../components/algorithms/Dijkstra";
import SPFA from '../components/algorithms/SPFA';
import {shortestPath} from "../components/Utils";
import Animation from "../components/Animate";

const algorithms = ["BFS", "DFS", "Dijkstra", "SPFA"];

const GraphAlgorithms = () => {

    const [algo, setAlgo] = useState(BFS);
    const [algoText, setAlgoText] = useState('BFS');
    const [grid, setGrid] = useState([]);
    const [start, setStart] = useState([4,4]);
    const [end, setEnd] = useState([4,20]);
    const [isVisualized, setIsVisualized] = useState(false);
    const [movingStart, setMovingStart] = useState(false);
    const [movingEnd, setMovingEnd] = useState(false);
    const [mousePress, setMousePress] = useState(false);

    const { toggleStart, toggleEnd, toggleWall } = Grid();

    useEffect(() => {
        const { createGrid } = Grid();
        setGrid(createGrid(false, [4,4], [4,20]));
    }, []);

    const handleMouseDown = (row, col) => {
        if(isVisualized) return;
        if(row===start[0] && col===start[1]){
            setMovingStart(true);
        }
        else if(row===end[0] && col===end[1]){
            setMovingEnd(true);
        }
        else{
            setGrid(toggleWall(grid, row, col));
        }
        setMousePress(true);
    }

    const handleMouseEnter = (row, col) => {
        if(!mousePress || isVisualized) return;
        let newGrid = [];
        if(movingStart){
            newGrid = toggleStart(grid, row, col);
            newGrid = toggleStart(newGrid, start[0], start[1]);
            setStart([row, col]);
            setMovingStart(true);
        }
        else if(movingEnd){
            newGrid = toggleEnd(grid, row, col);
            newGrid = toggleEnd(newGrid, end[0], end[1]);
            setEnd([row, col]);
            setMovingEnd(true);
        }
        else{
            newGrid = toggleWall(grid, row, col);
        }
        setGrid(newGrid);
    }

    const handleMouseUp = () => {
        setMousePress(false);
        setMovingStart(false);
        setMovingEnd(false);
    }

    // keeping walls even after algo changed
    const keepWalls = (newGrid) => {
        for(let i=0; i<20; i++){
            for(let j=0; j<30; j++){
                if(grid[i][j].isWall){
                    newGrid[i][j].isWall = true;
                }
            }
        }
        return newGrid;
    }

    // select algorithm
    const changeAlgo = (event) => {
        if(isVisualized) return;
        const algo = event.target.value;
        const { createGrid, initiateGrid } = Grid();
        setGrid(initiateGrid(grid, false, start, end));

        let newGrid = [];
        switch(algo){
            case "BFS":
                setAlgo(BFS);
                setAlgoText("BFS");
                newGrid = createGrid(false, start, end);
                break;
            case "DFS":
                setAlgo(DFS);
                setAlgoText("DFS");
                newGrid = createGrid(false, start, end);
                break;
            case "Dijkstra":
                setAlgo(Dijkstra);
                setAlgoText("Dijkstra");
                newGrid = createGrid(true, start, end);
                break;
            case "SPFA":
                setAlgo(SPFA);
                setAlgoText("SPFA");
                newGrid = createGrid(true, start, end);
                break;
            default:
                return;
        }
        setGrid(keepWalls(newGrid));
    }

    const visualize = () => {
        if(isVisualized) return;

        setIsVisualized(true);
        const { initiateGrid } = Grid();
        setGrid(initiateGrid(grid, false, start, end));

        const startNode = grid[start[0]][start[1]];
        const endNode = grid[end[0]][end[1]];

        if(startNode.isWall){
            startNode.isWall = !startNode.isWall;
        }
        if(endNode.isWall){
            endNode.isWall = !endNode.isWall;
        }

        let visitedOrder = "";
        if(algoText === "BFS"){
            const { bfs } = BFS();
            visitedOrder = bfs(grid, startNode, endNode);
        }
        else if(algoText === "DFS"){
            const { dfs } = DFS();
            visitedOrder = dfs(grid, startNode, endNode);
        }
        else if(algoText === "Dijkstra"){
            const { dijkstra } = Dijkstra();
            visitedOrder = dijkstra(grid, startNode, endNode);
        }
        else if(algoText === "SPFA"){
            const { spfa } = SPFA();
            visitedOrder = spfa(grid, startNode, endNode);
        }

        let path = shortestPath(startNode, endNode);
        const { animate } = Animation();
        animate(visitedOrder, path, startNode, endNode);
    }

    // make initial stage of grid
    const clearGrid = () => {
        const { initiateGrid } = Grid();
        setGrid(initiateGrid(grid, true, [4,4], [4,20]));
        setStart([4,4]);
        setEnd([4,20]);
        setIsVisualized(false);
    }

    const generateGrid = () => {
        const { createGrid } = Grid();
        let newGrid = [];
        switch(algo){
            case "BFS":
                newGrid = createGrid(false, start, end);
                break;
            case "DFS":
                newGrid = createGrid(false, start, end);
                break;
            case "Dijkstra":
                newGrid = createGrid(true, start, end);
                break;
            case "SPFA":
                newGrid = createGrid(true, start, end);
                break;
            default:
                return;
        }
        setGrid(newGrid);
    }

    return (
        <div style={{marginTop: '30px'}}>
            <h4>Graph Algorithms Visualization</h4>
            <div style={{ marginTop: '20px' }}>
                <div className="d-inline-block">
                    <select className="algo-select-dropdown" aria-label="algo-select"
                                 onClick={changeAlgo}>
                        {algorithms.map((algo, idx) => (
                            <option key={idx} value={algo}>{algo}</option>
                        ))}
                    </select>
                </div>

                <div className="inline">
                    <button type="button" className="custom-btn init-btn" onClick={generateGrid}>
                        Init Grid
                    </button>
                </div>

                <div className="inline">
                    <button type="button" className="custom-btn visualize-btn" onClick={visualize}>
                        Visualize
                    </button>
                </div>

                <div className="inline">
                    <button type="button" className="custom-btn clear-btn" onClick={clearGrid}>
                        Clear Grid
                    </button>
                </div>
            </div>

            {
                grid &&
                <Card style={{padding: '1.8rem', marginTop: '2rem', marginBottom: '2rem', backgroundColor: '#f7f7f7', textAlign: 'center'}}>
                    <GridBoard
                        grid={grid}
                        handleMouseDown={handleMouseDown}
                        handleMouseUp={handleMouseUp}
                        handleMouseEnter={handleMouseEnter}
                    />
                </Card>
            }
        </div>
    );
}

export default GraphAlgorithms;