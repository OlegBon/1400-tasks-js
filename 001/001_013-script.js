let outputDiv = document.querySelector(".output");
let outputParagraph = document.createElement("p");
outputDiv.appendChild(outputParagraph); // Додаємо параграф до div для виводу

// Створення елементів для вводу числа та кнопки для додавання числа
let divInput = document.createElement("div");
let input = document.createElement("input");
input.type = "number"; // Тип поля ввода
input.placeholder = "Введіть число"; // Плейсхолдер для поля ввода
let button = document.createElement("button");
button.textContent = "Додати число"; // Текст кнопки
divInput.append(input, button); // Додаємо input та кнопку до divInput

outputDiv.before(divInput);

button.addEventListener("click", function () {
  let nmbr = input.value;
  if (nmbr === "") {
    outputParagraph.textContent = "Ви не ввели число.";
  } else {
    // outputParagraph.textContent = `Наступне за числом ${nmbr} число – ${
    //   +nmbr + 1
    // }. Для числа ${nmbr} попереднє число – ${+nmbr - 1}.`;

    outputParagraph.style.whiteSpace = "pre-line"; // Дозволяємо перенос рядків
    outputParagraph.textContent = `Наступне за числом ${nmbr} число – ${
      +nmbr + 1
    }.\nДля числа ${nmbr} попереднє число – ${+nmbr - 1}.`;
  }
  input.value = ""; // Очистка поля ввода после нажатия кнопки
});
