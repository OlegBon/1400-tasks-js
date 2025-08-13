let outputDiv = document.querySelector(".output");
let outputParagraph = document.createElement("p");
// let outputPre = document.createElement("pre");

outputDiv.append(outputParagraph); // Додаємо параграф до div для виводу
// outputDiv.append(outputPre); // Додаємо параграф до div для виводу

// Створення елементів для вводу числа та кнопки для додавання числа
let divInput = document.createElement("div");
let input = document.createElement("input");
input.type = "number"; // Тип поля ввода
input.placeholder = "Введіть сантиметри"; // Плейсхолдер для поля ввода
let button = document.createElement("button");
button.textContent = "Обчислити метри"; // Текст кнопки
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

// Функція для обчислення повних метрів по сантиметрам
function calcMetrs(santimeters) {
  if (santimeters < 0) {
    throw FormulaError.invalidValue("santimeters", santimeters);
  }
  // return Math.floor(santimeters / 100); // Повні метри - заокруглення в меншу сторону
  return Math.trunc(santimeters / 100); // Повні метри - отбрасуємо дробну частину
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
    let result = calcMetrs(nmbr);
    outputParagraph.style.whiteSpace = "pre-line"; // Дозволяємо перенос рядків
    outputParagraph.textContent = `Введено ${nmbr} см.\nРезультат: Повні ${result} м.`;
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
