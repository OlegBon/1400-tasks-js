let numbers = [47, 52, 150];
let outputDiv = document.querySelector(".output");

let output = numbers.join("  ");

let pre = document.createElement("pre");
pre.textContent = output;
outputDiv.appendChild(pre);
