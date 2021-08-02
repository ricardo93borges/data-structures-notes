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

const arr = [5, 3, 1, 2, 4];
insertionSort(arr);
console.log(arr);
