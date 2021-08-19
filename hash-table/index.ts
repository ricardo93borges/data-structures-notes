import { LinkedList } from "../linked-list";

class HashTable {
  private size: number;
  private data: LinkedList<string>[] = [];

  constructor(size: number) {
    this.size = size;
  }

  hash(value: string): number {
    const sum = value
      .split("")
      .reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);

    // force sum into the hash table size
    return sum % this.size;
  }

  insert(value: string): void {
    const index = this.hash(value);

    if (!this.data[index]) {
      this.data[index] = new LinkedList<string>(
        (a: string, b: string) => a === b
      );
    }

    this.data[index].append(value);
  }

  search(value: string): string | null {
    const index = this.hash(value);
    console.log(this.data);
    if (this.data[index]) {
      return this.data[index].search(value)!.data;
    }

    return null;
  }
}

const hashTable = new HashTable(10);

hashTable.insert("aabb");
hashTable.insert("bbcc");
hashTable.insert("abcd");

console.log(hashTable.search("abcd"));
