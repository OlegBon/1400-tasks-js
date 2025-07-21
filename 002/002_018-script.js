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
button.textContent = "Обчислити z та q"; // Текст кнопки
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
let arrIn = ["x", "y"]; // Масив назв змінних для виводу

// z = [x + (2 + y) / x^2]/[y + (1 / sqrt(x^2 + 10))]
function calculateZ(x, y) {
  if (x === 0) {
    throw FormulaError.divisionByZero(arrIn[0], x);
  }
  if (y === 0) {
    throw FormulaError.divisionByZero(arrIn[1], y);
  }
  if (x < 0) {
    throw FormulaError.negativeRoot(arrIn[0], x);
  }
  // if (y < 0) {
  //   throw FormulaError.negativeRoot(arrIn[1], y);
  // }
  return (
    (x + (2 + y) / Math.pow(x, 2)) /
    (y + 1 / Math.sqrt(Math.pow(x, 2) + 10))
  ).toFixed(3);
}

// q = 7.25 * sin(x) - |y|
function calculateQ(x, y) {
  if (x === 0) {
    throw FormulaError.divisionByZero(arrIn[0], x);
  }
  // if (y < 0) {
  //   throw FormulaError.invalidValue(arrIn[1], y);
  // }
  return (7.25 * Math.sin(x) - Math.abs(y)).toFixed(3);
}

button.addEventListener("click", function () {
  let number = +input.value;
  // if (number === "") {
  if (isNaN(number)) {
    outputParagraph.textContent = "Ви не ввели число.";
    return;
  }

  nmbr.push(number);

  if (nmbr.length === 2) {
    try {
      let z = calculateZ(nmbr[0], nmbr[1]);
      let q = calculateQ(nmbr[0], nmbr[1]);
      outputParagraph.textContent = `Введено: x = ${nmbr[0]}, y = ${nmbr[1]}. Результати: z = z = [x + (2 + y) / x^2]/[y + (1 / sqrt(x^2 + 10))] = ${z}, q = q = 7.25 * sin(x) - |y| = ${q}`;
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
