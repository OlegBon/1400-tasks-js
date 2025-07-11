let outputDiv = document.querySelector(".output");
let outputParagraph = document.createElement("p");
outputDiv.appendChild(outputParagraph); // Додаємо параграф до div для виводу

// Створення елементів для вводу числа та кнопки для додавання числа
let divInput = document.createElement("div");
let input = document.createElement("input");
input.type = "text"; // Тип поля ввода
input.placeholder = "Введіть ім'я"; // Плейсхолдер для поля ввода
let button = document.createElement("button");
button.textContent = "Додати ім'я"; // Текст кнопки
divInput.append(input, button); // Додаємо input та кнопку до divInput

outputDiv.before(divInput);

button.addEventListener("click", function () {
  let name = input.value;
  if (name === "") {
    outputParagraph.textContent = "Ви не ввели ім'я.";
  } else {
    outputParagraph.textContent = `Привіт, ${name}!`;
  }
  input.value = ""; // Очистка поля ввода после нажатия кнопки
});
