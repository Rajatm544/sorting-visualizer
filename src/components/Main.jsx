import React, { useState, useEffect } from "react";
// import PropTypes from 'prop-types'

const Main = (props) => {
    // Array is stored in the state
    const [arr, setArr] = useState([]);
    // No of the elements in the array
    const [noOfEle, setnoOfEle] = useState(20);

    // Fill the array in the state with random numbers everytime the 'noOfEle' changes
    useEffect(() => {
        const randArr = [];
        let random;
        for (let i = 0; i < noOfEle; i++) {
            random = getRandomInt(10, 1000);
            randArr.push(random);
        }
        setArr(randArr);
    }, [noOfEle]);

    // unique key for iterable object for avoiding React error
    let key = 0;

    // update state every time the slider is changed
    function handleSlider(e) {
        setnoOfEle(e.target.value);
    }

    function handleClick(e) {
        const randArr = [];
        let random;
        for (let i = 0; i < noOfEle; i++) {
            random = getRandomInt(10, 1000);
            randArr.push(random);
        }
        setArr(randArr);
    }

    return (
        <div className="main-container">
            {/* <nav className="navbar">Hello, world</nav> */}
            <div className="sort-options">
                <button onClick={handleClick}>Generate New Array</button>
                <button>Bubble Sort</button>
                <button>Insertion Sort</button>
                <button>Merge Sort</button>
                <button>Quick Sort</button>
            </div>

            <div className="array-container">
                {arr.map((ele) => (
                    <div
                        key={key++}
                        className="array-ele"
                        style={{
                            height: `${ele / 30}rem`,
                            width: `${40 / noOfEle}rem`,
                        }}
                    />
                ))}
            </div>

            <div className="slide-container">
                <label>Set Array size</label>
                <input
                    onChange={handleSlider}
                    type="range"
                    min="10"
                    max="100"
                    value={noOfEle}
                    className="slider"
                />
            </div>
        </div>
    );
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Main.propTypes = {
// }

export default Main;
