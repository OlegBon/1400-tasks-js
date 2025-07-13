let outputDiv = document.querySelector(".output");
// let outputParagraph = document.createElement("p");
let outputPre = document.createElement("pre");

// outputDiv.append(outputParagraph); // Додаємо параграф до div для виводу
outputDiv.append(outputPre); // Додаємо параграф до div для виводу

// Створення елементів для вводу числа та кнопки для додавання числа
let divInput = document.createElement("div");
let input = document.createElement("input");
input.type = "number"; // Тип поля ввода
input.placeholder = "Введіть число"; // Плейсхолдер для поля ввода
let button = document.createElement("button");
button.textContent = "Додати число"; // Текст кнопки
divInput.append(input, button); // Додаємо input та кнопку до divInput

outputDiv.before(divInput);

let nmbr = []; // Масив для збереження введених чисел

button.addEventListener("click", function () {
  let number = parseInt(input.value);
  if (isNaN(number)) {
    alert("Будь ласка, введіть коректне число!");
    return;
  }

  nmbr.push(number); // Додаємо число

  if (nmbr.length === 4) {
    outputPre.textContent = nmbr.join(" ");
    nmbr = []; // Очищаємо масив для наступного вводу
  } else {
    outputPre.textContent = `Введено ${nmbr.length} з 4 чисел.`;
  }

  input.value = ""; // Очищення поля
});
