import { BinarySearchTree } from ".";

function comparator(a: number, b: number) {
  if (a < b) return -1;

  if (a > b) return 1;

  return 0;
}

function minimalTree(arr: number[], start: number, end: number) {
  if (end <= start) return;
  console.log(start, end);
  const mid = Math.round((start + end) / 2);
  const bst = new BinarySearchTree(comparator);
  const node = bst.insert(arr[mid]);

  if (node) {
    node.leftNode = minimalTree(arr, start, mid - 1);
    node.rightNode = minimalTree(arr, mid + 1, end);

    return node;
  }
}

const arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const result = minimalTree(arr, 0, arr.length - 1);
console.log(JSON.stringify(result));
