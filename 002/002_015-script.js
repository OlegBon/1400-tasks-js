let outputDiv = document.querySelector(".output");
let outputParagraph = document.createElement("p");
// let outputPre = document.createElement("pre");

outputDiv.append(outputParagraph); // Додаємо параграф до div для виводу
// outputDiv.append(outputPre); // Додаємо параграф до div для виводу

// Створення елементів для вводу числа та кнопки для додавання числа
let divInput = document.createElement("div");
let input = document.createElement("input");
input.type = "number"; // Тип поля ввода
input.placeholder = "Введіть радіус"; // Плейсхолдер для поля ввода
let button = document.createElement("button");
button.textContent = "Обчислити площу кільця"; // Текст кнопки
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

  // Зовнішний радіус не може бути меншим за внутрішній
  static outerRadiusLessThanInner(variable, value) {
    return new FormulaError(
      "Помилка: зовнішній радіус менший за внутрішній.",
      variable,
      value
    );
  }
}

// Змінні
let nmbr = []; // Масив для збереження введених чисел
let arrIn = ["Зовнішній радіус (см)", "Внутрішній радіус (см)"]; // Масив назв змінних

// Обчислення площі кільця
function calculateRingArea(outerRadius, innerRadius) {
  if (outerRadius <= 0) {
    throw FormulaError.invalidValue("outerRadius", outerRadius);
  }
  if (innerRadius <= 0) {
    throw FormulaError.invalidValue("innerRadius", innerRadius);
  }
  if (outerRadius < innerRadius) {
    throw FormulaError.negativouterRadiusLessThanInnereRoot(
      "outerRadius",
      outerRadius
    );
  }
  return Math.PI * (outerRadius * outerRadius - innerRadius * innerRadius);
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
      let result = calculateRingArea(nmbr[0], nmbr[1]);
      outputParagraph.textContent = `Зовнішній радіус: ${
        nmbr[0]
      } см, внутрішній радіус: ${nmbr[1]} см. Площа кільця: ${result.toFixed(
        2
      )} см²`;
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
