import React, { Component } from 'react';
import Node from './Node/node';
import Grid from './Grid';
import Dijkstra from './algorithms/dijkstra';
import BFS from './algorithms/bfs';
import DFS from './algorithms/dfs';
import SPFA from './algorithms/spfa';
import Animator from './Animator';
import { Button } from 'react-bootstrap/Button';
import Header from './Header/header';
import GridBoard from './gridBoard';
import InitGrid from './initGrid';

class Visualizer extends Component {
	constructor(props){
		super(props);

		this.state = {
			algo: Dijkstra,
			algoText: "Dijkstra",
			animator: new Animator(),
			grid: new Grid(1, [4,4], [4,33]),
			InitGrid: new InitGrid(),
			st: [4,4],
			ed: [4,33],
			mousePress: false,
			movingStart: false,
			movingEnd: false,
			visualized: false
		}

		this.visualize = this.visualize.bind(this);
		this.ChangeAlgo = this.ChangeAlgo.bind(this);
		this.KeepWalls = this.KeepWalls.bind(this);
		this.clearGrid = this.clearGrid.bind(this);
		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);
	}
     
     // select algorithm
	ChangeAlgo(algo){
		const { grid, InitGrid, st, ed, visualized, algoText } = this.state;

		if(visualized) return;

		this.setState({ grid: InitGrid.initGrid(grid, false, st, ed) });

		const curAlgo = [];        
		switch(algo){
			case "BFS":
			  this.setState({ algo: BFS, algoText: "BFS" });
			  var newGrid = new Grid(BFS.weighted, st, ed);
			  newGrid = this.KeepWalls(newGrid);
			  this.setState({ grid: newGrid });
			  break;
			case "DFS":
			  this.setState({ algo: DFS, algoText: "DFS" });
			  var newGrid = new Grid(DFS.weighted, st, ed);
			  newGrid = this.KeepWalls(newGrid);
			  this.setState({ grid: newGrid });
			  break;
			case "Dijkstra":
			  this.setState({ algo: Dijkstra, algoText: "Dijkstra" });
			  var newGrid = new Grid(Dijkstra.weighted, st, ed);
			  newGrid = this.KeepWalls(newGrid);
			  this.setState({ grid: newGrid });
			  break;
			case "SPFA":
			  this.setState({ algo: SPFA, algoText: "SPFA" });
			  var newGrid = new Grid(SPFA.weighted, st, ed);
			  newGrid = this.KeepWalls(newGrid);
			  this.setState({ grid: newGrid });
			  break;
			default:
			  return;
		}
	}

	// keeping walls even after algo changed
	KeepWalls(newGrid){
		const { grid } = this.state;
		for(let i=0; i<20; i++){
			for(let j=0; j<44; j++){
				if(grid.grid[i][j].isWall){
					newGrid.grid[i][j].isWall = true;
				}
			}
		}

		return newGrid;
	}

	// make initial stage of grid
	clearGrid(){
		const { grid, visualized, InitGrid } = this.state;

		this.setState({ grid: InitGrid.initGrid(grid, true, [4,4], [4,33]) });
		this.setState({ st: [4,4], ed: [4,33], visualized: false });
	}

	handleMouseDown(row, col){
		const {grid, st, ed, visualized} = this.state;

		if(visualized) return;

		if(row===st[0] && col===st[1]){
			this.setState({ movingStart: true });
		}
		else if(row===ed[0] && col===ed[1]){
			this.setState({ movingEnd: true });
		}
		else{
			grid.toggleWall(row, col);
		}

		this.setState({ grid: grid, mousePress: true });
	}

	handleMouseEnter(row, col){
		const { grid, st, ed, mousePress, movingStart, movingEnd, visualized } = this.state;

		if(!mousePress || visualized) return;
		if(movingStart){
			grid.toggleStart(row, col);
			grid.toggleStart(st[0], st[1]);
			this.setState({ st: [row,col], movingStart: true });
		}
		else if(movingEnd){
			grid.toggleEnd(row, col);
			grid.toggleEnd(ed[0], ed[1]);
			this.setState({ ed: [row, col], movingEnd: true });
		}
		else{
			grid.toggleWall(row, col);
		}

		this.setState({ grid: grid });
	}

	handleMouseUp(){
		this.setState({ mousePress: false, movingStart: false, movingEnd: false });
	}

	visualize(){
		const { algo, animator, grid, InitGrid, st, ed, visualized, algoText } = this.state;

		if(visualized) return;

		this.setState({ visualized: true });
		this.setState({ grid: InitGrid.initGrid(grid, false, st, ed) });
		const traverser = new algo();
		const stNode = grid.grid[st[0]][st[1]];
		const edNode = grid.grid[ed[0]][ed[1]];

		if(stNode.isWall){
			stNode.isWall = !stNode.isWall;
		}

		if(edNode.isWall){
			edNode.isWall = !edNode.isWall;
		}

		let visitedOrder = "";
		if(algoText === "Dijkstra")visitedOrder = traverser.dijkstra(grid.grid, stNode, edNode);
		else if(algoText === "DFS")visitedOrder = traverser.dfs(grid.grid, stNode, edNode);
		else if(algoText === "BFS")visitedOrder = traverser.bfs(grid.grid, stNode, edNode);
		else if(algoText === "SPFA")visitedOrder = traverser.spfa(grid.grid, stNode, edNode);
		//console.log(visitedOrder)
		let Path = traverser.shortestPath(stNode, edNode);
		animator.animate(visitedOrder, Path, stNode, edNode);
	}

	render(){
		const{ grid, mousePress, algoText } = this.state;

		return (
			<div>
			  <Header
			   visualize={this.visualize}
			   visualized={this.state.visualized}
			   clearGrid={this.clearGrid}
			   ChangeAlgo={this.ChangeAlgo}
			  />
			  <h3>Current Algorithm : {algoText}</h3>
			  <div style={{ paddingTop: '10px' }}>
			    <GridBoard
			     grid={grid}
			     handleMouseDown={this.handleMouseDown}
			     handleMouseUp={this.handleMouseUp}
			     handleMouseEnter={this.handleMouseEnter} 
			     />
			  </div>
			</div>
		);
	}
}

export default Visualizer;