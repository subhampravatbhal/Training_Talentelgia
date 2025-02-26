what is string function
A string function in JavaScript is a built-in function that can be used to manipulate and work with strings. These methods allow us to modify, search, and extract data from strings.

length
toUpperCase()
toLowerCase()
trim()
slice()
replace()
split()
concat()
indexof()

String Functions in JavaScript

let text = "Hello, JavaScript!";

console.log(text.length); // Get length of string
console.log(text.toUpperCase()); // Convert to uppercase
console.log(text.toLowerCase()); // Convert to lowercase
console.log(text.includes("JavaScript")); // Check if string contains a word
console.log(text.indexOf("JavaScript")); // Find index of a word
console.log(text.slice(0, 5)); // Extract part of string
console.log(text.replace("JavaScript", "World")); // Replace text
console.log(text.split(",")); // Split string into array
console.log(text.trim()); // Remove whitespace from start and end

Array Functions in JavaScript

what is an array
An array in JavaScript is a special variable that can store multiple values in a single variable. It is an ordered collection of elements, and each element has an index starting from 0.

let numbers = [1, 2, 3, 4, 5];

console.log(numbers.length); // Get array length
console.log(numbers.push(6)); // Add element to end
console.log(numbers.pop()); // Remove last element
console.log(numbers.unshift(0)); // Add element to start
console.log(numbers.shift()); // Remove first element
console.log(numbers.indexOf(3)); // Get index of an element
console.log(numbers.includes(4)); // Check if array includes value
console.log(numbers.reverse()); // Reverse array
console.log(numbers.sort()); // Sort array

// Map function - Apply function to each element
console.log(numbers.map(num => num * 2));

// Filter function - Get elements matching condition
console.log(numbers.filter(num => num > 2));

// Reduce function - Accumulate values
console.log(numbers.reduce((sum, num) => sum + num, 0));