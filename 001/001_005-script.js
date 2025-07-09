// let numbers = [1, 2];
// let outputDiv = document.querySelector(".output");

// numbers.forEach((number, index) => {
//   let paragraph = document.createElement("p");
//   paragraph.textContent = number;
//   outputDiv.append(paragraph);
//   //   console.log(number); // Log to console for debugging
// });

let numbers = [1, 2];
let outputDiv = document.querySelector(".output");

let pre = document.createElement("pre");
pre.textContent = numbers.join("\n");
outputDiv.appendChild(pre);
