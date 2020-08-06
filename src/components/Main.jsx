/* eslint-disable no-loop-func */
import React, { useState, useEffect } from "react";
import bubbleSort from "../sorting_algorithms/bubbleSort";
import insertionSort from "../sorting_algorithms/insertionSort";
import mergeSort from "../sorting_algorithms/mergeSort";
import quickSort from "../sorting_algorithms/quickSort";
import Logo from "../icon.svg";

const Main = () => {
    const [arr, setArr] = useState([]);
    const [arrLength, setArrLength] = useState(77);
    const [maxSize, setMaxSize] = useState(800);
    // const [sorted, setSorted] = useState(false);

    // Once component is mounted, change the slider's max attribute to 40 for smaller screens
    useEffect(() => {
        if (window.innerWidth <= 768) {
            document.getElementById("my-range").setAttribute("max", "40");
            document.getElementById("max-limit").innerHTML = "40";
            setArrLength(20);
        } else {
            // Otherwise, let the maximum array element be 1000
            setMaxSize(1000);
        }
    }, []);

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
        let random;
        const size = arrLength;
        for (let i = 0; i < size; i++) {
            random = getRandomInt(10, maxSize);
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

    let root = document.documentElement;

    function setTheme() {
        // check if dark theme background already exists
        if (
            getComputedStyle(document.documentElement).getPropertyValue(
                "--backgroundColor"
            ) === " #2d283e"
        ) {
            root.style.setProperty("--backgroundColor", " #C3CDE6");
            root.style.setProperty("--mainText", " #0b2d53");
            root.style.setProperty("--secondaryColor", " #009DC4");
            root.style.setProperty("--arrayColor", " #5946B2");
            root.style.setProperty("--arrayEleBorder", " #391285");
            root.style.setProperty("--endColor", " #3AA655");
        } else {
            root.style.setProperty("--backgroundColor", " #2d283e");
            root.style.setProperty("--mainText", " #26dacb");
            root.style.setProperty("--secondaryColor", " #0b2d53");
            root.style.setProperty("--arrayColor", " #E30B5C");
            root.style.setProperty("--arrayEleBorder", " #ffd3f8");
            root.style.setProperty("--setEleColor", " #9C2542");
            root.style.setProperty("--compareEleColor", " #FFCFF1");
        }
    }

    // make a copy of the state array
    let ar = [...arr];

    function handleSortSelect(e) {
        e.preventDefault();

        // Disable the buttons once a sorting technique is clicked
        const buttons = Array.from(document.querySelectorAll("button"));
        buttons.map((button) => {
            button.disabled = true;
            button.style.borderColor = "#DA2C43";
            button.style.color = "#DA2C43";
            return true;
        });

        // // Disable the slider as well
        const slider = document.querySelector("#my-range");
        slider.disabled = true;
        slider.style.background = "#DA2C43";

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
            let currentStyle = button.style;
            // Use ... operator to retain the other style properties
            button.style = {
                ...currentStyle,
                borderColor: mainText,
                color: mainText,
            };
            button.disabled = false;
            return true;
        });

        // Re-enable the slider once the array is sorted
        const slider = document.querySelector("#my-range");
        let currentStyle = slider.style;
        slider.style = {
            ...currentStyle,
            background: mainText,
        };
        slider.disabled = false;

        // Sort the ar array to ensure that if another sorting technique is used immediately after another, it doesnt bug out
        ar = ar.sort((a, b) => a - b);
    }

    return (
        <div className="outer-container">
            <div className="navbar">
                <span className="nav-brand">
                    <img src={Logo} alt="logo" id="nav-logo" />
                    <p className="nav-heading">Visual Sort</p>
                </span>

                <div></div>

                <div className="theme-switch">
                    <span className="theme-prompt">LIGHT THEME</span>
                    <div className="switch">
                        <input
                            id="switch-1"
                            type="checkbox"
                            className="switch-input"
                        />
                        <label
                            htmlFor="switch-1"
                            className="switch-label"
                            onClick={setTheme}
                        ></label>
                    </div>
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
                                    height: `${Math.ceil(ele / 15)}vh`,
                                    width: `${40 / arrLength}vw`,
                                }}
                            />
                        );
                    })}
                </section>

                <section className="slider-container">
                    <section></section>
                    <label>Set Array Size</label>
                    <div className="slider-content">
                        <span>5</span>
                        <input
                            onChange={handleSlider}
                            type="range"
                            min="5"
                            max="150"
                            value={arrLength}
                            className="slider"
                            id="my-range"
                        />
                        <span id="max-limit">150</span>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Main;
