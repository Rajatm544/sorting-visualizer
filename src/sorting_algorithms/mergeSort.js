function mergeSort(ar, speed) {
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

    // First enqueue all the arrays that are returned after getting merged.
    // Then perform the merge sort as usual, all we need is the different stages of merging, which we get from dequeueing.

    // An array implemented as a queue
    const queue = [];

    // Function to merge two arrays
    function merge(arr1, arr2) {
        let i = 0,
            j = 0;
        let res = [];
        while (i < arr1.length && j < arr2.length) {
            if (arr1[i] < arr2[j]) {
                res.push(arr1[i]);
                i++;
            } else {
                res.push(arr2[j]);
                j++;
            }
        }
        while (i < arr1.length) {
            res.push(arr1[i]);
            i++;
        }
        while (j < arr2.length) {
            res.push(arr2[j]);
            j++;
        }

        // Enqueue this state of merged arrays
        queue.push(res);
        return res;
    }

    // Actual mergeSort() function
    function mergeSort(a) {
        if (a.length <= 1) return a;
        let mid = Math.floor(a.length / 2);
        let left = mergeSort(a.slice(0, mid));
        let right = mergeSort(a.slice(mid));
        return merge(left, right);
    }

    // Invoke the merge function to accumulate the different states of the sorted/merged array in the queue
    mergeSort(ar);

    // An array indicating the indices of the array elements in a particular state
    const indices = [];

    // Build up the indices array
    for (let i = 0; i < queue.length; i++) {
        let tempIndices = [];
        let currentSection = queue[i];
        currentSection.map((ele) => {
            let reqIndex = ar.indexOf(ele);
            tempIndices.push(reqIndex);
            return true;
        });
        // Sort the indices required to animate every state, because we need to change height of the bars in the same order
        indices.push(tempIndices.sort((a, b) => a - b));
    }

    // Iterate through the various states of the sorted array, stored in the queue and animate it
    for (let i = 0; i < queue.length; i++) {
        setTimeout(() => {
            let currentSection = queue[i];
            let currentSectionIndices = indices[i];

            // Change the heights and colors of each section of the sorted array
            currentSectionIndices.forEach((ele, index) => {
                // Grab the required div
                let currentEleDiv = document.getElementById(ele);

                // Change height and background
                currentEleDiv.style.background = setEleColor;
                currentEleDiv.style.border = `1px solid ${arrayColor}`;
                let reqDivHeight = `${Math.ceil(currentSection[index] / 15)}vh`; // (we divide by 15 because we have the value in the array, but we need to display it as a bar)
                currentEleDiv.style.height = reqDivHeight;

                if (document.getElementById(ele + 1)) {
                    let nextEle = document.getElementById(ele + 1);
                    nextEle.style.background = compareEleColor;
                    nextEle.style.border = `1px solid ${arrayColor}`;
                }
            });
        }, (1000 / speed / Math.log2(1000 / speed)) * i); // waiting time correponds to O(n logn). Note: for previous two sorting techniques, the outer loop's waiting time was just (1000 * i)
    }
}

export default mergeSort;
