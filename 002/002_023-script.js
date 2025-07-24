let outputDiv = document.querySelector(".output");
let outputParagraph = document.createElement("p");
// let outputPre = document.createElement("pre");

outputDiv.append(outputParagraph); // Додаємо параграф до div для виводу
// outputDiv.append(outputPre); // Додаємо параграф до div для виводу

// Створення елементів для вводу числа та кнопки для додавання числа
let divInput = document.createElement("div");
let input = document.createElement("input");
input.type = "number"; // Тип поля ввода
input.placeholder = "Введіть сторону"; // Плейсхолдер для поля ввода
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
let arrIn = ["Перша сторона", "Друга сторона"]; // Масив назв змінних для виводу

// Клас для обчислювання периметра та довжини діагоналі прямокутника
class AverageCalculator {
  constructor(side1, side2) {
    this.side1 = side1;
    this.side2 = side2;
  }

  calculateAverage() {
    return 2 * (this.side1 + this.side2);
  }

  calculateGeometricMean() {
    if (this.side1 <= 0 || this.side2 <= 0) {
      throw FormulaError.invalidValue(
        "Сторона",
        this.side1 <= 0 ? this.side1 : this.side2
      );
    }
    return Math.sqrt(this.side1 ** 2 + this.side2 ** 2);
  }
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
      let calculator = new AverageCalculator(nmbr[0], nmbr[1]);
      let perimeter = calculator.calculateAverage();
      let diagonal = calculator.calculateGeometricMean();
      outputParagraph.textContent = `Сторона 1 = ${nmbr[0]}, Сторона 2 = ${
        nmbr[1]
      }. Периметр: ${perimeter}, Діагональ: ${diagonal.toFixed(2)}`;
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
