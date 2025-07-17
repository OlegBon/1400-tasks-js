let outputDiv = document.querySelector(".output");
let outputParagraph = document.createElement("p");
// let outputPre = document.createElement("pre");

outputDiv.append(outputParagraph); // Додаємо параграф до div для виводу
// outputDiv.append(outputPre); // Додаємо параграф до div для виводу

// Створення елементів для вводу числа та кнопки для додавання числа
let divInput = document.createElement("div");
let input = document.createElement("input");
input.type = "number"; // Тип поля ввода
input.placeholder = "Висота над Землею у км"; // Плейсхолдер для поля ввода
let button = document.createElement("button");
button.textContent = "Знайти розтавання до горизонту"; // Текст кнопки
divInput.append(input, button); // Додаємо input та кнопку до divInput

outputDiv.before(divInput);

const radiusEarth = 6350; // Радіус Землі в кілометрах

// Клас для обробки помилок
// class FormulaError extends Error {
//   constructor(message, variableName, value) {
//     super(`${message} Змінна: ${variableName}, значення: ${value}`);
//     this.name = "FormulaError";
//     input.value = "";
//     this.value = value;
//   }
// }

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

  static invalidHeight(variable, value) {
    return new FormulaError(
      "Помилка: висота не може бути від'ємною.",
      variable,
      value
    );
  }
}

function horizonDistance(height) {
  // if (height < 0) {
  //   throw new FormulaError("Висота не може бути від'ємною.", "height", height);
  // }
  if (height < 0) {
    throw FormulaError.invalidHeight("height", height);
  }

  return Math.sqrt(
    Math.pow(radiusEarth + height, 2) - Math.pow(radiusEarth, 2)
  ).toFixed(3);
}

button.addEventListener("click", function () {
  const inputValue = input.value;

  if (inputValue === "") {
    outputParagraph.textContent = "Ви не ввели число.";
    return;
  }

  const height = +inputValue;

  try {
    const result = horizonDistance(height);
    outputParagraph.textContent = `Висота над Землею = ${height} км, Розтавання до горизонту = ${result} км`;
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
