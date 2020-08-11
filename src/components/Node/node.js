import React, { Component } from 'react';
import './node.css';

class Node extends Component{
	constructor(props){
		super(props);
	}

	nodeType(node){
		var type = "";
		// console.log(node)
		if(node.isStart){
			type = "node-start";
		}
		else if(node.isEnd){
			type = "node-end";
		}
		else if(node.isWall){
			type = "node-wall";
		}
		const t = type;
		return t;
	}

	render(){
		const{ col, row, isStart, isEnd, isVis, isWall, weight, onMouseDown, onMouseEnter, onMouseUp } = this.props;
		const type = this.nodeType(this.props);
		return (
			<div className="node-box">
			  <div
			    id={`node-${row}-${col}`}
			    className={`node ${type}`}
			    onMouseDown={() => onMouseDown(row, col)}
			    onMouseEnter={() => onMouseEnter(row, col)}
			    onMouseUp={() => onMouseUp()}
			  >
			  <p>{weight}</p>
			  </div>
			</div>
		);
	}
}

export default Node;