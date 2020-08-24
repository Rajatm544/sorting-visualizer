function bubbleSort(ar, speed) {
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
                        ).style.background = setEleColor;

                        document.getElementById(
                            j + 1
                        ).style.border = `1px solid ${arrayColor}`;

                        // Setting the penultimate elements's color to match the rest of the unsorted array
                        document.getElementById(
                            j
                        ).style.background = arrayColor;
                    }
                }, (1000 / speed / ar.length) * j);
            }
        }, (1000 / speed) * i);
    }
}

export default bubbleSort;
