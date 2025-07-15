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

// (a^2 +10)/sqrt(a^2 + 1)

function mathFormula(a) {
  return (a ** 2 + 10) / Math.sqrt(a ** 2 + 1);
}

button.addEventListener("click", () => {
  let a = +input.value;
  if (a === "") {
    outputParagraph.textContent = "Ви не ввели число.";
    return;
  }
  outputParagraph.textContent = `a = ${a}, y = (a^2 +10)/sqrt(a^2 + 1) = ${mathFormula(
    a
  )}`;
  input.value = "";
});
