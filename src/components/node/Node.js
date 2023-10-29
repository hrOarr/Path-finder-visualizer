import {useEffect, useState} from 'react';
import './Node.css';

const Node = (props) => {
    const [type, setType] = useState("");
    const { col, row, weight, onMouseDown, onMouseEnter, onMouseUp } = props;

    const nodeType = (node) => {
        let type = "";
        if(node.isStart){
            type = "node-start";
        }
        else if(node.isEnd){
            type = "node-end";
        }
        else if(node.isWall){
            type = "node-wall";
        }
        return type;
    }

    useEffect(() => {
        setType(nodeType(props));
        console.log("Type=", type)
    }, [type]);

    return (
            <div
                id={`node-${row}-${col}`}
                className={`node ${nodeType(props)}`}
                onMouseDown={() => onMouseDown(row, col)}
                onMouseEnter={() => onMouseEnter(row, col)}
                onMouseUp={() => onMouseUp()}
            >
                {weight}
            </div>
    );
}

export default Node;