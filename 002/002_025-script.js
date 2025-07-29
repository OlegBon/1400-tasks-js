let outputDiv = document.querySelector(".output");
let outputParagraph = document.createElement("p");
// let outputPre = document.createElement("pre");

outputDiv.append(outputParagraph); // Додаємо параграф до div для виводу
// outputDiv.append(outputPre); // Додаємо параграф до div для виводу

// Створення елементів для вводу числа та кнопки для додавання числа
let divInput = document.createElement("div");
let input = document.createElement("input");
input.type = "number"; // Тип поля ввода
input.placeholder = "Введіть довжини сторін"; // Плейсхолдер для поля ввода
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
let arrIn = ["Довжина (a), см", "Ширина (b), см", "Висота (h), см"]; // Масив назв змінних для виводу

// Функція з методами для обчислення об'єму та площі бокової поверхні паралелепіпеда
function rectangularPrismCalculator(a, b, h) {
  this.a = a;
  this.b = b;
  this.h = h;

  if (this.a <= 0 || this.b <= 0 || this.h <= 0) {
    throw FormulaError.invalidValue("Довжина, ширина або висота", this.a);
  }

  this.calculateVolume = function () {
    return this.a * this.b * this.h;
  };

  this.calculateLateralSurfaceArea = function () {
    return 2 * (this.a + this.b) * this.h;
  };
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
      let rectangularPrism = new rectangularPrismCalculator(
        nmbr[0],
        nmbr[1],
        nmbr[2]
      );
      let volume = rectangularPrism.calculateVolume();
      let lateralSurfaceArea = rectangularPrism.calculateLateralSurfaceArea();
      outputParagraph.textContent = `Введено a = ${nmbr[0]}, b = ${nmbr[1]}, h = ${nmbr[2]}. Результати: V = ${volume} см^3, S = ${lateralSurfaceArea} см^2`;
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
