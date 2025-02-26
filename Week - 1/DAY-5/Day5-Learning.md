*What is the DOM?*

The DOM is stand for Document Object Model and represents the structure of a web page as a tree of objects.

JavaScript can be used to manipulate the DOM dynamically.

//Element Selector:--

// Selecting an element by ID
// let title = document.getElementById("main");
// console.log(title.textContent);

 // Selecting elements by class
// let items = document.getElementsByClassName("box");
// console.log(items);

 // Selecting elements using querySelector
// let firstParagraph = document.querySelector("p");
// console.log(firstParagraph.innerText);

//Modifying Elements
// Changing text content:-
// let heading = document.querySelector("h1");
// heading.textContent = "Hello, DOM!";

// Changing styles
// heading.style.color = "blue";
// heading.style.fontSize = "2em";

//Event Listeners:-
// Adding a click event listener
// let button = document.getElementById("myButton");
// button.addEventListener("click", function() {
//     alert("Button Clicked!");
// });