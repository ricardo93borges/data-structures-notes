function swap(arr: number[], i: number, j: number) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

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

const arr = [5, 3, 1, 2, 4];
selectionSort(arr);
console.log(arr);
