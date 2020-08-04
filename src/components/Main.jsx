/* eslint-disable no-loop-func */
import React, { useState, useEffect } from "react";
import bubbleSort from "../sorting_algorithms/bubbleSort";
import insertionSort from "../sorting_algorithms/insertionSort";
import mergeSort from "../sorting_algorithms/mergeSort";
import quickSort from "../sorting_algorithms/quickSort";

const Main = () => {
    const [arr, setArr] = useState([]);
    const [arrLength, setArrLength] = useState(50);
    // const [sorted, setSorted] = useState(false);

    // All the colors
    let arrayColor = getComputedStyle(
        document.documentElement
    ).getPropertyValue("--arrayColor");
    let endColor = "#87FF2A";
    let compareEleColor = "#FFCFF1";
    let setEleColor = "#9C2542";

    // Fill the array with random numbers
    function resetArray() {
        arr.map((ele, index) => {
            document.getElementById(index).style.background = arrayColor;
            document.getElementById(index).style.borderRadius = "0";
            document.getElementById(index).style.border = "1px solid white";
            return true;
        });

        const randArr = [];
        let random = 100;
        const size = arrLength;
        for (let i = 0; i < size; i++) {
            random = getRandomInt(10, 1000);
            randArr.push(random);
        }
        // console.log(randArr);
        setArr([...new Set(randArr)]);
    }

    useEffect(resetArray, [arrLength]);

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // update state every time the slider is changed
    function handleSlider(e) {
        setArrLength(e.target.value);
    }

    function handleSortSelect(e) {
        e.preventDefault();

        // Disable the buttons once a sorting technique is clicked
        const buttons = Array.from(document.querySelectorAll("button"));
        buttons.map((button) => (button.disabled = true));

        // // Disable the slider as well
        document.querySelector("#my-range").disabled = true;

        // Perform the required visualization
        if (e.target.value === "bubble") {
            let ar = arr;
            // To color the sorted array once the sorting process is done, O(n square) so settimeout propotional to that
            setTimeout(end, 1000 * ar.length);
            bubbleSort(ar);
        } else if (e.target.value === "insertion") {
            let ar = arr;
            setTimeout(end, 1000 * ar.length);
            insertionSort(ar);
        } else if (e.target.value === "merge") {
            // Make a copy of the state array
            const ar = arr;
            // Invoke the end() method in nlogn time as the compared to n sqaured time in the previous two sorting techniques
            setTimeout(end, (1000 / Math.log2(1000)) * ar.length);
            mergeSort(ar);
        } else if (e.target.value === "quick") {
            let ar = arr;

            // invoke the end() after a time corresponding to O(n logn)
            setTimeout(end, (1000 / Math.log2(1000)) * ar.length);

            // Invoke the function to begin the entire visualization procedure
            quickSort(ar);
            // end();
        }
    }
    // Funtion to color the entire array once it has been sorted
    function end() {
        Array.from(document.querySelectorAll(".array-ele")).map(
            (ele, index) => {
                return (function () {
                    setTimeout(() => {
                        ele.style.background = endColor;
                        ele.style.borderRadius = "3em 3em 0 0";
                        ele.style.border = "1px solid #00CC99";
                    }, index * parseInt(450 / arrLength));
                })();
            }
        );

        // Re-enable the buttons once a sorting technique is visualized
        const buttons = Array.from(document.querySelectorAll("button"));
        buttons.map((button) => {
            button.disabled = false;
            return true;
        });

        // // Re-enable the slider once the array is sorted
        document.querySelector("#my-range").disabled = false;
    }

    // To check if my algorithm does actually sort the array properly
    // function checkSort(array) {
    //     const jsSort = arr.sort((a, b) => a - b);
    //     if (jsSort.length !== array.length) return false;
    //     for (let i = 0; i < arr.length; i++) {
    //         if (jsSort[i] !== array[i]) return false;
    //     }
    //     return true;
    // }

    return (
        <div className="main-container">
            <section className="sort-options">
                <button onClick={() => resetArray()}>Generate New Array</button>
                <button onClick={handleSortSelect} value="bubble">
                    Bubble Sort
                </button>
                <button onClick={handleSortSelect} value="insertion">
                    Insertion Sort
                </button>
                <button onClick={handleSortSelect} value="merge">
                    Merge Sort
                </button>
                <button onClick={handleSortSelect} value="quick">
                    Quick Sort
                </button>
            </section>

            <section className="array-container">
                {arr.map((ele, index) => {
                    return (
                        <div
                            key={index}
                            id={`${index}`}
                            className="array-ele"
                            style={{
                                height: `${ele / 15}vh`,
                                width: `${40 / arrLength}vw`,
                            }}
                        />
                    );
                })}
            </section>

            <section className="slide-container">
                <label>Set Array size</label>
                <input
                    onChange={handleSlider}
                    type="range"
                    min="5"
                    max="150"
                    value={arrLength}
                    className="slider"
                    id="my-range"
                />
            </section>
        </div>
    );
};

export default Main;
