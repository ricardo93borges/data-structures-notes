import { BinarySearchTree, BinarySearchTreeNode } from ".";

function isBST(node: BinarySearchTreeNode<number>, min: number, max: number) {
  if (!node) return true;

  if ((min && node.data <= min) || (max && node.data > max)) {
    return false;
  }

  if (
    !isBST(node.leftNode, min, node.data) ||
    !isBST(node.rightNode, node.data, max)
  ) {
    return false;
  }

  return true;
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

  console.log(isBST(bst.root, null, null));
}

run();
