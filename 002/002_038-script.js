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
const arrIn = ["Перше число", "Друге число"]; // Масив назв змінних для виводу

// Функція, у якій обчислюється сума, різниця, добуток, частка та середнє арифметичне двох цілих чисел
function calc(nmbr1, nmbr2) {
  if (nmbr2 === 0) {
    throw FormulaError.divisionByZero(arrIn[1], nmbr2);
  }
  return {
    sum: nmbr1 + nmbr2,
    difference: nmbr1 - nmbr2,
    product: nmbr1 * nmbr2,
    quotient: nmbr1 / nmbr2,
    average: (nmbr1 + nmbr2) / 2,
  };
}

function handlerClick() {
  let number = +input.value;
  let raw = input.value.trim();

  // Перевірка на порожнє поле або нечислове значення
  if (raw === "" || isNaN(nmbr)) {
    outputParagraph.textContent = "Введіть коректне число.";
    return;
  }

  nmbr.push(number);

  if (nmbr.length === 2) {
    try {
      let result = calc(nmbr[0], nmbr[1]);
      outputParagraph.style.whiteSpace = "pre-line"; // Дозволяємо перенос рядків
      outputParagraph.textContent = `Введено: ${arrIn[0]} - ${nmbr[0]}, ${arrIn[1]} - ${nmbr[1]}.\nРезультат:\nСума: ${nmbr[0]} + ${nmbr[1]} = ${result.sum}\nРізниця: ${nmbr[0]} - ${nmbr[1]} = ${result.difference}\nДобуток: ${nmbr[0]} * ${nmbr[1]} = ${result.product}\nЧастка: ${nmbr[0]} / ${nmbr[1]} = ${result.quotient}\nСереднє арифметичне: (${nmbr[0]} + ${nmbr[1]}) / 2 = ${result.average}`;
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
