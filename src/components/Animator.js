class Animator {
	constructor(){
		this.VisSpeed = 10;
		this.PathSpeed = 50;
	}

	animate(visitedOrder, Path, st, ed){
		const len = visitedOrder.length;
		console.log(visitedOrder)
		for(let i=0; i<=len; i++){
			if(i === len){
				setTimeout(() => {
					this.shortestPath(Path);
				}, this.VisSpeed * i);
				return;
			}

			if(st === visitedOrder[i] || ed === visitedOrder[i])
				continue;

			setTimeout(() => {
				let node = visitedOrder[i];
				console.log(node)
				document.getElementById(`node-${node.row}-${node.col}`).className ="node node-vis";
			}, this.VisSpeed * i);
		}
	}

	shortestPath(Path){
		const len = Path.length;
		if(len === 2) return;
		for(let i=0; i<len; i++){
			setTimeout(() => {
				let node = Path[i];
				// console.log(node)
				document.getElementById(`node-${node.row}-${node.col}`).className ="node node-shortest-path";
			}, this.PathSpeed * i);
		}
	}
}

export default Animator;