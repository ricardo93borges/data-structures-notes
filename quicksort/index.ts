import { swap } from "../utils/swap";

function rearrange(arr: number[], start: number, end: number) {
  const pivot = arr[end];
  let pointer = start;

  for (let i = start; i < end; i++) {
    if (arr[i] < pivot) {
      swap(arr, pointer, i);
      pointer++;
    }
  }

  swap(arr, pointer, end);
  return pointer;
}

function quickSort(arr: number[], start: number, end: number) {
  if (start >= end) return;

  const pointer = rearrange(arr, start, end);

  quickSort(arr, start, pointer - 1);
  quickSort(arr, pointer + 1, end);
}

const arr = [3, 7, 2, 6, 5];
quickSort(arr, 0, arr.length - 1);
console.log(arr);

// 3,7,2,6,5 - pv: 5, p: 0, i: 0
// 5,7,2,6,3 - pv: 5, p: 1, i: 1
// 5,7,2,6,3 - pv: 5, p: 1, i: 2
// 5,2,7,6,3 - pv: 5, p: 2, i: 3
// 5,2,7,6,3 - pv: 5, p: 2, i: 4
// 5,2,3,6,7 - pv: 5, p: 3, i: 4
// 5,2,3,7,6 - pv: 5, p: 3, i: 4
