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
