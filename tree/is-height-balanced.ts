import { BinarySearchTree, BinarySearchTreeNode } from ".";

function getHeight(node?: BinarySearchTreeNode<number>): number {
  if (!node) return 0;

  return 1 + Math.max(getHeight(node.leftNode), getHeight(node.rightNode));
}

function isHeightBalanced(node: BinarySearchTreeNode<number>): boolean {
  if (!node) return true;

  if (Math.abs(getHeight(node.leftNode) - getHeight(node.rightNode)) > 1)
    return false;

  return isHeightBalanced(node.leftNode) && isHeightBalanced(node.rightNode);
}

function checkHeight(node: BinarySearchTreeNode<number>): number {
  if (!node) return -1;

  const leftHeight = checkHeight(node.leftNode);
  const rightHeight = checkHeight(node.rightNode);

  const heightDiff = Math.abs(leftHeight - rightHeight);
  if (heightDiff > 1) {
    return Number.MIN_SAFE_INTEGER;
  } else {
    return Math.max(leftHeight, rightHeight) + 1;
  }
}

function comparator(a: number, b: number) {
  if (a < b) return -1;

  if (a > b) return 1;

  return 0;
}

export function run() {
  const bst = new BinarySearchTree(comparator);

  bst.insert(5);

  bst.insert(3);
  bst.insert(4);
  bst.insert(2);

  bst.insert(7);
  bst.insert(6);
  bst.insert(8);
  bst.insert(9);
  bst.insert(10);

  // console.log(isHeightBalanced(bst.root));
  console.log(checkHeight(bst.root));
}
