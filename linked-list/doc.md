## Data Structures in Typescript - Linked List

A linked list is a data structure that holds objects arranged in a linear order, this order is determined by a pointer in each node.
Unlike an array, a linked list doesn't provide constant-time access to a particular index, you have to iterate through the list to find an element, on the other hand, is possible to add and remove items from the beginning of the list in a constant time.
Linked lists can be used to implement other data structures, such as stacks, queues and graphs.

There are some types of linked lists:

- **Singly linked list** - Each node has only a pointer to the next node.
- **Doubly linked list** - Each node has pointers to both the previous and next node.
- **Circular linked list** - The last node points to the first element.

### Representation

![array](https://res.cloudinary.com/dje4crtui/image/upload/v1622906568/data%20structures/linked-list_jdtg7y.png)

- **Head** - the first node
- **Tail** - the last node

### Basic operations

**Insertion** - It's possible to insert a new element anywhere in the list, you just have to take care of the pointers. If you are adding an element to the beginning the new node will pointer to the former head node. If you are appending to the tail, the former tail node will point to the new node. Now, if inserting between nodes, the previous node has to point to the new node which will point to the next node

**Deletion** - Follow a similar logic of insertion, if you want to remove a node from the middle of the list, you just have to make the target's previous node point to the target's next node. In a doubly-linked list, you have to take care of the previous pointer too.

**Traverse** - Each node has a point to next, so you start from the node head and follow the pointers until the last node, which will not point to any node (in a non-circular linked list)

```typescript
n = list.head

while n != null
    n = n.next

```

Here's an implementation of a singly linked list:

```typescript
class Node<T> {
  data: T;
  next: Node<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

class LinkedList<T> {
  head: Node<T> | null = null;
  comparator: (a: T, b: T) => boolean;

  constructor(comparator: (a: T, b: T) => boolean) {
    this.comparator = comparator;
  }

  append(data: T): void {
    if (!this.head) {
      this.head = new Node(data);
    } else {
      let current = this.head;
      while (current.next != null) {
        current = current.next;
      }
      current.next = new Node(data);
    }
  }

  delete(data: T): void {
    if (!this.head) return;

    // Check if the head node is the node to be removed
    if (this.comparator(this.head.data, data)) {
      this.head = this.head.next;
      return;
    }

    let current = this.head.next;
    let previous = this.head;

    /**
     * Search for the node to be removed and keep track of its previous node
     *
     * If it were a double linked list, we could simply search the node
     * and it would have a pointer to the previous node
     **/
    while (current) {
      if (this.comparator(current.data, data)) {
        current = null;
      } else {
        previous = current;
        current = current.next;
      }
    }

    /**
     * set previous.next to the target.next, if the node target is not found,
     * the 'previous' will point to the last node,
     * since the last node hasn't next, nothing will happen
     **/
    previous.next = previous.next ? previous.next.next : null;
  }

  search(data: T): Node<T> | null {
    let current = this.head;
    while (current) {
      if (this.comparator(current.data, data)) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  traverse() {
    let current = this.head;
    while (current != null) {
      console.log(current.data);
      current = current.next;
    }
  }
}
```

### Runner technique

This technique consists in iterate through a linked list with two pointers, a slow and a fast which will be ahead of the slow pointer by _n_ nodes.

This is useful to solve some problems with a linked list, like detecting a cycle or finding the middle node of a linked list when you don't know its size.

```typescript
/** Finding the middle node of a linked list **/

let slow: LinkedListNode<number> | null | undefined = linkedList.head;
let fast: LinkedListNode<number> | null | undefined = linkedList.head?.next;

/**
 * The "fast" will move twice as fast as the "slow" one,
 * so at the moment the "fast" reaches the end of the list,
 * the "slow" will be in the middle of the list
 **/

while (fast) {
  slow = slow?.next;
  fast = fast?.next?.next;
}

console.log(slow);
```
