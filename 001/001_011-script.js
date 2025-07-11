let outputDiv = document.querySelector(".output");

// Створення елементів для вводу числа та кнопки для додавання числа
let divInput = document.createElement("div");
let input = document.createElement("input");
input.type = "text"; // Тип поля ввода
input.placeholder = "Введіть ім'я команди"; // Плейсхолдер для поля ввода
let button = document.createElement("button");
button.textContent = "Додати"; // Текст кнопки
divInput.append(input, button); // Додаємо input та кнопку до divInput

outputDiv.before(divInput);

button.addEventListener("click", function () {
  let nameFootball = input.value;
  if (nameFootball === "") {
    outputDiv.textContent = "Ви не ввели ім'я футбольної команди.";
  } else {
    outputDiv.textContent = `${nameFootball} – це чемпіон!`;
  }
  input.value = ""; // Очистка поля ввода после нажатия кнопки
});
