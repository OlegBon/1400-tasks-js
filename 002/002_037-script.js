let outputDiv = document.querySelector(".output");
let outputParagraph = document.createElement("p");
// let outputPre = document.createElement("pre");

outputDiv.append(outputParagraph); // Додаємо параграф до div для виводу
// outputDiv.append(outputPre); // Додаємо параграф до div для виводу

// Створення елементів для вводу числа та кнопки для додавання числа
let divInput = document.createElement("div");
let input = document.createElement("input");
input.type = "number"; // Тип поля ввода
input.placeholder = "Введіть температуру у F"; // Плейсхолдер для поля ввода
let button = document.createElement("button");
button.textContent = "Обчислити температуру у C"; // Текст кнопки
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

  // Якщо одне число менше другого
  static lessThan(variable, value) {
    return new FormulaError(
      "Помилка: перше число менше другого.",
      variable,
      value
    );
  }
}

// Функція для обчислення температури в Цельсіях по Фаренгейту
function calcTempCelsius(temperature) {
  return ((temperature - 32) * (5 / 9)).toFixed(2);
}

function handlerClick() {
  let nmbr = +input.value;
  let raw = input.value.trim();

  // Перевірка на порожнє поле або нечислове значення
  if (raw === "" || isNaN(nmbr)) {
    outputParagraph.textContent = "Введіть коректне число.";
    return;
  }

  try {
    let result = calcTempCelsius(nmbr);
    outputParagraph.style.whiteSpace = "pre-line"; // Дозволяємо перенос рядків
    outputParagraph.textContent = `Введена температура в Фаренгейтах: ${nmbr}°F.\nТемпература в Цельсіях: ${result}°C`;
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

  input.value = "";
}

button.addEventListener("click", handlerClick);
