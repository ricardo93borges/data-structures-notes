## How to reverse a Singly Linked List

In a [Singly Linked List](https://ricardoborges.dev/data-structures-in-typescript-linked-list), each node has only a pointer to the next node, and there are some ways to reverse it, the one that I want to show here doesn't require extra space.

In this algorithm, we start from the list's head, and we use three pointers, each one for **previous node**, **current node** and **next node**.
In the beginning, The **current** and the **next** points to the list's head, and the **previous** points to null. While the **current** are pointing to a node we do the following:

1. **next** point to its next node
2. **current.next** points to **previous node**
3. **previous node** points to the **current node**
4. **current node** points to **next node**

This loop continues until the current points to null, which will mean that we reached the end of the list. Like this:

```typescript
prev = null;
current = head;
next = head;

while (current !== null) {
  next = next.next;
  current.next = prev;
  prev = current;
  current = next;
}
```

A single iteration works like this:

![images](https://res.cloudinary.com/dje4crtui/image/upload/v1626015999/data%20structures/reverse-linked-list_yloqhh.png)

This algorithm may vary according to the Linked List implementation, using [this implementation](https://ricardoborges.dev/data-structures-in-typescript-linked-list), looks like this:

```typescript
function reverse(linkedList: LinkedList<number>) {
  let prev = null;
  let current = linkedList.head;
  let next = linkedList.head;

  while (current !== null) {
    next = next.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  linkedList.head = prev;
}

const linkedList = new LinkedList((a: number, b: number) => a === b);

linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
linkedList.append(4);
linkedList.append(5);

reverse(linkedList);

linkedList.traverse();
```
