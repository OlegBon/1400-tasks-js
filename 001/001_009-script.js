let outputDiv = document.querySelector(".output");

// Створення елементів для вводу числа та кнопки для додавання числа
let divInput = document.createElement("div");
let input = document.createElement("input");
input.type = "number"; // Встановлюємо тип input як number
input.placeholder = "Введіть число";
let button = document.createElement("button");
button.textContent = "Додати число";
divInput.append(input, button); // Додаємо input та кнопку до divInput

outputDiv.before(divInput);

button.addEventListener("click", function () {
  let number = input.value;
  if (number === "") {
    outputDiv.textContent = "Ви не ввели число.";
  } else {
    outputDiv.textContent = `${number} – ось яке число Ви ввели`;
  }
  input.value = ""; // Очистка поля ввода после нажатия кнопки
});
