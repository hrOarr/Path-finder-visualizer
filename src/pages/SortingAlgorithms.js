import BarChart from "../components/BarChart";
import {Button, Card} from "react-bootstrap";
import {useEffect, useState} from "react";
import BubbleSort from "../components/algorithms/sorting/BubbleSort";

const algorithms = ["Bubble Sort", "Insertion Sort", "Selection Sort"];

const SortingAlgorithms = () => {
    const [algoText, setAlgoText] = useState('Bubble Sort');
    const [arrayList, setArrayList] = useState([]);
    const [currentResult, setCurrentResult] = useState([]);
    const [swapPair, setSwapPair] = useState([]);
    const [swapCount, setSwapCount] = useState(0);
    const limit = 50, count = 15;

    const generateRandomList = (max, count) => {
        const randomList = [];
        const set = [];
        while (randomList.length < count) {
            const randomNumber = Math.floor(Math.random() * max) + 1;
            if (!set.includes(randomNumber)) {
                set.push(randomNumber);
                randomList.push({
                   value: randomNumber,
                   color: 'unsorted'
                });
            }
        }
        setSwapCount(0);
        return randomList;
    }

    const generateNewList = () => {
        setArrayList(generateRandomList(limit, count));
    }

    useEffect(() => {
        setArrayList(generateRandomList(limit, count));
    }, []);

    const bubbleSort = () => {
        const { bubbleSort } = BubbleSort();
        const { swapPairs, resultStates } = bubbleSort(arrayList);
        animate(swapPairs, resultStates);
    }

    const animate = (swapPairs, resultStates) => {
        let len = resultStates.length;
        let totalSwaps = swapPairs.length;
        for(let i=0;i<len;i++){
            setTimeout(() => {
                setSwapPair(swapPairs[i]);
                setArrayList(resultStates[i]);
                if(swapPairs[i]!=null){
                    setSwapCount((prev) => prev+1);
                }
            }, i*1000);
        }
    }

    const changeAlgo = (event) => {
        const algo = event.target.value;
        switch (algo){
            case "Bubble Sort":
                setAlgoText("Bubble Sort");
            default:
                return;
        }
    }

    const visualize = () => {
        if(algoText === "Bubble Sort"){
            bubbleSort();
        }
    }

    return (
            <div style={{marginTop: '30px'}}>
                <h4>Sorting Algorithms Visualization</h4>
                <div style={{ marginTop: '20px' }}>
                    <div className="d-inline-block">
                        <select className="algo-select-dropdown" aria-label="algo-select" onClick={changeAlgo}>
                            {algorithms.map((algo, idx) => (
                                <option key={idx} value={algo}>{algo}</option>
                            ))}
                        </select>
                    </div>

                    <div className="inline">
                        <button type="button" className="custom-btn init-btn" onClick={generateNewList}>
                            Generate Random Values
                        </button>
                    </div>

                    <div className="inline">
                        <button type="button" className="custom-btn visualize-btn" onClick={visualize}>
                            Visualize
                        </button>
                    </div>

                    <div className="inline">
                        <button type="button" className="custom-btn clear-btn">
                            Reset
                        </button>
                    </div>
                </div>

                {
                    arrayList &&
                    <Card style={{padding: '1.8rem', marginTop: '2rem', marginBottom: '2rem', height: '500px', backgroundColor: '#f7f7f7', textAlign: 'center'}}>
                        <BarChart currentResult={arrayList} swapPair={swapPair}/>
                    </Card>
                }

                <h4>Swap Count: {swapCount}</h4>
        </div>
    );
}

export default SortingAlgorithms;