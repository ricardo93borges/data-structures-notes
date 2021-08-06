## Starting with sorting algorithms

a sorting algorithm is an algorithm that sorts elements in a list into an order, among other uses, sorting can be applied to prepare a set of data for another algorithm, for example, Binary Search.

In this post, I'll describe three sorting algorithms that, although not the most efficient, are easy to understand and are in-place algorithms, meaning that they don't require auxiliary data structures.

### Bubble Sort

Bubble sort starts at the beginning of the list, comparing each pair of adjacent elements, if the first is greater than the second, it swaps them. Then it starts again at the beginning of the list and repeats this process until no swap occurred on the last pass.

![bubble sort](https://res.cloudinary.com/dje4crtui/image/upload/v1627934933/algorithms/sorting/bubble-sort_az17q6.gif)

```typescript
function swap(arr: number[], i: number, j: number) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

function bubbleSort(arr: number[]) {
  for (let i = 0; i < arr.length - 1; i++) {
    let swapped = false;

    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        swapped = true;
      }
    }

    if (!swapped) break;
  }
}

const arr = [5, 3, 1, 2, 4];
bubbleSort(arr);
console.log(arr);
```

Since its complexity is $Ο(n^2)$ on average and worst cases, this algorithm is more suitable for small or nearly ordered data sets.

### Selection Sort

The list is divided into a sorted part at the left and an unsorted part at the right in this algorithm. Initially, the sorted sublist is empty and the unsorted one is all the list. Then it searches for the smallest element in the unsorted sublist and swaps it with the leftmost unsorted element, moving the sublist boundaries one element to the right.

![selection sort](https://res.cloudinary.com/dje4crtui/image/upload/v1627934933/algorithms/sorting/selection-sort_limbbw.gif)

```typescript
function selectionSort(arr: number[]) {
  for (let i = 0; i < arr.length - 1; i++) {
    let min = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }

    swap(arr, min, i);
  }
}
```

Like Bubble Sort, this algorithm has a quadratic complexity $Ο(n^2)$, so it is also more suitable for small or nearly ordered data sets. However, Selection Sort performs fewer swaps than Bubble Sort.

### Insertion Sort

Insertion Sort keeps a sorted sublist at the beginning of the list, and for each element from the list, it searches for the right position in that sublist to _insert_ that element.

![insertion sort](https://res.cloudinary.com/dje4crtui/image/upload/v1627934933/algorithms/sorting/Insertion-sort_txmv8m.gif)

```typescript
function insertionSort(arr: number[]) {
  for (let i = 1; i < arr.length; i++) {
    let value = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > value) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = value;
  }
}
```

Insertion sort has a quadratic complexity for average and worst cases too, however, it's the fastest sorting algorithm for small lists.
