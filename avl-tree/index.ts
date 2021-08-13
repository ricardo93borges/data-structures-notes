export class AVLTreeNode<T> {
  data: T;
  left?: AVLTreeNode<T>;
  right?: AVLTreeNode<T>;
  height: number;

  constructor(data: T) {
    this.data = data;
    this.height = 1;
  }
}

export class AVLTree<T> {
  root?: AVLTreeNode<T>;
  comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.comparator = comparator;
  }

  getHeight(node?: AVLTreeNode<T>): number {
    return node ? node.height : 0;
  }

  getBalance(node?: AVLTreeNode<T>): number {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  rightRotate(node?: AVLTreeNode<T>): AVLTreeNode<T> | undefined {
    if (!node) return;

    let left = node.left;
    let right = node.right;

    left!.right = node;
    node.left = right;

    node.height =
      1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    left!.height =
      1 + Math.max(this.getHeight(left!.left), this.getHeight(left!.right));

    return left;
  }

  leftRotate(node?: AVLTreeNode<T>): AVLTreeNode<T> | undefined {
    if (!node) return;

    let left = node.left;
    let right = node.right;

    right!.left = node;
    node.right = left;

    node.height =
      1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    right!.height =
      1 + Math.max(this.getHeight(right!.left), this.getHeight(right!.right));

    return right;
  }

  insert(data: T): AVLTreeNode<T> | undefined {
    if (!this.root) {
      this.root = new AVLTreeNode(data);
      return this.root;
    }

    let parent = this.root;

    while (true) {
      if (this.comparator(data, parent.data) === 1) {
        if (parent.right) {
          parent = parent.right;
        } else {
          parent.right = new AVLTreeNode(data);
          break;
        }
      } else {
        if (parent.left) {
          parent = parent.left;
        } else {
          parent.left = new AVLTreeNode(data);
          break;
        }
      }
    }

    parent.height =
      1 + Math.max(this.getHeight(parent.left), this.getHeight(parent.right));

    const balance = this.getHeight(parent);

    if (balance > 1 && data < parent!.left!.data) {
      return this.rightRotate(parent);
    }

    // Right Right Case
    if (balance < -1 && data > parent!.right!.data) {
      return this.leftRotate(parent);
    }

    // Left Right Case
    if (balance > 1 && data > parent!.left!.data) {
      parent.left = this.leftRotate(parent.left);
      return this.rightRotate(parent);
    }

    // Right Left Case
    if (balance < -1 && data < parent!.right!.data) {
      parent.right = this.rightRotate(parent.right);
      return this.leftRotate(parent);
    }

    return parent;
  }

  search(data: T): AVLTreeNode<T> | undefined {
    if (!this.root) return undefined;

    let current = this.root;

    while (this.comparator(data, current.data) !== 0) {
      if (this.comparator(data, current.data) === 1) {
        if (!current.right) return;

        current = current.right;
      } else {
        if (!current.left) return;

        current = current.left;
      }
    }

    return current;
  }

  inOrderTraversal(node: AVLTreeNode<T> | undefined): void {
    if (node) {
      this.inOrderTraversal(node.left);
      console.log(node.data);
      this.inOrderTraversal(node.right);
    }
  }

  preOrderTraversal(node: AVLTreeNode<T> | undefined): void {
    if (node) {
      console.log(node.data);
      this.preOrderTraversal(node.left);
      this.preOrderTraversal(node.right);
    }
  }

  postOrderTraversal(node: AVLTreeNode<T> | undefined): void {
    if (node) {
      this.postOrderTraversal(node.left);
      this.postOrderTraversal(node.right);
      console.log(node.data);
    }
  }
}

function comparator(a: number, b: number) {
  if (a < b) return -1;

  if (a > b) return 1;

  return 0;
}

const avl = new AVLTree(comparator);

avl.insert(2);
avl.insert(3);
avl.insert(1);

avl.preOrderTraversal(avl.root);
console.log(" --- ");

avl.insert(4);
avl.insert(5);
avl.insert(6);
avl.insert(7);

avl.preOrderTraversal(avl.root);
console.log(" --- ");
