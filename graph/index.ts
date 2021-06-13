import { Queue } from "../queue";

export class Node<T> {
  data: T;
  adjacent: Node<T>[];
  comparator: (a: T, b: T) => number;

  constructor(data: T, comparator: (a: T, b: T) => number) {
    this.data = data;
    this.adjacent = [];
    this.comparator = comparator;
  }

  addAdjacent(node: Node<T>): void {
    this.adjacent.push(node);
  }

  removeAdjacent(data: T): Node<T> | null {
    const index = this.adjacent.findIndex(
      (node) => this.comparator(node.data, data) === 0
    );

    if (index > -1) {
      return this.adjacent.splice(index, 1)[0];
    }

    return null;
  }
}

class Graph<T> {
  nodes: Map<T, Node<T>> = new Map();
  comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.comparator = comparator;
  }

  /**
   * Add a new node if it was not added before
   *
   * @param {T} data
   * @returns {Node<T>}
   */
  addNode(data: T): Node<T> {
    let node = this.nodes.get(data);

    if (node) return node;

    node = new Node(data, this.comparator);
    this.nodes.set(data, node);

    return node;
  }

  /**
   * Remove a node, also remove it from other nodes adjacency list
   *
   * @param {T} data
   * @returns {Node<T> | null}
   */
  removeNode(data: T): Node<T> | null {
    const nodeToRemove = this.nodes.get(data);

    if (!nodeToRemove) return null;

    this.nodes.forEach((node) => {
      node.removeAdjacent(nodeToRemove.data);
    });

    this.nodes.delete(data);

    return nodeToRemove;
  }

  /**
   * Create an edge between two nodes
   *
   * @param {T} source
   * @param {T} destination
   */
  addEdge(source: T, destination: T): void {
    const sourceNode = this.addNode(source);
    const destinationNode = this.addNode(destination);

    sourceNode.addAdjacent(destinationNode);
  }

  /**
   * Remove an edge between two nodes
   *
   * @param {T} source
   * @param {T} destination
   */
  removeEdge(source: T, destination: T): void {
    const sourceNode = this.nodes.get(source);
    const destinationNode = this.nodes.get(destination);

    if (sourceNode && destinationNode) {
      sourceNode.removeAdjacent(destination);
    }
  }

  /**
   * Depth-first search
   *
   * @param {T} data
   * @param {Map<T, boolean>} visited
   * @returns
   */
  depthFirstSearch(data: T, visited: Map<T, boolean> = new Map()): void {
    const node = this.nodes.get(data);

    if (!node) return;

    console.log(node.data);
    visited.set(node.data, true);

    node.adjacent.forEach((item) => {
      if (!visited.has(item.data)) {
        this.depthFirstSearch(item.data, visited);
      }
    });
  }

  /**
   * Breadth-first search
   *
   * @param {T} data
   * @returns
   */
  breadthFirstSearch(data: T): void {
    const visited: Map<T, boolean> = new Map();
    const queue: Queue<Node<T>> = new Queue();

    let node = this.nodes.get(data);

    if (!node) return;

    queue.add(node);
    visited.set(node.data, true);

    while (!queue.isEmpty()) {
      node = queue.remove();

      if (!node) continue;

      console.log(node.data);

      node.adjacent.forEach((item) => {
        if (!visited.has(item.data)) {
          visited.set(item.data, true);
          queue.add(item);
        }
      });
    }
  }
}

function comparator(a: number, b: number) {
  if (a < b) return -1;

  if (a > b) return 1;

  return 0;
}

const graph = new Graph(comparator);

const n1 = graph.addNode(1);
const n2 = graph.addNode(2);
const n3 = graph.addNode(3);
const n4 = graph.addNode(4);
const n5 = graph.addNode(5);
// graph.addNode(2);

graph.addEdge(n1.data, n2.data);
graph.addEdge(n2.data, n3.data);
graph.addEdge(n1.data, n4.data);
graph.addEdge(n4.data, n5.data);

// console.log(graph.nodes.get(1));

// graph.removeEdge(n1.data, n2.data);

// console.log(graph.nodes.get(1));
// console.log(graph.nodes);

// graph.printAllNodes();

// graph.removeNode(1);

// graph.printAllNodes();

// graph.depthFirstSearch(n1.data);
graph.breadthFirstSearch(n1.data);
