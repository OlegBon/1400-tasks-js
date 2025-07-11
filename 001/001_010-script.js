let outputDiv = document.querySelector(".output");

// Створення елементів для вводу числа та кнопки для додавання числа
let divInput = document.createElement("div");
let input = document.createElement("input");
input.type = "text"; // Тип поля ввода
input.placeholder = "Введіть ім'я"; // Плейсхолдер для вводу імені
let button = document.createElement("button");
button.textContent = "Додати ім'я"; // Текст кнопки
divInput.append(input, button); // Додаємо input та кнопку до divInput

outputDiv.before(divInput);

button.addEventListener("click", function () {
  let name = input.value;
  if (name === "") {
    outputDiv.textContent = "Ви не ввели ім'я.";
  } else {
    outputDiv.textContent = `${name}`;
  }
  input.value = ""; // Очистка поля ввода после нажатия кнопки
});
