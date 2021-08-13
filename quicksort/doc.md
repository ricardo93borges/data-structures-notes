## Quick Sort

Quick Sort is an in-place [sorting algorithm](/tag/sorting) that uses a divide-and-conquer technique to sort a given list, which means it breaks down a problem into smaller parts in order to be simpler to solve and doesn't uses auxiliary data structures.

Quick Sort starts by selecting an element from the list to be the **pivot**, usually is the first or last element.

Next, rearrange the other elements, so all elements smaller than the pivot go to its left and all elements greater than the pivot goes to its right.

This process is repeated for the right and left sides of the pivot.

![quicksort](https://res.cloudinary.com/dje4crtui/image/upload/v1628888249/algorithms/sorting/quicksort_nag90i.gif)

## Implementation

Here is a recursive implementation of Quick Sort in [TypeScript](/tag/typescript)

```typescript
/**
 * swap function
 */
export function swap(arr: number[], i: number, j: number) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

/**
 * recursive function
 */
function quickSort(arr: number[], start: number, end: number) {
  // base case
  if (start >= end) return;

  // rearrange the entire array based on a pivot
  // this pointer is the middle of the array, it will be explained in the next function
  const pointer = rearrange(arr, start, end);

  // rearrange the left and right side of the pivot
  quickSort(arr, start, pointer - 1);
  quickSort(arr, pointer + 1, end);
}

/**
 * function to rearrange the array based on a pivot
 */
function rearrange(arr: number[], start: number, end: number) {
  // choose last element to be the pivot
  const pivot = arr[end];

  // this pointer works like a placeholder for the pivot, at the end, it will be in the middle of the array, and will swap with the pivot that is in the end
  let pointer = start;

  for (let i = start; i < end; i++) {
    if (arr[i] < pivot) {
      swap(arr, pointer, i);

      // increment pointer, so it stays ahead of the elements that are smaller than the pivot
      pointer++;
    }
  }

  // put the pivot in the middle
  swap(arr, pointer, end);
  return pointer;
}

const arr = [3, 7, 2, 6, 5];
quickSort(arr, 0, arr.length - 1);
console.log(arr); // 2, 3, 5, 6, 7
```

The important part of Quick Sort is the choice of the **pivot**, since a bad choice leads to the worst-case time complexity, speaking of which, the average case time complexity of this algorithm is _O(n log n)_, while in the worst case is _O(n²)_, however, the worst-case can be avoided using a randomized version of this algorithm. Also, unlike [Merge Sort](https://ricardoborges.dev/merge-sort), Quick Sort is an in-place algorithm, which gives it the advantage of having a constant space complexity _O(1)_.
