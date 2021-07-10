import { Node, Graph } from ".";

// works only for connected graphs
function topSort(
  node: Node<number>,
  visited: Map<number, boolean>,
  order: number[]
) {
  if (!node) return;

  visited.set(node.data, true);

  node.adjacent.forEach((item) => {
    if (!visited.has(item.data)) {
      topSort(item, visited, order);
    }
  });

  order.unshift(node.data);
}

export function run() {
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
  const n6 = graph.addNode(6);
  const n7 = graph.addNode(7);

  graph.addEdge(n1.data, n2.data);
  graph.addEdge(n1.data, n3.data);
  graph.addEdge(n2.data, n4.data);
  graph.addEdge(n3.data, n4.data);
  // disconnected
  graph.addEdge(n4.data, n5.data);
  graph.addEdge(n6.data, n7.data);

  // 1 2 3 4 5

  /*   graph.addEdge(n1.data, n2.data);
  graph.addEdge(n1.data, n3.data);
  graph.addEdge(n2.data, n3.data);
  graph.addEdge(n2.data, n4.data);
  graph.addEdge(n3.data, n4.data);
  graph.addEdge(n3.data, n5.data); */

  /* graph.addEdge(n1.data, n2.data);
  graph.addEdge(n3.data, n2.data);
  graph.addEdge(n2.data, n4.data);
  graph.addEdge(n4.data, n3.data);
 */
  // console.log(graph.nodes);

  const order = [];
  const visited = new Map();

  // handle disconnected graphs
  for (const entry of graph.nodes.entries()) {
    const node = entry[1];
    if (!visited.has(node.data)) {
      topSort(node, visited, order);
    }
  }
  console.log(order);
}

// run();
