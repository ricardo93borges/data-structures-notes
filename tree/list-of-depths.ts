import { BinarySearchTree, BinarySearchTreeNode } from ".";
import { LinkedList } from "../linked-list/index";

debugger;

function listOfDepths(
  node: BinarySearchTreeNode<number>,
  hashMap: Map<number, LinkedList<number>>,
  level: number
) {
  if (!node) return;
  //   console.log(level);
  if (!hashMap.has(level)) {
    const list = new LinkedList<number>((a: number, b: number) => a === b);
    hashMap.set(level, list);
  }

  hashMap.get(level).append(node.data);

  listOfDepths(node.leftNode, hashMap, level + 1);
  listOfDepths(node.rightNode, hashMap, level + 1);
}

function comparator(a: number, b: number) {
  if (a < b) return -1;

  if (a > b) return 1;

  return 0;
}

const bst = new BinarySearchTree(comparator);
bst.insert(5);

bst.insert(3);
bst.insert(4);
bst.insert(1);

bst.insert(7);
bst.insert(6);
bst.insert(8);

bst.preOrderTraversal(bst.root);

const hashMap = new Map<number, LinkedList<number>>();
listOfDepths(bst.root, hashMap, 0);
console.log(hashMap);
