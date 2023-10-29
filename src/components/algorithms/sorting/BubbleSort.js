const BubbleSort = () => {
    const bubbleSort = (bars) => {
        let newBars = JSON.parse(JSON.stringify(bars));
        let swapPairs = [];
        let resultStates = [];
        let len = newBars.length;
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - i - 1; j++) {
                if (newBars[j].value > newBars[j + 1].value) {
                    let tmp = newBars[j];
                    newBars[j] = newBars[j + 1];
                    newBars[j + 1] = tmp;
                    newBars[j].color = 'onSwapping';
                    newBars[j+1].color = 'onSwapping';
                    swapPairs.push([j, j + 1]);
                    resultStates.push(JSON.parse(JSON.stringify(newBars)));
                    newBars[j].color = 'unsorted';
                    newBars[j+1].color = 'unsorted';
                }
            }
            newBars[len-i-1].color = "sorted";
            resultStates.push(JSON.parse(JSON.stringify(newBars)));
            swapPairs.push(null);
        }
        return {swapPairs, resultStates};
    }
    return { bubbleSort };
}
export default BubbleSort;