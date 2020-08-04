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
    let endColor = getComputedStyle(document.documentElement).getPropertyValue(
        "--endColor"
    );
    let mainText = getComputedStyle(document.documentElement).getPropertyValue(
        "--mainText"
    );
    let setEleColor = getComputedStyle(
        document.documentElement
    ).getPropertyValue("--setEleColor");
    let arrayEleBorder = getComputedStyle(
        document.documentElement
    ).getPropertyValue("--arrayEleBorder");

    // Fill the array with random numbers
    function resetArray() {
        arr.map((ele, index) => {
            document.getElementById(index).style.background = arrayColor;
            document.getElementById(index).style.borderRadius = "0";
            document.getElementById(
                index
            ).style.border = `1px solid ${arrayEleBorder}`;
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
        buttons.map((button) => {
            button.disabled = true;
            button.style.borderColor = "#DA2C43";
            button.style.color = "#DA2C43";
        });

        // // Disable the slider as well
        const slider = document.querySelector("#my-range");
        slider.disabled = true;
        slider.style.background = "#DA2C43";

        // make a copy of the state array
        let ar = [...arr];
        // Perform the required visualization
        if (e.target.value === "bubble") {
            // To color the sorted array once the sorting process is done, O(n square) so settimeout propotional to that
            setTimeout(end, 1000 * ar.length);

            bubbleSort(ar);
        } else if (e.target.value === "insertion") {
            // To color the sorted array once the sorting process is done, O(n square) so settimeout propotional to that
            setTimeout(end, 1000 * ar.length);

            insertionSort(ar);
        } else if (e.target.value === "merge") {
            // Invoke the end() method in nlogn time as the compared to n sqaured time in the previous two sorting techniques
            setTimeout(end, (1000 / Math.log2(1000)) * ar.length);

            mergeSort(ar);
        } else if (e.target.value === "quick") {
            // invoke the end() after a time corresponding to O(n logn)
            setTimeout(end, (750 / Math.log2(750)) * ar.length);

            // Invoke the function to begin the entire visualization procedure
            quickSort(ar);
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
            button.style.borderColor = mainText;
            button.style.color = mainText;
            return true;
        });

        // // Re-enable the slider once the array is sorted
        const slider = document.querySelector("#my-range");
        slider.disabled = false;
        slider.style.background = mainText;

        // setTimeout(resetArray, 50 * (arr.length % 100));
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
    function setTheme() {
        let root = document.documentElement;
        // check if dark theme background already exists
        if (
            getComputedStyle(root).getPropertyValue("--backgroundColor") ===
            " #2d283e"
        ) {
            // Set the display of the correct theme prompt
            document.getElementById("dark-theme-prompt").style.display =
                "block";
            document.getElementById("light-theme-prompt").style.display =
                "none";

            root.style.setProperty("--backgroundColor", " #C3CDE6");
            root.style.setProperty("--mainText", " #0b2d53");
            root.style.setProperty("--secondaryColor", " #009DC4");
            root.style.setProperty("--arrayColor", " #5946B2");
            root.style.setProperty("--arrayEleBorder", " #391285");
            root.style.setProperty("--endColor", " #3AA655");
        } else {
            // Set the display of the correct theme prompt
            document.getElementById("dark-theme-prompt").style.display = "none";
            document.getElementById("light-theme-prompt").style.display =
                "block";

            root.style.setProperty("--backgroundColor", " #2d283e");
            root.style.setProperty("--mainText", " #26dacb");
            root.style.setProperty("--secondaryColor", " #2d283e");
            root.style.setProperty("--arrayColor", " #E30B5C");
            root.style.setProperty("--arrayEleBorder", " white");
            root.style.setProperty("--setEleColor", " #9C2542");
            root.style.setProperty("--compareEleColor", " #FFCFF1");
        }
    }

    return (
        <div className="outer-container">
            <div className="navbar">
                <p className="nav-heading">SORTING VISUALIZER</p>

                <div></div>

                <div className="theme-switch">
                    <span id="dark-theme-prompt" style={{ display: "none" }}>
                        DARK THEME
                    </span>
                    <div className="switch">
                        <input
                            id="switch-1"
                            type="checkbox"
                            className="switch-input"
                            onClick={setTheme}
                        />
                        <label
                            htmlFor="switch-1"
                            className="switch-label"
                        ></label>
                    </div>
                    <span id="light-theme-prompt">LIGHT THEME</span>
                </div>
            </div>
            <div className="main-container">
                <section className="sort-options">
                    <button onClick={resetArray}>Generate New Array</button>
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
        </div>
    );
};

export default Main;
