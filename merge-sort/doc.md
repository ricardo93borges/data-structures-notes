## Merge Sort

Merge sort is a sorting algorithm that uses a divide-and-conquer technique to sort a given list, which means it breaks down a problem into smaller parts in order to be simpler to solve.

Merge Sort starts by splitting the list into halves, and continues to split those sublists until only sublists with a single element are left. Then merge those sublists into sorted sublists, and continue doing so until end up with a single sorted list.

```
                [4, 3, 2, 1];
                |           |
               |             |
Divide      [4,3]           [2,1]
            |   |           |   |
           |     |         |     |
         [4]     [2]     [2]     [1]
           |     |         |     |
            |   |           |   |
Conquer     [2,4]           [1,2]
                |           |
                 |         |
                 [1, 2, 3, 4]
```

## Implementation

This algorithm can be implemented with two functions, one to **divide** and another to **merge** :

```typescript
/**
 * Function to merge
 **/
function merge(left: number[], right: number[]): number[] {
  const sorted = [];

  // until one of the sublists has a element, insert them into the sorted list
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      sorted.push(left.shift());
    } else {
      sorted.push(right.shift());
    }
  }

  // one of the sublists can still have leftover elements, so we need to merge them
  return [...sorted, ...left, ...right];
}

/**
 * Function to divide
 **/
function mergeSort(list: number[]): number[] {
  // base case
  if (list.length <= 1) return list;

  // split the list into two halves
  let left = list.slice(0, list.length / 2);
  let right = list.slice(list.length / 2, list.length);

  left = mergeSort(left);
  right = mergeSort(right);

  // merge the sublists
  return merge(left, right);
}

const unsorted = [5, 4, 3, 2, 1];
const sorted = mergeSort(unsorted);
console.log(sorted); // [1, 2, 3, 4, 5]
```

Merge Sort performs in O(n log n) in terms of time complexity, its space complexity is O(n) since it uses auxiliary arrays to store the sublists.
Also, we can leverage multi-threading to implement Merge Sort, sorting each half in separated threads, for example. Moreover, we can combine Merge Sort with other [sorting algorithms](https://ricardoborges.dev/starting-with-sorting-algorithms), for example, instead of splitting the list into single element sublists, we could split into small sublists with a few elements, and apply [Insertion Sort](https://ricardoborges.dev/starting-with-sorting-algorithms) to sort them.
