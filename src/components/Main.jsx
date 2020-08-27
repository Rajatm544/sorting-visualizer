/* eslint-disable no-loop-func */
import React, { useState, useEffect } from "react";

// Import all the sorting visualization files
import bubbleSort from "../sorting_algorithms/bubbleSort";
import insertionSort from "../sorting_algorithms/insertionSort";
import mergeSort from "../sorting_algorithms/mergeSort";
import quickSort from "../sorting_algorithms/quickSort";

// Import the icon for navbar
import Logo from "../icon.svg";

const Main = () => {
    const [arr, setArr] = useState([]);
    const [arrLength, setArrLength] = useState(77);
    const [maxSize, setMaxSize] = useState(800);
    const [speed, setSpeed] = useState(1.5);

    // Once component is mounted, change the slider's max attribute to 40 for smaller screens
    useEffect(() => {
        if (window.innerWidth <= 768) {
            // On smaller screens, limit the array size to 40
            document.getElementById("size-range").setAttribute("max", "40");
            document.getElementById("max-limit").innerHTML = "40";
            // Make the default size as 20 (mid point)
            setArrLength(20);
        } else {
            // Otherwise, let the maximum array element be of value 1000
            setMaxSize(1000);
        }
    }, []);

    // Fetch all the colors
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
        // While resetting the array, remove any style applied to the array div from the end() method
        arr.map((ele, index) => {
            document.getElementById(index).style.background = arrayColor;
            document.getElementById(index).style.borderRadius = "0";
            document.getElementById(
                index
            ).style.border = `1px solid ${arrayEleBorder}`;
            return true;
        });

        // Create an array of random elements and set state after that
        const randArr = [];
        let random;
        const size = arrLength;
        for (let i = 0; i < size; i++) {
            random = getRandomInt(10, maxSize);
            randArr.push(random);
        }
        setArr([...new Set(randArr)]); //Store only unique elements
    }

    // Reset the array whenver the arrLength changes
    useEffect(resetArray, [arrLength]);

    // Function to return a random number in a given range
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // update arrLength state property, every time the slider is changed
    function handleSlider(e) {
        e.target.id === "size-range"
            ? setArrLength(e.target.value)
            : setSpeed(e.target.value);
    }

    // Make a class-scoped root element to change style based on theme chosen
    let root = document.documentElement;

    // Function the change the theme as required
    function setTheme() {
        // check if dark theme background already exists by default
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
            root.style.setProperty("--arrayEleBorder", " #FFD3F8");
            root.style.setProperty("--endColor", " #B2F302");
        }

        // Update the stylesheet everytime the theme switch is toggled
        let links = document.getElementsByTagName("link");
        for (let link of links) {
            if (link.getAttribute("href").includes("./index.css")) {
                link.href = "./index.css?id=" + new Date().getMilliseconds(); //add a new id to refresh the stylesheet
            }
        }
    }

    // make a copy of the state array
    let ar = [...arr];

    function handleSortSelect(e) {
        e.preventDefault();

        // Store the current sorting algorithm chosen
        const currentAlgo = e.target.value;

        // Add info about time complexity of the sorting algorithm currently chosen
        let sortInfo = document.querySelector(".sort-info");
        const sortInfoStyle = sortInfo.style; // Store a copy of the existing style
        const squared = "<sup>2</sup>"; // Displaying the superscript for squared

        let infoMsg = `**${currentAlgo} sort has a time complexity of `;
        if (currentAlgo === "bubble" || currentAlgo === "insertion")
            infoMsg += `O(n${squared})`;
        if (currentAlgo === "merge" || currentAlgo === "quick")
            infoMsg += "O(n log n)";

        sortInfo.innerHTML = infoMsg;
        sortInfo.style = {
            ...sortInfoStyle,
            display: "block",
        };

        // Disable the buttons once a sorting technique is clicked
        const buttons = Array.from(document.querySelectorAll("button"));
        buttons.map((button) => {
            button.disabled = true;
            button.style.borderColor = "#DA2C43";
            button.style.color = "#DA2C43";
            return true;
        });

        // // Disable the slider as well
        const sizeSlider = document.querySelector("#size-range");
        const speedSlider = document.querySelector("#speed-range");
        sizeSlider.disabled = true;
        speedSlider.disabled = true;
        sizeSlider.style.background = "#DA2C43";
        speedSlider.style.background = "#DA2C43";

        // Perform the required visualization
        if (currentAlgo === "bubble") {
            // To color the sorted array once the sorting process is done, O(n square) so settimeout propotional to that
            setTimeout(end, (1000 / speed) * ar.length);

            // Invoke the function to begin the entire visualization procedure
            bubbleSort(ar, speed);
        } else if (currentAlgo === "insertion") {
            // To color the sorted array once the sorting process is done, O(n square) so settimeout propotional to that
            setTimeout(end, (1000 / speed) * ar.length);

            // Invoke the function to begin the entire visualization procedure
            insertionSort(ar, speed);
        } else if (currentAlgo === "merge") {
            // Invoke the end() method in nlogn time as the compared to n sqaured time in the previous two sorting techniques
            setTimeout(
                end,
                (1000 / speed / Math.log2(1000 / speed)) * ar.length
            );

            // Invoke the function to begin the entire visualization procedure
            mergeSort(ar, speed);
        } else if (currentAlgo === "quick") {
            // invoke the end() after a time corresponding to O(n logn)
            // Invoke the function to begin the entire visualization procedure
            quickSort(ar, speed).then(() => end());
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
        const sizeSlider = document.querySelector("#size-range");
        let currentStyle = sizeSlider.style;
        sizeSlider.style = {
            ...currentStyle,
            background: mainText,
        };
        sizeSlider.disabled = false;

        const speedSlider = document.querySelector("#speed-range");
        currentStyle = speedSlider.style;
        speedSlider.style = {
            ...currentStyle,
            background: mainText,
        };
        speedSlider.disabled = false;

        // Sort the state array to ensure that if another sorting technique is used immediately after another, it doesnt bug out
        ar = [...arr].sort((a, b) => a - b);

        // Disable the display of the note stating the time complexity of the algorithm
        document.querySelector(".sort-info").style.display = "none";
    }

    return (
        <div className="outer-container">
            <div className="navbar">
                <span
                    className="nav-brand"
                    onClick={() => window.location.reload()}
                >
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
                    <div
                        className="sort-info"
                        style={{ display: "none" }}
                    ></div>
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
                    <div className="array-size-slider">
                        <label>Set Array Size</label>
                        <div className="slider-content">
                            <span>5</span>
                            <input
                                onChange={handleSlider}
                                type="range"
                                min="5"
                                max="150"
                                value={arrLength}
                                className="size-slider slider"
                                id="size-range"
                            />
                            <span id="max-limit">150</span>
                        </div>
                    </div>
                    <div className="speed-slider">
                        <label>Set Speed</label>
                        <div className="slider-content">
                            <span>1</span>
                            <input
                                onChange={handleSlider}
                                type="range"
                                min="0.5"
                                max="2.5"
                                step="0.5"
                                value={speed}
                                className="slider"
                                id="speed-range"
                            />
                            <span>5</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Main;
