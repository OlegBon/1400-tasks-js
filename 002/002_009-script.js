let outputDiv = document.querySelector(".output");
let outputParagraph = document.createElement("p");
// let outputPre = document.createElement("pre");

outputDiv.append(outputParagraph); // Додаємо параграф до div для виводу
// outputDiv.append(outputPre); // Додаємо параграф до div для виводу

// Створення елементів для вводу числа та кнопки для додавання числа
let divInput = document.createElement("div");
let input = document.createElement("input");
input.type = "number"; // Тип поля ввода
input.placeholder = "Введіть число"; // Плейсхолдер для поля ввода
let button = document.createElement("button");
button.textContent = "Обчислити функцію"; // Текст кнопки
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
    return new FormulaError("Помилка: від'ємне число.", variable, value);
  }
}

// Змінні
let nmbr = []; // Масив для збереження введених чисел
// let arrIn = ["x", "y"];
let arrIn = ["a", "b"];

// Обчислення функції z = 2x^3 – 3,44xy + 2,3x^2 – 7,1y + 2
function mathFormulaZ(x, y) {
  return (
    2 * Math.pow(x, 3) -
    3.44 * x * y +
    2.3 * Math.pow(x, 2) -
    7.1 * y +
    2
  ).toFixed(2);
}

// Обчислення функції x = 3,14(a + b)^3 + 2,75b^2 – 12,7a – 4,1
function mathFormulaX(a, b) {
  return (
    3.14 * Math.pow(a + b, 3) +
    2.75 * Math.pow(b, 2) -
    12.7 * a -
    4.1
  ).toFixed(2);
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
      // let z = mathFormulaZ(nmbr[0], nmbr[1]);
      // outputParagraph.textContent = `Введено x = ${nmbr[0]}, y = ${nmbr[1]}. Результат: z = 2x^3 – 3,44xy + 2,3x^2 – 7,1y + 2 = ${z}`;

      let x = mathFormulaX(nmbr[0], nmbr[1]);
      outputParagraph.textContent = `Введено a = ${nmbr[0]}, b = ${nmbr[1]}. Результат: x = 3,14(a + b)^3 + 2,75b^2 – 12,7a – 4,1 = ${x}`;
    } catch (error) {
      if (error instanceof FormulaError) {
        outputParagraph.textContent = error.message;
      } else {
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
