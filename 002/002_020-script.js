let outputDiv = document.querySelector(".output");
let outputParagraph = document.createElement("p");
// let outputPre = document.createElement("pre");

outputDiv.append(outputParagraph); // Додаємо параграф до div для виводу
// outputDiv.append(outputPre); // Додаємо параграф до div для виводу

// Створення елементів для вводу числа та кнопки для додавання числа
let divInput = document.createElement("div");
let input = document.createElement("input");
input.type = "number"; // Тип поля ввода
input.placeholder = "Введіть дані"; // Плейсхолдер для поля ввода
let button = document.createElement("button");
button.textContent = "Обчислити a, b та c"; // Текст кнопки
divInput.append(input, button); // Додаємо input та кнопку до divInput

outputDiv.before(divInput);

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
let arrIn = ["e", "f", "g", "h"]; // Масив назв змінних для виводу

// a = sqrt(|e - 3 / f|^3 + g)
function calculateA(e, f, g) {
  if (f === 0) {
    throw FormulaError.divisionByZero(arrIn[1], f);
  }
  let value = Math.abs(e - 3 / f) ** 3 + g;
  if (value < 0) {
    throw FormulaError.negativeRoot(arrIn[0], value);
  }
  return Math.sqrt(value).toFixed(2);
}

// b = sin(e) + cos^2(h)
function calculateB(e, h) {
  return (Math.sin(e) + Math.cos(h) ** 2).toFixed(2);
}

// c = (33 * g) / (e * f - 3)
function calculateC(e, f, g) {
  if (e * f - 3 === 0) {
    throw FormulaError.divisionByZero(arrIn[0], e * f - 3);
  }
  return ((33 * g) / (e * f - 3)).toFixed(2);
}

button.addEventListener("click", function () {
  let number = +input.value;
  // if (number === "") {
  if (isNaN(number)) {
    outputParagraph.textContent = "Ви не ввели число.";
    return;
  }

  nmbr.push(number);

  if (nmbr.length === 4) {
    try {
      let a = calculateA(nmbr[0], nmbr[1], nmbr[2]);
      let b = calculateB(nmbr[0], nmbr[3]);
      let c = calculateC(nmbr[0], nmbr[1], nmbr[2]);
      outputParagraph.textContent = `Введено e = ${nmbr[0]}, f = ${nmbr[1]}, g = ${nmbr[2]}, h = ${nmbr[3]}. Результати: a = ${a}, b = ${b}, c = ${c}`;
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
});
