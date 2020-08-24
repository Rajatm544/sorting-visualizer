function quickSort(ar, speed) {
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

    // An async sleep function to delay the swapping action in the quick sort
    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    // The helper function to place the pivot in its correct index, and return the index
    async function pivot(a, start = 0, end = a.length - 1) {
        let pivotIdx = start;
        let pivot = a[pivotIdx];

        for (let i = start + 1; i <= end; i++) {
            // Visualize the current div being compared with the pivot element
            let currentDiv = document.getElementById(i);
            let currentHeight = currentDiv.clientHeight;
            currentDiv.style.background = compareEleColor;
            currentDiv.style.border = `1px solid ${arrayColor}`;

            // At the beginning, seperately color the zero index array element, becuase the loop starts from the 1st index
            if (start === 0) {
                let firstDiv = document.getElementById(0);
                firstDiv.style.background = compareEleColor;
                firstDiv.style.border = arrayColor;
            }

            let pivotDiv;
            if (a[i] < pivot) {
                pivotIdx++;
                // In case a swap needs to be made, color the pivot element
                pivotDiv = document.getElementById(pivotIdx);
                pivotDiv.style.background = setEleColor;
                pivotDiv.style.border = `1px solid ${arrayColor}`;
                let pivotHeight = pivotDiv.clientHeight;

                // visualize the swapping
                currentDiv.style.height = `${pivotHeight}px`;
                pivotDiv.style.height = `${currentHeight}px`;

                // Delay the actual swapping to help visualize it
                await sleep(Math.floor(Math.log2(a.length ** 2) / speed));

                // Swap current element with the pivot
                [a[i], a[pivotIdx]] = [a[pivotIdx], a[i]];
            }
        }

        // After the loop, visualize the final swap to indicate the correct pivot position
        let startDiv = document.getElementById(start);
        let startHeight = startDiv.clientHeight;

        let pivotDiv = document.getElementById(pivotIdx);
        pivotDiv.style.background = setEleColor;
        pivotDiv.style.border = `1px solid ${arrayColor}`;
        let pivotHeight = pivotDiv.clientHeight;

        // Visualize the swap
        startDiv.style.height = `${pivotHeight}px`;
        pivotDiv.style.height = `${startHeight}px`;

        // Actual swap
        [a[start], a[pivotIdx]] = [a[pivotIdx], a[start]];

        return pivotIdx;
    }

    // function to perform the sort
    (async function quicksort(array, left = 0, right = array.length - 1) {
        // base case
        if (left < right) {
            let pivotIndex = await pivot(array, left, right);
            // Wait for both recursive calls to end
            await Promise.all([
                quicksort(array, left, pivotIndex - 1),
                quicksort(array, pivotIndex + 1, right),
            ]);
        }
        return array;
    })(ar);

    return new Promise((resolve) =>
        setTimeout(resolve, ar.length ** 2 / speed)
    );
}

export default quickSort;
