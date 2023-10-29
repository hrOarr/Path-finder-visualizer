import Node from './node/Node';

const GridBoard = (props) => {
    const { grid, handleMouseDown, handleMouseUp, handleMouseEnter } = props;

    return (
        <div>
            {
                grid.map((row) => (
                    <div>
                        {
                            row.map((node) => {
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
                                    />
                                );
                            })
                        }
                    </div>
                ))}
        </div>
    );
}

export default GridBoard;