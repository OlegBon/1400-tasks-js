let outputDiv = document.querySelector(".output");
let outputParagraph = document.createElement("p");
// let outputPre = document.createElement("pre");

outputDiv.append(outputParagraph); // Додаємо параграф до div для виводу
// outputDiv.append(outputPre); // Додаємо параграф до div для виводу

// Створення елементів для вводу числа та кнопки для додавання числа
let divInput = document.createElement("div");
let input = document.createElement("input");
input.type = "number"; // Тип поля ввода
input.placeholder = "Введіть сторону квадрату"; // Плейсхолдер для поля ввода
let button = document.createElement("button");
button.textContent = "Знайти периметр квадрату"; // Текст кнопки
divInput.append(input, button); // Додаємо input та кнопку до divInput

outputDiv.before(divInput);

// Клас для обробки помилок
class FormulaError extends Error {
  constructor(message, variableName, value) {
    super(`${message} Змінна: ${variableName}, значення: ${value}`);
    this.name = "FormulaError";
    input.value = "";
    this.value = value;
  }
}

// Функція для обчислення периметру квадрату
function perimeterOfSquare(side) {
  if (side <= 0) {
    throw new FormulaError(
      "Сторона не може бути меншою або рівною нулю",
      "side",
      side
    );
  }
  return side * 4;
}

button.addEventListener("click", () => {
  const inputValue = input.value;

  if (inputValue === "") {
    outputParagraph.textContent = "Ви не ввели число.";
    return;
  }

  const sideOfSquare = +inputValue;

  try {
    const result = perimeterOfSquare(sideOfSquare);
    outputParagraph.textContent = `side = ${sideOfSquare}, perimeter = ${result}`;
  } catch (error) {
    if (error instanceof FormulaError) {
      console.error(error.message);
      outputParagraph.textContent =
        "Сталася помилка — дивіться консоль для деталей.";
    } else {
      console.error("Невідома помилка:", error);
      outputParagraph.textContent = "Невідома помилка обчислення.";
    }
  }

  input.value = "";
});
