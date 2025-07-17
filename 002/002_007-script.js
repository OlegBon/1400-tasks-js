let outputDiv = document.querySelector(".output");
let outputParagraph = document.createElement("p");
// let outputPre = document.createElement("pre");

outputDiv.append(outputParagraph); // Додаємо параграф до div для виводу
// outputDiv.append(outputPre); // Додаємо параграф до div для виводу

// Створення елементів для вводу числа та кнопки для додавання числа
let divInput = document.createElement("div");
let input = document.createElement("input");
input.type = "number"; // Тип поля ввода
input.placeholder = "Довжина ребра куба"; // Плейсхолдер для поля ввода
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

  // Від'ємне число
  static invalidValue(variable, value) {
    return new FormulaError("Помилка: від'ємне число.", variable, value);
  }
}

// Обчислення об'єму куба
function calculateCubeVolume(edge) {
  if (edge <= 0) {
    throw FormulaError.invalidValue("edge", edge);
  }
  return edge ** 3;
}

// Площа бокової поверхні куба
function calculateSurfaceArea(edge) {
  if (edge <= 0) {
    throw FormulaError.invalidHeight("edge", edge);
  }
  return 4 * edge ** 2;
}

button.addEventListener("click", () => {
  let a = +input.value;
  if (a === "") {
    outputParagraph.textContent = "Ви не ввели число.";
    return;
  }
  try {
    const volume = calculateCubeVolume(a);
    const surfaceArea = calculateSurfaceArea(a);
    outputParagraph.textContent = `Довжина ребра куба = ${a}, Об'єм куба = ${volume}, Площа бокової поверхні куба = ${surfaceArea}`;
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
