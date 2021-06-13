## Data Structures in Typescript - Stack

A stack uses LIFO (last-in-first-out) ordering, the most recent item added is the first item to be removed, just like a real stack.
Some uses of this data structure are expressions evaluations and conversion (prefix, postfix and infix), backtracking and memory management.

### Representation

A stack can be implemented using an array or a linked list, can be either fixed or dynamic size.

### Basic operations

- **Push** - Add an item to the top of the stack
- **Pop** - Remove the top item from the stack
- **Peek** - Return the top of the stack, without removing it.
- **isEmpty** - Return true if the stack is empty.
- **isFull** - Return true if the stack is full, used when the stack is fixed size.

Heres a implementation of a stack using an array, in Typescript an array doesn't have a fixed length, so the operation **isFull** is not required, however you can implement a stack with fixed length and use that operation.

```typescript
class Stack<T> {
  private array: T[] = [];

  pop(): T | undefined {
    if (this.isEmpty()) throw new EmptyStackException();

    return this.array.pop();
  }

  push(data: T): void {
    this.array.push(data);
  }

  peek(): T {
    if (this.isEmpty()) throw new EmptyStackException();

    return this.array[this.array.length - 1];
  }

  isEmpty(): boolean {
    return this.array.length === 0;
  }
}
```
