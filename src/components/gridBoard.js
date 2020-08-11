import React, { Component } from 'react';
import Node from './Node/node';

class GridBoard extends Component {
	constructor(props){
		super(props);
	}

	render(){
		const { grid, handleMouseDown, handleMouseUp, handleMouseEnter } = this.props;

		return (
			<div>
			{
			grid.grid.map((row, rowIdx) => {
			    		return (
			    			<div>
			    			  {
			    			  	row.map((node, nodeIdx) => {
			    			  		const {row, col, isStart, isEnd, isWall, weight} = node;
			    			  		return (
			    			  			<Node
			    			  			 col={col}
			    			  			 row={row}
			    			  			 isStart={isStart}
			    			  			 isEnd={isEnd}
			    			  			 isWall={isWall}
			    			  			 weight={weight}
			    			  			 onMouseDown={(row, col) => handleMouseDown(row, col)}
			    			  			 onMouseEnter={(row, col) => handleMouseEnter(row, col)}
			    			  			 onMouseUp={() => handleMouseUp()}
			    			  			>
			    			  			</Node>
			    			  		);
			    			  	})
			    			  }
			    			</div>
			    		);
			    	  })
			     }
			 </div>
		);
	}
}

export default GridBoard;