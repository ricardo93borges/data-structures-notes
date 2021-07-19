## Data Structures in Typescript - Binary Search tree

### What is a Tree data structure

Before we talk BST, we have to understand that a tree is a kind of [Graph](https://ricardoborges.dev/data-structures-in-typescript-graph) with a root node and no cycles, each node can have zero or more child nodes, nodes can store any type of data, also those nodes may or may not be in a particular order, nodes that have no children are called leaves.

![tree](https://res.cloudinary.com/dje4crtui/image/upload/v1626722908/data%20structures/tree/tree_sgyxim.png)

### Binary Tree

A Binary tree is a tree that has up to two nodes:

![binary tree](https://res.cloudinary.com/dje4crtui/image/upload/v1626722908/data%20structures/tree/binary-tree_qpopld.png)

### Binary Search Tree

A BST is a Binary tree that follows these properties:

- All left descendants nodes are less or equal to their parent node
- All right descendants nodes are greater than their parent node

![binary search tree](https://res.cloudinary.com/dje4crtui/image/upload/v1626722908/data%20structures/tree/bst_yeac5b.png)

BST definitions can slightly vary, you may find a BSTs that the left subtree is less than the parent node (`left subtree < parent <= right subtree`).

Also, some BSTs may or may not allow duplicated nodes.

BST is useful when you need to insert, delete and search comparable elements. You can use an array for those operations, but, although access an element in an array is done in a constant time, whenever you insert or delete an element, the other elements have to be shifted, in a BST, on the other hand, you only need to adjust the pointers.

### Searching in the BST

The search starts from the root node, if the element you are searching for is greater than the current node value, then search for it in the right subtree, otherwise search in the left subtree, repeat this until the current node value is equal to the element you are searching for or until you reach a leaf node and there is nowhere to go:

```typescript
search(data) {
    // empty tree
    if (!root) return;

    // start from root node
    let current = root;

    while (current.data !== data) {
        // data greater than current element
        if (data > current.data) {

        // you are on a leaf node, nowhere to go
        if (!current.rightNode) return;

        // go to the right subtree
        current = current.rightNode;
        } else {

        // you are on a leaf node, nowhere to go
        if (!current.leftNode) return;

        // go to the left subtree
        current = current.leftNode;
        }
    }

    return current;
}
```

### Inserting in the BST

When inserting an new element in BST you have keep its properties, so start from the root node, if the new element value is grater than the root node value, search for an empty position in the right subtree, otherwise search for an empty position in the left subtree:

```typescript
insert(data) {
  // empty tree, insert the first node (the root node)
  if (!root) {
    root = new Node(data);
    return root;
  }

  // start from the root node
  let current = root;

  while (true) {
    if (data > current.data) {
      // search for an empty position in the right subtree
      if (current.rightNode) {
        current = current.rightNode;
      } else {
        // insert node
        current.rightNode = new Node(data);
        return current.rightNode;
      }
    } else {
      // search for an empty position in the right subtree
      if (current.leftNode) {
        current = current.leftNode;
      } else {
        // insert node
        current.leftNode = new Node(data);
        return current.leftNode;
      }
    }
  }
}

```

### Binary Search Tree traversal

There are three ways to traverse a BST, they differ on which order the nodes are visited (often, printed):

#### In-Order traversal

First visit left branch, then the current node, and finally the right branch, because of how elements are distributed in the BST, they will be visited in the ascending order:

```typescript
inOrderTraversal(node) {
  if (node) {
    inOrderTraversal(node.leftNode);
    console.log(node.data);
    inOrderTraversal(node.rightNode);
  }
}
```

#### Pre-Order traversal

Visit the current node before its children:

```typescript
preOrderTraversal(node) {
  if (node) {
    console.log(node.data);
    this.preOrderTraversal(node.leftNode);
    this.preOrderTraversal(node.rightNode);
  }
}
```

#### Post-Order traversal

Visit the current node's children first, then the current node:

```typescript
postOrderTraversal(node) {
  if (node) {
    this.postOrderTraversal(node.leftNode);
    this.postOrderTraversal(node.rightNode);
    console.log(node.data);
  }
}
```

Here's an implementation of a BST in typescript:

```typescript
export class BinarySearchTreeNode<T> {
  data: T;
  leftNode?: BinarySearchTreeNode<T>;
  rightNode?: BinarySearchTreeNode<T>;

  constructor(data: T) {
    this.data = data;
  }
}

export class BinarySearchTree<T> {
  root?: BinarySearchTreeNode<T>;
  comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.comparator = comparator;
  }

  insert(data: T): BinarySearchTreeNode<T> | undefined {
    if (!this.root) {
      this.root = new BinarySearchTreeNode(data);
      return this.root;
    }

    let current = this.root;

    while (true) {
      if (this.comparator(data, current.data) === 1) {
        if (current.rightNode) {
          current = current.rightNode;
        } else {
          current.rightNode = new BinarySearchTreeNode(data);
          return current.rightNode;
        }
      } else {
        if (current.leftNode) {
          current = current.leftNode;
        } else {
          current.leftNode = new BinarySearchTreeNode(data);
          return current.leftNode;
        }
      }
    }
  }

  search(data: T): BinarySearchTreeNode<T> | undefined {
    if (!this.root) return undefined;

    let current = this.root;

    while (this.comparator(data, current.data) !== 0) {
      if (this.comparator(data, current.data) === 1) {
        if (!current.rightNode) return;

        current = current.rightNode;
      } else {
        if (!current.leftNode) return;

        current = current.leftNode;
      }
    }

    return current;
  }

  inOrderTraversal(node: BinarySearchTreeNode<T> | undefined): void {
    if (node) {
      this.inOrderTraversal(node.leftNode);
      console.log(node.data);
      this.inOrderTraversal(node.rightNode);
    }
  }

  preOrderTraversal(node: BinarySearchTreeNode<T> | undefined): void {
    if (node) {
      console.log(node.data);
      this.preOrderTraversal(node.leftNode);
      this.preOrderTraversal(node.rightNode);
    }
  }

  postOrderTraversal(node: BinarySearchTreeNode<T> | undefined): void {
    if (node) {
      this.postOrderTraversal(node.leftNode);
      this.postOrderTraversal(node.rightNode);
      console.log(node.data);
    }
  }
}

function comparator(a: number, b: number) {
  if (a < b) return -1;

  if (a > b) return 1;

  return 0;
}

const bst = new BinarySearchTree(comparator);

bst.insert(5);

bst.insert(2);
bst.insert(3);
bst.insert(1);

bst.insert(7);
bst.insert(6);
bst.insert(8);

bst.inOrderTraversal(bst.root);
```

Unlike Graphs, a tree doesn't really need a Tree class, just a Node class would usually suffice.
