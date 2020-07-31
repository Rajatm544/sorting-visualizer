/* eslint-disable no-loop-func */
import React, { useState, useEffect } from "react";
// import BubbleSort from "./BubbleSort";

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

    // Fill the array with random numbers
    function resetArray() {
        arr.map((ele, index) => {
            document.getElementById(index).style.background = arrayColor;
            document.getElementById(index).style.borderRadius = "0";
            document.getElementById(index).style.border = "1px solid white";
            return true;
        });
        // });
        const randArr = [];
        let random;
        const size = arrLength;
        for (let i = 0; i < size; i++) {
            random = getRandomInt(10, 1000);
            randArr.push(random);
        }
        setArr(randArr);
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
        if (e.target.value === "bubble") {
            let ar = arr;
            // if (!sorted) {
            // To color the sorted array once the sorting process is done, O(n square) so settimeout propotional to that
            setTimeout(end, 1000 * ar.length);
            for (let i = 0; i < ar.length; i++) {
                // The outer loop must run once time the entire array length has been traversed
                setTimeout(() => {
                    // The inner loop must run for every time we compare two elements
                    for (let j = 0; j < ar.length - i - 1; j++) {
                        setTimeout(() => {
                            // first and second are the elements currently being compared
                            // I use them to color, so as to visualize the comparision
                            let first = document.getElementById(j);
                            let second = document.getElementById(j + 1);

                            // firstPrev and secondPrev are the 2 elements before 'first'
                            // To set back their color to match the rest of the unsorted array
                            let firstPrev = document.getElementById(j - 1);
                            let secondPrev = document.getElementById(j - 2);

                            // If both first and second are true, meaning we are comparing somewhere apart from the beginning of the array
                            // Then color them a shade of light pink, for showing comparision
                            if (first && second) {
                                first.style.background = compareEleColor;
                                second.style.background = compareEleColor;
                            }

                            // If only the firstPrev element is found, that means we are at the beginning of the array
                            // so color only that element to match the rest of the unsorted array
                            if (firstPrev && !secondPrev)
                                firstPrev.style.background = arrayColor;
                            // If both the previous elements are present, color them both to match the color of the unsorted array, as they are not being compared now
                            if (firstPrev && secondPrev) {
                                firstPrev.style.background = arrayColor;
                                secondPrev.style.background = arrayColor;
                            }

                            // To visualize the swapping, we shall interchange the heights of 'first' and 'second'
                            // Store the 'clientHeights' of first and second, which returns height + border in px
                            let firstHeight = first.clientHeight;
                            let secondHeight = second.clientHeight;

                            // Compare the values of 'first' and 'second'
                            // Check if first > second, for ascending order
                            if (ar[j] > ar[j + 1]) {
                                // Swap the two elements, so that 'first' and 'second' are interchanged
                                [ar[j], ar[j + 1]] = [ar[j + 1], ar[j]];

                                // Reassign the 'first' and 'second' after swapping them
                                first = document.getElementById(j + 1);
                                second = document.getElementById(j);

                                // Change their heights to visualize the swap
                                second.style.height = `${secondHeight}px`;
                                first.style.height = `${firstHeight}px`;
                            }

                            // If inner loop has reached its last index, that means we have now pushed the largest element to the end
                            // Color this fixed element differently
                            if (j === ar.length - i - 2) {
                                document.getElementById(
                                    j + 1
                                ).style.background = "#9C2542";

                                document.getElementById(
                                    j + 1
                                ).style.border = `1px solid ${arrayColor}`;

                                // Setting the penultimate elements's color to match the rest of the unsorted array
                                document.getElementById(
                                    j
                                ).style.background = arrayColor;
                            }
                        }, (1000 / arrLength) * j);
                    }
                }, 1000 * i);
                // }
            }
        } else if (e.target.value === "insertion") {
            setTimeout(end, 200 * arrLength);
            let ar = arr;
            for (let i = 1; i < arrLength; i++) {
                let current = document.getElementById(i);

                let currentVal = ar[i];
                setTimeout(() => {
                    for (let j = i - 1; j >= 0; j--) {
                        setTimeout(() => {
                            current.style.background = compareEleColor;

                            let first = document.getElementById(j);
                            first.style.background = "#9C2542";
                            first.style.border = `1px solid ${arrayColor}`;

                            if (ar[j] > currentVal) {
                                let firstHeight = first.clientHeight;
                                let currentHeight = current.clientHeight;

                                first.style.height = `${currentHeight}px`;
                                current.style.height = `${firstHeight}px`;

                                first.style.background = compareEleColor;
                                current.style.background = "#9C2542";

                                [ar[j + 1], ar[j]] = [ar[j], ar[j + 1]];
                                // current.style.background = arrayColor;
                                current = document.getElementById(j);
                                currentVal = ar[j];
                                first.style.background = arrayColor;
                                first.style.border = `1px solid ${arrayColor}`;
                            }
                        }, (200 / arrLength) * (arrLength - j));
                    }
                }, 200 * (i - 1));
            }
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
                    }, index * parseInt(arrLength / 3));
                })();
            }
        );
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
                />
            </section>
        </div>
    );
};

export default Main;
