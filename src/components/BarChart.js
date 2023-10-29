import {useEffect, useState} from "react";

const barStyles = {
    width: '30px',
    margin: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    transition: '1s'
};

const valueStyles = {
    margin: '5px',
    fontWeight: '500'
}

const backgroundColor = {
    unsorted: '#42acc9',
    sorted: '#1968a6',
    onSwapping: '#ff4136'
};

const BarChart = ({currentResult, swapPair}) => {

    const [bars, setBars] = useState(currentResult);

    useEffect(() => {
        setBars(currentResult);
    }, [currentResult]);

    return (
        <>
            <div className="bar-chart" style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'center',
                margin: '80px 80px'
            }}>
                {bars.map((bar, index) => (
                    <div className="container-bar" key={index}>
                        <div style={{
                            backgroundColor: `${backgroundColor[bar.color]}`, ...barStyles,
                            height: `${bar.value * 5}px`,
                            width: '35px'
                        }}>
                        </div>
                        <div style={valueStyles}>
                            {bar.value}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default BarChart;