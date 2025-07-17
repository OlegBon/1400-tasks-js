let outputDiv = document.querySelector(".output");
let outputParagraph = document.createElement("p");
// let outputPre = document.createElement("pre");

outputDiv.append(outputParagraph); // Додаємо параграф до div для виводу
// outputDiv.append(outputPre); // Додаємо параграф до div для виводу

// Створення елементів для вводу числа та кнопки для додавання числа
let divInput = document.createElement("div");
let input = document.createElement("input");
input.type = "number"; // Тип поля ввода
input.placeholder = "Радіус кола"; // Плейсхолдер для поля ввода
let button = document.createElement("button");
button.textContent = "Розрахувати"; // Текст кнопки
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

// Обчислення довжини кола
function calculateCircleLength(radius) {
  if (radius <= 0) {
    throw FormulaError.invalidValue("radius", radius);
  }
  return (2 * Math.PI * radius).toFixed(3);
}
// Площа кола
function calculateCircleArea(radius) {
  if (radius <= 0) {
    throw FormulaError.invalidValue("radius", radius);
  }
  return (Math.PI * Math.pow(radius, 2)).toFixed(3);
}

button.addEventListener("click", () => {
  let nbr = +input.value;
  if (nbr === "") {
    outputParagraph.textContent = "Ви не ввели число.";
    return;
  }
  try {
    const length = calculateCircleLength(nbr);
    const area = calculateCircleArea(nbr);
    outputParagraph.textContent = `Радіус кола = ${nbr}, Довжина кола = ${length}, Площа кола = ${area}`;
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
