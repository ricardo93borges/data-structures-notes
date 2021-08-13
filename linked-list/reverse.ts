import { LinkedList } from "./index";

function reverse(linkedList: LinkedList<number>) {
  let prev = null;
  let current = linkedList.head;
  let next = linkedList.head;

  while (current !== null) {
    next = next!.next;
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
