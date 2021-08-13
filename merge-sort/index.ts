function merge(left: number[], right: number[]): number[] {
  console.log("a", left);
  console.log("b", right);
  const sorted = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      sorted.push(left.shift());
    } else {
      sorted.push(right.shift());
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
