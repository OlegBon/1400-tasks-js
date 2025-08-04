let outputDiv = document.querySelector(".output");
let outputParagraph = document.createElement("p");
// let outputPre = document.createElement("pre");

outputDiv.append(outputParagraph); // Додаємо параграф до div для виводу
// outputDiv.append(outputPre); // Додаємо параграф до div для виводу

// Створення елементів для вводу числа та кнопки для додавання числа
let divInput = document.createElement("div");
let input = document.createElement("input");
input.type = "number"; // Тип поля ввода
input.placeholder = "Введіть швидкісті автомобілів"; // Плейсхолдер для поля ввода
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

  // Якщо одне число менше другого
  static lessThan(variable, value) {
    return new FormulaError(
      "Помилка: перше число менше другого.",
      variable,
      value
    );
  }
}

// Змінні
let nmbr = []; // Масив для збереження введених чисел
// V1 > V2
const arrIn = [
  "Швидкість першого автомобіля (V1, км/год)",
  "Швидкість другого автомобіля (V2, км/год)",
]; // Масив назв змінних для виводу
// Час після якого рахуємо
const timeAfter = 30; // 30 хвилин

// Функція для обчислення відстані через timeAfter (V1 > V2),
// V1 > V2, враховуємо що перший автомобіль опереджає другий
function calcDistance(V1, V2) {
  if (V1 <= V2) {
    throw FormulaError.lessThan(arrIn[0], V1);
  }
  return ((V1 - V2) * (timeAfter / 60)).toFixed(2);
}

function handlerClick() {
  let number = +input.value;

  if (!input.value.trim() || number < 0) {
    outputParagraph.textContent = "Введіть додатне число більше за нуль.";
    return;
  }

  nmbr.push(number);

  if (nmbr.length === 2) {
    try {
      let result = calcDistance(nmbr[0], nmbr[1]);
      outputParagraph.style.whiteSpace = "pre-line"; // Дозволяємо перенос рядків
      outputParagraph.textContent = `Введено: ${arrIn[0]} - ${nmbr[0]} км/год, ${arrIn[1]} - ${nmbr[1]} км/год.\nРезультат: ${result} км.`;
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
}

button.addEventListener("click", handlerClick);
