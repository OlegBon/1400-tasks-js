let outputDiv = document.querySelector(".output");
let outputParagraph = document.createElement("p");
// let outputPre = document.createElement("pre");

outputDiv.append(outputParagraph); // Додаємо параграф до div для виводу
// outputDiv.append(outputPre); // Додаємо параграф до div для виводу

// Створення елементів для вводу числа та кнопки для додавання числа
let divInput = document.createElement("div");
let input = document.createElement("input");
input.type = "number"; // Тип поля ввода
input.placeholder = "Введіть число"; // Плейсхолдер для поля ввода
let button = document.createElement("button");
button.textContent = "Додати число"; // Текст кнопки
divInput.append(input, button); // Додаємо input та кнопку до divInput

outputDiv.before(divInput);

// 17x^2 – 6x + 13
// 3a^2 + 5a – 21

function f1(x) {
  return 17 * x ** 2 - 6 * x + 13;
}

function f2(x) {
  return 3 * x ** 2 + 5 * x - 21;
}

button.addEventListener("click", () => {
  //   let x = +input.value;
  let a = +input.value;
  //   if (x === "") {
  if (a === "") {
    outputParagraph.textContent = "Ви не ввели число.";
    return;
  }
  //   outputParagraph.textContent = `x = ${x}, y = 17x^2 – 6x + 13 = ${f1(x)}`;
  outputParagraph.textContent = `a = ${a}, y = 3a^2 + 5a – 21 = ${f2(a)}`;
  input.value = "";
});
