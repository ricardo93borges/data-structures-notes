const array: number[] = [1, 2, 3, 4];

// Basic operations

// Traverse
console.log("/--- Traverse ---/");

console.log("/ for /");
for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}

console.log("/ for of /");
for (const item of array) {
  console.log(item);
}

console.log("/ for each /");
array.forEach((item) => {
  console.log(item);
});

// Insertion
console.log("/--- Insertion ---/");

// add to the end
array.push(5);
console.log(array);

// add to the beginning
array.unshift(0);
console.log(array);

// add in a specific index position
array.splice(3, 0, 8); // add 8 in the index 3
console.log(array);

// Deletion
console.log("/--- Deletion ---/");

// remove from the end
array.pop();
console.log(array);

// remove from the beginning
array.shift();
console.log(array);

// remove from a specific index position
array.splice(2, 1); // remove from index 2
console.log(array);

// Update
console.log("/--- Update ---/");
array[1] = 7;
console.log(array);

// Search
array[1] = 2;

const item = array.find((item) => item === 3);
console.log(item);

// string as arrayay

let str = "aabbccdd";
let occurrences = 0;

for (let i = 0; i < str.length; i++) {
  if (str[i] === "c") {
    occurrences++;
  }
}

console.log(occurrences);
