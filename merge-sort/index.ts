function merge(left: number[], right: number[]): number[] {
  const sorted = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      sorted.push(left.shift() as number);
    } else {
      sorted.push(right.shift() as number);
    }
  }

  return [...sorted, ...left, ...right];
}

function mergeSort(list: number[]): number[] {
  if (list.length <= 1) return list;

  let left = list.slice(0, list.length / 2);
  let right = list.slice(list.length / 2, list.length);

  left = mergeSort(left);
  right = mergeSort(right);

  return merge(left, right);
}

const unsorted = [5, 4, 3, 2, 1];

const sorted = mergeSort(unsorted);

console.log(sorted);
