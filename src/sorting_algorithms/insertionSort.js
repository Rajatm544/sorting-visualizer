/* eslint-disable no-loop-func */
function insertionSort(ar, speed) {
    // All the colors
    let arrayColor = getComputedStyle(
        document.documentElement
    ).getPropertyValue("--arrayColor");
    let compareEleColor = getComputedStyle(
        document.documentElement
    ).getPropertyValue("--compareEleColor");
    let setEleColor = getComputedStyle(
        document.documentElement
    ).getPropertyValue("--setEleColor");

    // Outer loop needs to run for the entire length of the array
    for (let i = 1; i < ar.length; i++) {
        // Keep track of the array element that needs to be inserted to correct position
        let current = document.getElementById(i);
        let currentVal = ar[i];

        // Set time to run outer loop for the entire of the array
        setTimeout(() => {
            // Inner loop needs to run from the current element up to the zeroth index
            for (let j = i - 1; j >= 0; j--) {
                setTimeout(() => {
                    // Color the element to be inserted into correct position
                    current.style.background = compareEleColor;

                    // Store the first element from the 'sorted' section for the comparisions
                    // Color it to be as a 'fixed' element
                    let first = document.getElementById(j);
                    first.style.background = setEleColor;
                    first.style.border = `1px solid ${arrayColor}`;

                    // Perform continuos comparisions and swap when necessary
                    if (ar[j] > currentVal) {
                        // Exchange the heights of 'first' and 'current'
                        let firstHeight = first.clientHeight;
                        let currentHeight = current.clientHeight;

                        first.style.height = `${currentHeight}px`;
                        current.style.height = `${firstHeight}px`;

                        first.style.background = compareEleColor;
                        current.style.background = setEleColor;

                        // Swap the elements in the array as well
                        [ar[j + 1], ar[j]] = [ar[j], ar[j + 1]];

                        // Set a new 'curremnt' element after swapping
                        current = document.getElementById(j);
                        currentVal = ar[j];
                    }
                }, (1000 / speed / ar.length) * (ar.length - j)); // multiplied by (arrLength - j) because j is decrementing in this case
            }
        }, (1000 / speed) * (i - 1)); // multiplied by (i - 1) because outer loop starts from 1, not 0
    }
}

export default insertionSort;
