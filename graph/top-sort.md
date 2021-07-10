## Topological sort

Topological sort is an ordering of the vertices of a directed acyclic graph, in a way that if there is an edge from a vertex A to B, then A comes before B. For example, let's say there is a set of projects and some of them depend on other projects:

![graph](https://res.cloudinary.com/dje4crtui/image/upload/v1625769510/data%20structures/top_sort_q7iaub.png)

In this example project B and C depends on project A, and project D depends on projects B and C. Therefore, project A must be executed first, then projects B and C, and finally project D. Resulting in this order: [A, B, C, D] or [A, C, B, D].

Note that we start from node A because it doesn't have dependencies and repeat it, that is after A is done, B and C haven't dependencies anymore, so we can choose either one to be the next. That's why this algorithm works only on acyclic graphs.

We can use a modified depth-first search for this algorithm, [here I talk more about DPS](https://ricardoborges.dev/data-structures-in-typescript-graph). The steps are the following:

1 - For every unvisited node visit it and its adjacent nodes (DPS)
2 - After visiting a node and its adjacent add it at the beginning of a list (you can use a stack instead), this list will be in the topological order.

Here's an implementation in TypeScript, I'm using [this implementation of a graph](https://ricardoborges.dev/data-structures-in-typescript-graph):

```typescript
function topSort(
  node: Node<number>,
  visited: Map<number, boolean>,
  order: number[]
) {
  if (!node) return;

  // set node as visited
  visited.set(node.data, true);

  // for each of node's unvisited adjacent call topSort
  node.adjacent.forEach((item) => {
    if (!visited.has(item.data)) {
      topSort(item, visited, order);
    }
  });

  // add node at the beginning of the order list
  order.unshift(node.data);
}

// topological order list
const order = [];
// map to keep track of visited nodes
const visited = new Map();

// For every unvisited node visit it and its adjacent nodes
for (const entry of graph.nodes.entries()) {
  const node = entry[1];
  if (!visited.has(node.data)) {
    topSort(node, visited, order);
  }
}
```

There are other problems that topological sorting can resolve, like the order that courses have to be selected during college, since they may have other courses as a prerequisite. Or even the order of steps of a recipe, in which some must be taken before others.

There are a lot of explanations for this algorithm on the internet, here I tried to explain it in a little different way, I hope this helped you to make sense of it or if you haven't heard about topological sorting before, at least this may be an introduction of it.
