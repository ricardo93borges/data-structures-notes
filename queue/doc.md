## Data Structures in Typescript - Queue

A queue uses FIFO (first-in-first-out) ordering. That is, items are removed from the queue in the same order that they are added, like a line.
Queues can be used whenever is necessary to process things in that order (FIFO), like requests to a single shared resource, CPU scheduling, also helps in algorithms of other data structures, such as breadth-first search in graphs.

### Representation

A queue can be implemented using an array or a linked list, can be either fixed or dynamic size.

### Basic operations

- **Add** - Add an item to the end of the queue, also called enqueue.
- **Remove** - Remove the first item from the queue, also called dequeue.
- **Peek** - Return the top of the queue, without removing it.
- **isEmpty** - Return true if the queue is empty.
- **isFull** - Return true if the stack is full, used when the queue is fixed size.

Heres a implementation of a queue using an array, in Typescript an array doesn't have a fixed length, so the operation **isFull** is not required, however you can implement a queue with fixed length and use that operation.

```typescript
class Queue<T> {
  private array: T[] = [];

  add(data: T): void {
    this.array.push(data);
  }

  remove(): T | undefined {
    if (this.isEmpty()) throw new EmptyQueueException();

    return this.array.shift();
  }

  peek(): T {
    if (this.isEmpty()) throw new EmptyQueueException();

    return this.array[0];
  }

  isEmpty(): boolean {
    return this.array.length === 0;
  }
}
```
