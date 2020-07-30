import React, { useState, useEffect } from "react";
import BubbleSort from "./BubbleSort";

const Main = () => {
    const [arr, setArr] = useState([]);
    const [arrLength, setArrLength] = useState(10);
    const [sorted, setSorted] = useState(false);

    // All the colors
    let arrayColor = getComputedStyle(
        document.documentElement
    ).getPropertyValue("--arrayColor");
    let endColor = "#66FF66";

    // Fill the array with random numbers
    function resetArray() {
        arr.map((ele, index) => {
            document.getElementById(index).style.background = arrayColor;
            document.getElementById(index).style.borderRadius = "0";
            document.getElementById(index).style.border = "1px solid white";
        });
        // });
        const randArr = [];
        let random;
        const size = arrLength;
        for (let i = 0; i < size; i++) {
            random = getRandomInt(10, 1000);
            randArr.push(random);
        }
        // console.log(randArr);
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
            if (!sorted) {
                setTimeout(end, (1000 / arrLength) * ar.length ** 2);
                for (let i = 0; i < ar.length; i++) {
                    // console.log(checkSort(ar));
                    setTimeout(() => {
                        for (let j = 0; j < ar.length - i - 1; j++) {
                            setTimeout(() => {
                                let first = document.getElementById(j);
                                let second = document.getElementById(j + 1);
                                let firstPrev = document.getElementById(j - 1);
                                let secondPrev = document.getElementById(j - 2);

                                if (first && second) {
                                    first.style.background = "#FFCFF1";
                                    second.style.background = "#FFCFF1";
                                }
                                if (firstPrev && !secondPrev)
                                    firstPrev.style.background = arrayColor;
                                if (firstPrev && secondPrev) {
                                    firstPrev.style.background = arrayColor;
                                    secondPrev.style.background = arrayColor;
                                }
                                let firstHeight = first.clientHeight;
                                let secondHeight = second.clientHeight;
                                if (ar[j] > ar[j + 1]) {
                                    [ar[j], ar[j + 1]] = [ar[j + 1], ar[j]];
                                    first = document.getElementById(j + 1);
                                    second = document.getElementById(j);

                                    second.style.height = `${secondHeight}px`;
                                    first.style.height = `${firstHeight}px`;
                                }
                                if (j === ar.length - i - 2) {
                                    document.getElementById(
                                        j + 1
                                    ).style.background = "#9C2542";
                                    document.getElementById(
                                        j + 1
                                    ).style.border = `1px solid ${arrayColor}`;
                                    document.getElementById(
                                        j
                                    ).style.background = arrayColor;
                                }
                            }, (1000 / arrLength) * j);
                        }
                    }, (1000 / arrLength) * ar.length * i);
                }
            }
            function end() {
                Array.from(document.querySelectorAll(".array-ele")).map(
                    (ele, index) => {
                        return (function () {
                            setTimeout(() => {
                                ele.style.background = endColor;
                                ele.style.borderRadius = "3em 3em 0 0";
                                ele.style.border = "1px solid #44D7A8";
                            }, index * 2);
                        })();
                    }
                );
            }
        }
    }

    // To check if my algorithm does actually sort the array properly
    function checkSort(array) {
        const jsSort = arr.sort((a, b) => a - b);
        if (jsSort.length !== array.length) return false;
        for (let i = 0; i < arr.length; i++) {
            if (jsSort[i] !== array[i]) return false;
        }
        return true;
    }

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
