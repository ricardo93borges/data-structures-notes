## Data Structures in Typescript - Graph

Graph is data structure that consists of vertices (or node) that can be connected to other vertices by edges.

![graph](https://res.cloudinary.com/dje4crtui/image/upload/v1623451532/data%20structures/graph_1_w9efdw.png)

The **degree** is the number of edges that are connected to a vertex, for example the vertex **A** has a degree of **1** and the vertex **C** has a degree of 2.

Graphs can either directed or undirected, directed graphs are like a one-way-street, undirected are like a two-way-street.

![directed and undirected graphs](https://res.cloudinary.com/dje4crtui/image/upload/v1623367833/data%20structures/graph_2_tzprzz.png)

Graphs can also have cycles.

![cyclic and acyclic graphs](https://res.cloudinary.com/dje4crtui/image/upload/v1623367833/data%20structures/graph_3_v0zmhu.png)

Graphs might be a disconnected one, that means it consist of isolated subgraphs, or a connected one, in which all every pair of nodes are connected by an edge.

![connected and disconnected graphs](https://res.cloudinary.com/dje4crtui/image/upload/v1623367833/data%20structures/graph_4_eujwdh.png)

Graphs can be used to represent networks, websites structure, also used in path optimization algorithms, there are applications in other fields, such as linguistics, physics, chemistry, biology, mathematics, etc.

### Representation

Graphs can represented with

- **Adjacency list** - Every node stores a list of adjacent vertices, for example, an array or that contains all vertices and each vertex contains a another array with adjacent vertices, other data structures can be used instead of an array, like a hash table and a linked list.

- **Adjacency matrix** - An NxN boolean matrix (where N is the number of vertices), if the matrix[i][j] stores the value true, there is a connection between the vertices i and j. In an undirected graph matrix[j][i] also will store the value true. You can use other types instead of boolean, for example, numbers to represent weight.

![adjacency list and matrix](https://res.cloudinary.com/dje4crtui/image/upload/v1623367833/data%20structures/graph_5_qpznlu.png)

### Graph Search

#### Depth-first search

Depth-first search is a way to navigate a graph, it starts from a given vertex and visit each branch completely before move to another branch. DFS is often used when we need to visit every node in the graph.

![graph depth-first search](https://res.cloudinary.com/dje4crtui/image/upload/v1623451532/data%20structures/graph_6_pr8wqq.png)

Using DPS on the graph above the nodes will visited in the following order: A, B, D, C, E, F.

#### Breadth-first search

This is another way to navigate a graph, it starts from a given vertex and visit all adjacent vertices before go to any of their children. BFS is useful to find a path between two nodes.

![graph breadth-first search](https://res.cloudinary.com/dje4crtui/image/upload/v1623451532/data%20structures/graph_6_pr8wqq.png)

Using DPS on the graph above the nodes will visited in the following order: A, B, E, F, D, C.

#### Bidirectional search

Consists of running two breadth-first search simultaneously, each one start from a different vertex and run until they collide. This is useful to find the shortest path between two vertices.

![Bidirectional search](https://res.cloudinary.com/dje4crtui/image/upload/v1623452079/data%20structures/graph_7_yzwhhf.png)

Heres an implementation of a directed graph using a adjacency list, because it will perform better in almost all operations:

```typescript
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
      node = queue.remove(); // dequeue

      if (!node) continue;

      console.log(node.data);

      node.adjacent.forEach((item) => {
        if (!visited.has(item.data)) {
          visited.set(item.data, true);
          queue.add(item); // enqueue
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
```
