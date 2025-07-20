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
button.textContent = "Обчислити периметр трапеції"; // Текст кнопки
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
let arrIn = ["Основа 1 (см)", "Основа 2 (см)", "Висота (см)"];

// Обчислення периметра трапеції
function calculatePerimeter(base1, base2, height) {
  if (base1 <= 0 || base2 <= 0 || height <= 0) {
    throw FormulaError.invalidValue(
      "Основа або висота",
      base1 <= 0 ? base1 : base2 <= 0 ? base2 : height
    );
  }
  let side = Math.sqrt(height * height + ((base2 - base1) / 2) ** 2);
  return (base1 + base2 + 2 * side).toFixed(2); // Обчислення периметра трапеції
}

button.addEventListener("click", function () {
  let number = +input.value;
  // if (number === "") {
  if (isNaN(number)) {
    outputParagraph.textContent = "Ви не ввели число.";
    return;
  }

  nmbr.push(number);

  if (nmbr.length === 3) {
    try {
      let hypotenuse = calculatePerimeter(nmbr[0], nmbr[1], nmbr[2]);
      outputParagraph.textContent = `Основа 1 (см) = ${nmbr[0]}, основа 2 (см) = ${nmbr[1]}, висота (см) = ${nmbr[2]}. Периметр трапеції: ${hypotenuse} см`;
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
