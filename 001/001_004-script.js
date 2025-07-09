let numbers = [5, 10, 21];
let outputDiv = document.querySelector(".output");

numbers.forEach((number, index) => {
  let paragraph = document.createElement("p");
  paragraph.textContent = number;
  outputDiv.append(paragraph);
  //   console.log(number); // Log to console for debugging
});
