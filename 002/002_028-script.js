let outputDiv = document.querySelector(".output");
let outputParagraph = document.createElement("p");
// let outputPre = document.createElement("pre");

outputDiv.append(outputParagraph); // Додаємо параграф до div для виводу
// outputDiv.append(outputPre); // Додаємо параграф до div для виводу

// Створення елементів для вводу числа та кнопки для додавання числа
let divInput = document.createElement("div");
let input = document.createElement("input");
input.type = "number"; // Тип поля ввода
input.placeholder = "Введіть основи та кут"; // Плейсхолдер для поля ввода
let button = document.createElement("button");
button.textContent = "Обчислити"; // Текст кнопки
divInput.append(input, button); // Додаємо input та кнопку до divInput

outputDiv.before(divInput);

// Клас помилки
class FormulaError extends Error {
  constructor(message, variableName, value) {
    super(`${message} Змінна: ${variableName}, значення: ${value}`);
    this.name = "FormulaError";
    this.variableName = variableName;
    this.value = value;
  }

  static divisionByZero(variable, value) {
    return new FormulaError("Помилка: ділення на нуль.", variable, value);
  }

  static negativeRoot(variable, value) {
    return new FormulaError(
      "Помилка: вираз під коренем від’ємний.",
      variable,
      value
    );
  }

  static invalidValue(variable, value) {
    return new FormulaError(
      "Помилка: від'ємне число (або нуль).",
      variable,
      value
    );
  }
}

// Змінні
let nmbr = []; // Масив для збереження введених чисел
let arrIn = ["Основа 1 (a), см", "Основа 2 (b), см", "Кут (alpha), град"]; // Масив назв змінних для виводу

// Функція для обчислення площі трапеції
function calculatePerimeter(a, b, alpha) {
  if (a <= 0 || b <= 0 || alpha <= 0) {
    throw FormulaError.invalidValue("a, b, alpha", `${a}, ${b}, ${alpha}`);
  }
  if (alpha >= 90) {
    throw FormulaError.invalidValue("alpha", alpha);
  }
  let s = (b - a) / 2; // Довжина бічної сторони
  let h = s * Math.tan((alpha * Math.PI) / 180); // Висота трапеції
  if (h <= 0) {
    throw FormulaError.invalidValue("h", h);
  }
  let area = ((a + b) * h) / 2; // Площа трапеції
  return area.toFixed(3);
}

function handlerClick() {
  let number = +input.value;
  // if (number === "") {
  if (isNaN(number)) {
    outputParagraph.textContent = "Ви не ввели число.";
    return;
  }

  nmbr.push(number);

  if (nmbr.length === 3) {
    try {
      let result = calculatePerimeter(nmbr[0], nmbr[1], nmbr[2]);
      outputParagraph.textContent = `Основа 1: ${nmbr[0]} см, основа 2: ${nmbr[1]} см, кут: ${nmbr[2]} град. Площа трапеції: ${result} см².`;
    } catch (error) {
      if (error instanceof FormulaError) {
        console.error(error.message);
        outputParagraph.textContent =
          "Сталася помилка — дивіться консоль для деталей.";
      } else {
        console.error("Невідома помилка:", error);
        outputParagraph.textContent = "Невідома помилка.";
      }
    }
    nmbr = [];
  } else {
    let remaining = arrIn.slice(nmbr.length); // Масив залишкових змінних
    outputParagraph.textContent = `Введено ${
      arrIn[nmbr.length - 1]
    }. Залишається: ${remaining.join(", ")}`;
  }
  input.value = "";
}

button.addEventListener("click", handlerClick);
