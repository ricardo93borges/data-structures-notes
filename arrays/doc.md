## Data Structures in Typescript - Array

Array is a common data structure that holds items of the same type, in Typescript, unlike other languages, an array doesn't have a fixed length. Also, in Typescript, you don't have to re-organizing all elements of an array when makings operations like insert or delete.

### Representation

<!-- add img here -->

- **Elements** are the items stored in a array
- **Index** is the location of a element in an array, it goes from 0 to (array length - 1)

```js
    // Array can be written like this
    const numbers: number[] = [1, 2, 3, 4]
    const names = string[] = ['Snake', 'Ocelot', 'Otacon', 'Naomi']

    // Also can be written using a generic array type, Array<elemType>
    let list: Array<number> = [1, 2, 3, 4]
    let list: Array<string> = ['Snake', 'Ocelot', 'Otacon', 'Naomi']
```

### Basics operations

**Traverse** - Print all array items one by one

```js
// 3 ways to iterate an array

for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}

for (const item of array) {
  console.log(item);
}

array.forEach((item) => {
  console.log(item);
});
```

**Insertion** - Add an item

```js
// add to the end
array.push(5);

// add to the beginning
array.unshift(0);

// add in a specific index position
array.splice(3, 0, 8); // add 8 in the index 3
```

**Deletion** - Remove an item

```js
// remove from the end
array.pop();

// remove from the beginning
array.shift();

// remove from a specific index position
array.splice(2, 1); // remove from index 2
```

**Update** - Update an item

```js
// update element in position 1
array[1] = 7;
```

**Search** - Search by an item

```js
// you can traverse an array to find an element by its value, or simply use the .find() function

const item = array.find((item) => item === 3); // search by an item with value 3
```

### Strings are arrays of characters

All above operations can be performed on strings in order to solve problems like count the occurrences of a character in string:

```js
let str = "aabbccdd";
let occurrences = 0;

for (let i = 0; i < str.length; i++) {
  if (str[i] === "c") {
    occurrences++;
  }
}

console.log(occurrences); // prints 2
```
